import styled from "@emotion/styled";

export const NavMenutWrap = styled.nav<{
  bgColor?: string;
  borderColor?: string;
  fontSize?: string | number;
}>`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 0 0;
  margin: 30px 0;
  background-color: ${({ bgColor }) => bgColor || "inherit"};

  ul {
    position: relative;
    display: flex;
  }

  li {
    display: block;
    border-radius: 3px;
    transition: all 0.3s ease-in-out;
    &.active {
      position: absolute;
      width: 128px;
      height: 3px;
      border-radius: 2px;
      bottom: 0;
      transition: 0.5s cubic-bezier(0.23, 1, 0.32, 1.05);
      background-color: ${({ borderColor }) => borderColor || "#000"};
    }
    & a,
    & span {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 128px;
      height: 43px;
      font-size: 18px;
    }
  }
`;
