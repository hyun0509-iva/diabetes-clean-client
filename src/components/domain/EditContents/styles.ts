import styled from "@emotion/styled";
import { Container } from "styles/common";

export const EditContentsContainer = styled(Container)`
  margin: 0 auto 60px;
  max-width: 680px;
`;

export const EditHeader = styled.header`
  .contents-title {
    padding: 20px 5px;
    font-size: 20px;
  }
`;
export const EditBody = styled.div`
  margin-top: 15px;
`;

export const FormWrap = styled.form`
  padding: 20px;
  width: 100%;
  min-width: 300px;
  background-color: #fff;
  box-shadow: ${({ theme }) => theme.boxShadow.middle};
  form {
    margin-top: 45px;
  }
`;

export const LabelWrap = styled.div`
  font-weight: 700;

  label {
    display: flex;
    align-items: center;

    .img_icon {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-left: 8px;
    }
    .img_count {
      margin-left: 5px;
      padding: 5px;
      border-radius: 4px;
      background: #fcfcfc;
    }
  }
`;
export const InputGroup = styled.div`
  position: relative;
  margin-top: 50px;
  padding: 0 5px;
  display: block;
  width: 100%;
  gap: 5px;
`;
