import styled from "@emotion/styled";

export const Container = styled.div`
  width: 70%;
  margin: 20px auto;

  h1.title {
    width: 100%;
    padding-bottom: 15px;
    text-align: center;
    border-bottom: 1px solid lightgray;
  }
`;

export const FormWrap = styled.div`
  margin-top: 30px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  form {
    position: relative;
  }
`;
// .frmGroup {
//   /* margin: 0 172px; 양 옆 줄간격 맞추기 위함 */
//   /* border: 1px solid #807a7a; */
// }

export const InputGroup = styled.div`
  margin: 18px 18px 32px;
  position: relative;
`;

export const InputName = styled.label`
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
  height: 30px;

  input {
    outline: none;
    width: 215px;
    height: 100%;
    padding: 3px 8px;
    border: 1px solid #dcdcdc;
  }

  .input-width {
    width: 98% !important;
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

export const FormBtn = styled.button<{ top?: string }>`
  padding: 5px;
  margin: 0 0.3rem;
  position: relative;
  top: ${(props) => props.top && props.top};
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

export const FrmBtnContainer = styled.div<{
  left?: string;
  top?: string;
}>`
  position: relative;
  left: ${(props) => props.left || "15px"};
  top: ${(props) => props.top || 0};
  width: calc(100% + 7px);

  & > button {
    border: 1px solid transparent;
    max-width: 42%;
    height: 35px;
    color: #fff;
    font-size: 18px;
    padding: 5px;
    margin: 0.8rem 0.3rem;
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
    margin: 0.8rem 0.3rem;
    a {
      color: #70290d;
    }
  }
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
