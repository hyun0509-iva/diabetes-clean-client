import { palette } from "libs/palette";
import styled from "@emotion/styled";

export const Navbar = styled.div<{ isAuth: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .menu-left {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .search-center {
    position: relative;
    left: ${({ isAuth }) => (isAuth ? -50 : 0)}px;
    width: 660px;
  }
  .menu-right {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-right: 30px;
  }
  .menu-bars {
    background: none;
    border: none;
    outline: none;
    color: ${({ theme }) => theme.bgColor.main};
    cursor: pointer;

    & > span {
      display: inline-block;
      padding: 5px 12px;
      font-size: 25px;
    }
  }
  .logo {
    position: relative;
    left: 0;
    top: 3px;
    height: 100%;
    line-height: 40px;
  }
`;
export const OverWrap = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 10;
`;

export const NavContents = styled.li`
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 10px 8px;
  list-style: none;
  height: 60px;

  & > a {
    width: 95%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 16px;
    border: 1px solid lightgray;
    border-radius: 4px;

    &:hover {
      font-weight: 700;
      background-color: ${palette.gray[1]};
    }
  }
`;
