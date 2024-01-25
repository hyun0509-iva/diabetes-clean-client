import styled from "@emotion/styled";
import { Container } from "styles/common";

export const MyContainer = styled(Container)`
  margin: 30px auto;
  padding: 10px 25px;
  max-width: 680px;
  background: #fff;
`;

export const Title = styled.header`
  margin-left: 10px;
  font-size: 18px;
  position: relative;
  &::before {
    position: absolute;
    background-color: #d9480f;
    top: 3px;
    left: -10px;
    content: "";
    width: 3px;
    height: 18px;
  }
`;
