import React, { useCallback, useState } from "react";
import {
  FormWrap,
  InputGroup,
  InputName,
  InputWrap,
  FrmBtnContainer
} from "pages/SignUp/styles";
import { useLoginMutation } from "hooks/service/mutator";
import { Link } from "react-router-dom";

const LoginForm = () => {
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
          <InputName htmlFor="email">이메일</InputName>
          <InputWrap
            style={{
              width: "296px"
            }}
          >
            <input
              type="email"
              id="email"
              name="email"
              required
              style={{
                width: "100%"
              }}
              placeholder="이메일을 입력해주세요"
              onChange={onFormChange}
              value={email}
              autoComplete="off"
            />
          </InputWrap>
        </InputGroup>
        <InputGroup>
          <InputName htmlFor="pw">비밀번호</InputName>
          <InputWrap
            style={{
              width: "296px"
            }}
          >
            <input
              type="password"
              id="password"
              name="password"
              required
              style={{
                width: "100%"
              }}
              placeholder="비밀번호를 입력해주세요"
              onChange={onFormChange}
              value={password}
              autoComplete="off"
            />
          </InputWrap>
        </InputGroup>
        <FrmBtnContainer>
          <button
            type="submit"
            style={{
              width: 296,
              maxWidth: "inherit"
            }}
          >
            로그인
          </button>
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
