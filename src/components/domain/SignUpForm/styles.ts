import styled from "@emotion/styled";
import { palette } from "libs/palette";

export const FormWrap = styled.div`
  margin-top: 0px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  form {
    width: 425px;
    position: relative;
  }
`;

export const InputGroup = styled.div`
  margin: 18px 18px 45px;
  position: relative;
`;

export const InputLabel = styled.label`
  margin-left: 0.3rem;
  font-size: 13px;
  font-weight: bold;

  &.genderLabel {
    display: inline-block;
    position: relative;
    top: -15px;
    margin-top: 20px;
    font-size: 12px;
  }

  .icon {
    color: #d8445d;
  }
`;

export const InputWrap = styled.div`
  display: flex;
  margin-top: 8px;
  height: 50px;

  input {
    padding: 3px 8px;
    width: 100%;
    height: 100%;
    border: 1px solid #dcdcdc;
    font-size: 16px;
    outline: none;
  }

  .input-width {
    width: 100%;
  }

  button {
    width: 100px;
    outline: none;

    &:active {
      position: relative;
      top: -3px;
    }
  }
`;

export const FrmBtnContainer = styled.div`
  position: relative;
  margin: 18px 18px 32px;

  & > button {
    display: inline-block;
    height: 45px;
  }
  .auth-msg {
    text-align: center;
    margin: 30px 0;
    a {
      color: #70290d;
    }
  }
`;

export const FormBtn = styled.button`
  display: inline-block;
  width: 100%;
  height: 100%;
  color: #fff;
  font-size: 15px;
  border: 1px solid transparent;
  padding: 3px 8px;
  cursor: pointer;
  transition: 0.2s;
  background-color: #514d4d;

  &.not-allowed {
    cursor: not-allowed;
    opacity: 0.3;
    &:active {
      position: relative;
      top: 0px;
    }
  }
  &.allowed {
    background-color: #514d4d;
    cursor: pointer;

    &:active {
      position: relative;
      top: 0px;
    }

    &:hover {
      opacity: 0.8;
    }
  }
`;

export const IconWrap = styled.span<{ isVisible: boolean }>`
  top: 50%;
  right: 12px;
  position: absolute;
  color: ${(props) => (props.isVisible ? palette.gray[5] : palette.gray[3])};
  font-size: 28px;
  cursor: pointer;
`;

// 유효성
export const Valid = styled.p`
  position: absolute;
  bottom: -30px;
  font-size: 13px;
  font-weight: 600;

  &.success {
    color: #448044;
  }

  &.error {
    color: #ee1919;
  }
`;
