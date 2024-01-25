import styled from "@emotion/styled";
import { palette } from "libs/palette";

export const MenuContainer = styled.ul`
  text-align: center;
  position: fixed;
  top: 70px;
  right: 10px;
  background: #fff;
  border-radius: 8px;
  box-shadow: ${({ theme }) => theme.boxShadow.thick};
`;

export const Li = styled.li`
  font-size: 15px;
  padding: 8px;
  position: relative;
  top: 0;
  left: 0;
  cursor: pointer;

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
`;
