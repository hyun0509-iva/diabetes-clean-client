import styled from "@emotion/styled";
import { palette } from "libs/palette";
import { fadeIn } from "../Modal/styles";

export const SubMenuList = styled.ul<{
  width?: string;
  height?: string;
}>`
  width: ${(props) => props.width || "fit-content"};
  height: ${(props) => props.height || "auto"};
  text-align: center;
  box-shadow: ${({ theme }) => theme.boxShadow.middle};
  animation-duration: 0.3s;
  animation-timing-function: ease-in-out;
  animation-name: ${fadeIn};
  animation-fill-mode: forwards;
  background: #fff;
  z-index: 2;

  a {
    display: block;
  }
`;

export const SubMenuItem = styled.li`
  font-size: 15px;
  position: relative;
  top: 0;
  left: 0;
  cursor: pointer;

  a,
  button,
  label {
    padding: 10px 8px;
    font-size: inherit;
    border: none;
    border-radius: 4px;
    background: transparent;
    cursor: pointer;
  }
  label {
    display: block;
  }
  &:hover {
    background-color: ${palette.gray[1]};
  }
`;
