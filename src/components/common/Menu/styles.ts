import styled from "@emotion/styled";
import { palette } from "libs/palette";

export const SubMenuWrap = styled.div<{
  width?: string;
  height?: string;
  posX?: string;
  posY?: string;
}>`
  position: absolute;
  top: ${(props) => props?.posY || "40px"};
  right: ${(props) => props?.posX || "5px"};
  width: ${(props) => props?.width || "5px"};
  height: ${(props) => props?.height || "5px"};
  z-index: 2;
  background: #fff;
`;

export const SubMenuContainer = styled.div`
  width: 100%;
  border-radius: 5px;

  .menu-list {
    width: 100%;
    cursor: pointer;
    border-bottom: 1px solid ${palette.gray[1]};
    a,
    button {
      font-size: inherit;
      border: none;
      border-radius: 4px;
      background: transparent;
      cursor: pointer;
    }
    &:hover {
      background-color: ${palette.gray[1]};
    }
  }
`;
