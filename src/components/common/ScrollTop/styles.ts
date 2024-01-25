import styled from "@emotion/styled";

export const ScrollTopWrap = styled.div<{ isFadeIn: boolean }>`
  position: fixed;
  bottom: 130px;
  right: 50px;
  opacity: ${({ isFadeIn }) => (isFadeIn ? 1 : 0)};
  transition: opacity 0.5s;
`;

export const ScrollTopBtn = styled.button<{ isFadeIn: boolean }>`
  width: 55px;
  height: 55px;
  display: block;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 50%;
  bottom: 0px;
  color: #fff;
  border-radius: 50%;
  border: none;
  outline: none;
  transform: translate(-50%, 50%);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.25s all ease-in;
  background: #70290d;
  z-index: 5;
  cursor: ${({ isFadeIn }) => (isFadeIn ? "pointer" : "")};

  &:hover {
    background: #c2906d;
  }
  &:active {
    opacity: 0.8;
  }
`;
