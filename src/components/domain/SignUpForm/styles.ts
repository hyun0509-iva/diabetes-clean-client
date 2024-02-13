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
    padding: 10px 30px;
    position: relative;
  }
`;

export const InputGroup = styled.div`
  margin: 18px 18px 32px;
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
    outline: none;
    transition: 0.2s;
    cursor: pointer;

    &:active {
      position: relative;
      top: -3px;
    }
  }
`;

export const FormBtn = styled.button`
  padding: 5px;
  margin: 0 4px;
  position: relative;
  border: 1px solid #dcdcdc;
  width: 100px;
  height: 100%;

  &.not-allowed {
    cursor: not-allowed;
    &:active {
      position: relative;
      top: 0px;
    }
  }
`;

export const FrmBtnContainer = styled.div`
  position: relative;
  margin: 18px 18px 32px;

  & > button {
    width: 329px;
    border: 1px solid transparent;
    height: 45px;
    color: #fff;
    font-size: 18px;
    padding: 3px 8px;
    cursor: pointer;

    &:hover {
      opacity: 0.8;
    }

    &[type="submit"] {
      background-color: #514d4d;

      &.not-allowed {
        opacity: 0.1;
        cursor: not-allowed;
        &:active {
          position: relative;
          top: 0px;
        }
      }
    }
    &[type="reset"] {
      background-color: #4f2323;
    }
  }
  .auth-msg {
    text-align: center;
    margin: 30px 0;
    a {
      color: #70290d;
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
