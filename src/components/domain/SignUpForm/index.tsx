import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import {
  TCreateUserSchema,
  createUserSchema,
  validateEmailReault
} from "schema/auth.schema";
import alertHandler from "utils/functions/alertHandler";
import { checkemailApi } from "utils/apis/userApis";
import { useCreateUser } from "hooks/service/mutator";
import { SCHEMA_ERROR_MESSAGE } from "constants/variables";
import {
  FormWrap,
  InputGroup,
  InputLabel,
  InputWrap,
  Valid,
  FrmBtnContainer,
  FormBtn,
  IconWrap
} from "./styles";

const SignUpForm = () => {
  const navigate = useNavigate();
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const [isVisibleConfirmPassword, setIsVisibleConfirmPassword] =
    useState(false);

  const [isDisabledEmailField, setIsDisabledEmailField] = useState(false); //이메일 중복 확인 완료하면 버튼 비활성화
  const [isCompleteFrmData, setIsCompleteFrmData] = useState(false); // (검증된)폼 데이터 작성 완료 유무

  const {
    register,
    setFocus,
    handleSubmit,
    reset,
    getValues,
    formState: { errors, isValid } //formState에 대한 정보를 불러옴(여러 속성이 존재, 공식문서 참조)
  } = useForm<TCreateUserSchema>({
    mode: "onChange",
    resolver: zodResolver(createUserSchema)
  });
  const mutation = useCreateUser();

  const emailFiled = getValues("email");
  const { success: isValidEmail } = validateEmailReault(emailFiled);

  useEffect(() => {
    setFocus("email"); //포커스
  }, [setFocus]);

  useEffect(() => {
    setIsCompleteFrmData(isValid);
  }, [isValid]);

  const onClickCheckEmail = useCallback(async () => {
    console.log(isValidEmail);
    if (!isValidEmail) {
      alertHandler.onToast({
        msg: SCHEMA_ERROR_MESSAGE.EMAIL,
        icon: "error"
      });
      return;
    }
    try {
      const res = await checkemailApi<string>(emailFiled);
      console.log(res);
      if (res.isOk) {
        setIsDisabledEmailField(true);
        alertHandler.onToast({ msg: res.msg });
      }
    } catch (error: any) {
      const errorRes = error.response;
      if (errorRes.status === 409) {
        // 존재하는 이메일인 경우
        setIsDisabledEmailField(false);
        alertHandler.onToast({ msg: errorRes.data.msg, icon: "warning" });
      } else {
        setIsDisabledEmailField(false);
        alertHandler.onToast({
          msg: "서버 오류, 잠시후 시도해주세요",
          icon: "error"
        });
      }
    }
  }, [emailFiled, isValidEmail]);

  const onShowPassword = useCallback(() => {
    setIsVisiblePassword((prev) => !prev);
  }, []);

  const onShowConfirmPassword = useCallback(() => {
    setIsVisibleConfirmPassword((prev) => !prev);
  }, []);

  const onSubmit = useCallback(
    async (data: TCreateUserSchema) => {
      // 에러 없이 정상적으로 submit 될 때 실행됨.
      if (isDisabledEmailField && isCompleteFrmData) {
        console.log(data);
        const resData = await mutation.mutateAsync(data);
        if (resData.isOk) {
          navigate("/");
          reset();
        }
        reset();
      }
    },
    [isCompleteFrmData, isDisabledEmailField, mutation, reset]
  );
  return (
    <FormWrap>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputGroup>
          <InputLabel htmlFor="email">이메일</InputLabel>
          <InputWrap>
            <input
              type="email"
              id="email"
              disabled={isDisabledEmailField}
              autoComplete="off"
              placeholder="이메일을 입력해주세요"
              {...register("email")}
            />
            <div className="buttonWrap">
              <FormBtn
                className={`${
                  isDisabledEmailField ? "not-allowed" : "allowed"
                }`}
                type="button"
                disabled={isDisabledEmailField}
                onClick={onClickCheckEmail}
              >
                중복확인
              </FormBtn>
            </div>
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
              autoComplete="off"
              placeholder="비밀번호를 입력해주세요"
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
        <InputGroup>
          <InputLabel htmlFor="passwordCheck">비밀번호 확인</InputLabel>
          <InputWrap>
            <input
              type={isVisibleConfirmPassword ? "text" : "password"}
              autoComplete="off"
              placeholder="비밀번호를 입력해주세요"
              {...register("confirmPassword")}
            />
            <IconWrap
              isVisible={isVisibleConfirmPassword}
              onClick={onShowConfirmPassword}
            >
              {isVisibleConfirmPassword ? (
                <AiFillEye />
              ) : (
                <AiFillEyeInvisible />
              )}
            </IconWrap>
            {errors.confirmPassword && (
              <Valid className="error">{errors.confirmPassword.message}</Valid>
            )}
          </InputWrap>
        </InputGroup>
        <InputGroup>
          <InputLabel htmlFor="nickname">닉네임</InputLabel>
          <InputWrap>
            <input
              type="text"
              required
              id="nickname"
              className="input-width"
              placeholder="닉네임을 입력해주세요"
              autoComplete="off"
              {...register("nickname")}
            />
            {errors.nickname && (
              <Valid className="error">{errors.nickname.message}</Valid>
            )}
          </InputWrap>
        </InputGroup>
        <FrmBtnContainer>
          <FormBtn
            className={`${
              isDisabledEmailField && isCompleteFrmData
                ? "allowed"
                : "not-allowed"
            }`}
            type="submit"
          >
            회원가입
          </FormBtn>
          <div className="auth-msg">
            <span>
              회원이 이신가요? &nbsp;
              <Link to="/login">로그인</Link>하기
            </span>
          </div>
        </FrmBtnContainer>
      </form>
    </FormWrap>
  );
};

export default SignUpForm;
