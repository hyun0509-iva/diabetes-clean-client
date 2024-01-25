import styled from "@emotion/styled";
import { palette } from "libs/palette";
import { Container } from "styles/common";

export const StoryWarp = styled(Container)`
  padding: 15px 10px;
  max-width: 680px;
  position: relative;
  top: 0;
  left: 0;
`;

export const Contour = styled.div`
  // 구분선(Contour)
  width: 100%;
  height: 1px;
  background-color: ${palette.gray[1]};
`;
