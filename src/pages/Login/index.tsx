import React from "react";
import LoginForm from "components/domain/LoginForm";
import { AuthContainer } from "pages/SignUp/styles";

const Login = () => {
  return (
    <AuthContainer>
      <h2 className="title">
        <span style={{ fontSize: "25px" }}>로그인</span>
      </h2>
      <div className="login-form">
        <LoginForm />
      </div>
    </AuthContainer>
  );
};

export default React.memo(Login);
