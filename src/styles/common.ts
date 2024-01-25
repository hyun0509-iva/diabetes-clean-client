import styled from "@emotion/styled";
import { palette } from "libs/palette";

export const Header = styled.header`
  padding: 10px 30px;
  box-shadow: ${({ theme }) => theme.boxShadow.light};
`;

export const Main = styled.main`
  width: 100%;
`;

export const Container = styled.div`
  max-width: 480px;
  margin: 0 auto;
  padding: 10px;
`;

export const Contour = styled.div`
  // 구분선(Contour)
  width: 100%;
  height: 1px;
  background-color: ${palette.gray[1]};
`;
