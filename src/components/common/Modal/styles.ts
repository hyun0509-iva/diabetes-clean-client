import { css, keyframes } from "@emotion/react";
import styled from "@emotion/styled";

export const fadeIn = keyframes`
 from {
    opacity: 0;
} to {
    opacity: 1;
 }
`;

export const fadeOut = keyframes`
 from {
    opacity: 1;
} to {
    opacity: 0;
 }
`;

export const slideUp = keyframes`
 from {
    transform: translateY(200px);
} to {
    transform: translateY(0px);
 }
`;

export const slideDown = keyframes`
 from {
    transform: translateY(0px);
 } to {
    transform: translateY(200px);
 }
`;

export const ModalWrap = styled.div<{ disappear: boolean }>`
  width: 100%;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  transition: opacity 0.3s ease-in-out;

  //--- animation: test
  animation-duration: 0.3s;
  animation-timing-function: ease-in-out;
  animation-name: ${fadeIn};
  animation-fill-mode: forwards;

  ${({ disappear }) => {
    return (
      disappear &&
      css`
        animation-name: ${fadeOut};
      `
    );
  }}
`;

export const ModalContainer = styled.div`
  width: auto;
  position: relative;
  padding: 25px 85px 38px 40px;
  border: 1px solid gray;
  border-radius: 5px;
  background: #fff;
`;

export const CloseBtn = styled.button`
  width: 25px;
  height: 25px;
  background: transparent;
  border: none;
  box-shadow: 0 0 0 0 rgb(0 0 0 / 10%), 0 2px 5px rgb(0 0 0 / 10%);
  border-radius: 5px;
  position: absolute;
  top: 10px;
  right: 10px;
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

export const ModalContent = styled.div``;
