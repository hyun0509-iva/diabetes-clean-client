import React, { useCallback, useState } from "react";
import { useLoginMutation } from "hooks/service/mutator";
import { Link } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import {
  FormWrap,
  InputGroup,
  InputLabel,
  InputWrap,
  FrmBtnContainer,
  IconWrap
} from "components/domain/SignUpForm/styles";

const LoginForm = () => {
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const [inputs, setInputs] = useState({
    email: "",
    password: ""
  });

  const { email, password } = inputs;

  const onFormChange = useCallback(
    (e: any) => {
      setInputs({
        ...inputs,
        [e.target.name]: e.target.value.trim()
      });
    },
    [inputs]
  );
  const mutation = useLoginMutation();

  const onShowPassword = () => {
    setIsVisiblePassword((prev) => !prev);
  };

  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const userInfo = {
        email,
        password
      };

      if (password && email) {
        mutation.mutate(userInfo);
      }
      setInputs({
        email: "",
        password: ""
      });
    },
    [email, mutation, password]
  );

  return (
    <FormWrap>
      <form onSubmit={onSubmit}>
        <InputGroup>
          <InputLabel htmlFor="email">이메일</InputLabel>
          <InputWrap>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="이메일을 입력해주세요"
              onChange={onFormChange}
              value={email}
              autoComplete="off"
            />
          </InputWrap>
        </InputGroup>
        <InputGroup>
          <InputLabel htmlFor="pw">비밀번호</InputLabel>
          <InputWrap>
            <input
              type={isVisiblePassword ? "text" : "password"}
              id="password"
              name="password"
              required
              placeholder="비밀번호를 입력해주세요"
              onChange={onFormChange}
              value={password}
              autoComplete="off"
            />
            <IconWrap isVisible={isVisiblePassword} onClick={onShowPassword}>
              {isVisiblePassword ? <AiFillEye /> : <AiFillEyeInvisible />}
            </IconWrap>
          </InputWrap>
        </InputGroup>
        <FrmBtnContainer>
          <button type="submit">로그인</button>
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
