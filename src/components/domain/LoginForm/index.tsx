import { useCallback, useEffect, useState } from "react";
import { useLoginMutation } from "hooks/service/mutator";
import { Link, useNavigate } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import {
  FormWrap,
  InputGroup,
  InputLabel,
  InputWrap,
  FrmBtnContainer,
  IconWrap,
  FormBtn,
  Valid
} from "components/domain/SignUpForm/styles";
import { useForm } from "react-hook-form";
import { TLoginUserSchema, loginUserSchema } from "schema/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";

const LoginForm = () => {
  const navigate = useNavigate();
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const [isCompleteFrmData, setIsCompleteFrmData] = useState(false);
  const {
    register,
    setFocus,
    handleSubmit,
    reset,
    formState: { errors, isValid } //formState에 대한 정보를 불러옴(여러 속성이 존재, 공식문서 참조)
  } = useForm<TLoginUserSchema>({
    mode: "onChange",
    resolver: zodResolver(loginUserSchema)
  }); // (검증된)폼 데이터 작성 완료 유무

  const mutation = useLoginMutation();

  useEffect(() => {
    setFocus("email"); //포커스
  }, [setFocus]);

  useEffect(() => {
    setIsCompleteFrmData(isValid);
  }, [isValid]);

  const onShowPassword = () => {
    setIsVisiblePassword((prev) => !prev);
  };

  const onSubmit = useCallback(
    async (data: TLoginUserSchema) => {
      if (isCompleteFrmData) {
        const resData = await mutation.mutateAsync(data);
        if (resData.isOk) {
          navigate("/");
          reset();
        }
      }
    },
    [isCompleteFrmData, mutation, navigate, reset]
  );

  return (
    <FormWrap>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputGroup>
          <InputLabel htmlFor="email">이메일</InputLabel>
          <InputWrap>
            <input
              type="email"
              required
              placeholder="이메일을 입력해주세요"
              autoComplete="off"
              {...register("email")}
            />
            {errors.email && (
              <Valid className="error">{errors.email.message}</Valid>
            )}
          </InputWrap>
        </InputGroup>
        <InputGroup>
          <InputLabel htmlFor="pw">비밀번호</InputLabel>
          <InputWrap>
            <input
              type={isVisiblePassword ? "text" : "password"}
              required
              placeholder="비밀번호를 입력해주세요"
              autoComplete="off"
              {...register("password")}
            />
            <IconWrap isVisible={isVisiblePassword} onClick={onShowPassword}>
              {isVisiblePassword ? <AiFillEye /> : <AiFillEyeInvisible />}
            </IconWrap>
            {errors.password && (
              <Valid className="error">{errors.password.message}</Valid>
            )}
          </InputWrap>
        </InputGroup>
        <FrmBtnContainer>
          <FormBtn type="submit">로그인</FormBtn>
          <div className="auth-msg">
            <span>
              아직 회원이 아니신가요? &nbsp;
              <Link to="/signup">회원가입</Link>하기
            </span>
          </div>
        </FrmBtnContainer>
      </form>
    </FormWrap>
  );
};

export default LoginForm;
