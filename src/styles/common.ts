import styled from "@emotion/styled";
import { palette } from "libs/palette";

export const Header = styled.header`
  padding: 10px 30px;
`;

export const Main = styled.main`
  width: 100%;
`;

export const Wapper = styled.div`
  width: 100%;
  max-width: 680px;
  margin: 0 auto;
  padding: 10px;
`;

export const Contour = styled.div`
  // 구분선(Contour)
  width: 100%;
  height: 1px;
  background-color: ${palette.gray[2]};
`;

export const LoadingSpinner = styled.span`
  width: 25px;
  height: 25px;
  border: 5px solid #f0f0f0;
  border-bottom-color: #ff3d00;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
