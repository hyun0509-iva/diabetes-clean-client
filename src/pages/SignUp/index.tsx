import React from "react";
import { AuthContainer } from "./styles";
import SignUpForm from "components/domain/SignUpForm";

const SignUp = () => {
  return (
    <AuthContainer>
      <h1 className="title">
        <span style={{ fontSize: "25px" }}>회원가입</span>
      </h1>
      <SignUpForm />
    </AuthContainer>
  );
};

export default React.memo(SignUp);
