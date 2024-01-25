import React from "react";
import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  FormWrap,
  InputGroup,
  InputName,
  InputWrap,
  FrmBtnContainer
} from "pages/SignUp/styles";
import { useLoginMutation } from "hooks/service/mutator";
import LoginForm from "components/domain/LoginForm";
const Login = () => {
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
    <Container>
      <h1 className="title">
        <span style={{ fontSize: "25px" }}>로그인</span>
      </h1>
      <div className="login-form">
        <LoginForm />
      </div>
    </Container>
  );
};

export default React.memo(Login);
