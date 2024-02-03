import React from "react";
import { Container } from "./styles";
import SignUpForm from "components/domain/SignUpForm";

const SignUp = () => {
  return (
    <Container>
      <h1 className="title">
        <span style={{ fontSize: "25px" }}>회원가입</span>
      </h1>
      <SignUpForm />
    </Container>
  );
};

export default React.memo(SignUp);
