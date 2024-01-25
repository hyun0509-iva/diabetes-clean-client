import styled from "@emotion/styled";
import { Li } from "../UserSubMenu/styles";

export const MenuList = styled.ul`
  display: flex;
  align-items: center;
  line-height: 27px;
  position: relative;
  top: 0;
  left: -12px;

  a:hover {
    font-weight: 800;
  }
  button:hover {
    font-weight: 800;
  }
`;

export const UserItem = styled(Li)`
  a {
    display: inline-block;
    border: none;
    background: transparent;
    font-size: 14px;
    cursor: pointer;
  }

  &:hover {
    background-color: transparent;
  }
`;

export const UserInfoWrap = styled.span`
  cursor: pointer;
  .profile-img {
    position: absolute;
    top: -12px;
    left: -15px;
  }
  .menuIcon {
    position: absolute;
    top: 0px;
    left: 32px;
  }
`;
