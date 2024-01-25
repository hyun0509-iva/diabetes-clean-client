import styled from "@emotion/styled";

export const StyledNavMenu = styled.nav`
  background-color: #fff;
  width: 230px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: -100%;
  z-index: 98;
  transition: 850ms;

  &.active {
    left: 0;
    transition: 350ms;
  }

  & .nav-menu-items {
    width: 100%;
  }
`;

export const NavbarToggle = styled.li`
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: start;
  align-items: center;
  position: relative;
  left: 0;
  top: 0;
`;

export const CloseBtn = styled.button`
  width: 25px;
  height: 25px;
  background: transparent;
  border: none;
  box-shadow: 0 0 0 0 rgb(0 0 0 / 10%), 0 2px 5px rgb(0 0 0 / 10%);
  border-radius: 5px;
  position: absolute;
  top: 3px;
  right: 6px;
  cursor: pointer;

  &:active {
    margin-top: -2px;
  }

  span {
    width: 100%;
    height: 100%;
    display: inline-block;
    padding: 0 5px;
    font-size: 20px;
    color: #2d2d2d;
  }
`;
