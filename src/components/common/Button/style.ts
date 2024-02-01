import styled from "@emotion/styled";

export const ButtonInterface = styled.button<{
  posX?: string | number;
  posY?: string | number;
  size?: string | number;
  bgColor?: string;
  color?: string;
}>`
  padding: 5px;
  margin: 0 0.3rem;
  position: relative;
  border: 1px solid #dcdcdc;
  border-radius: 8px;
  border: 1px solid #ced4da;

  /* custom css */
  width: ${(props) =>
    (typeof props.posX === "number" ? props.posX + "px" : props.posX) ||
    "86px"};

  height: ${(props) =>
    (typeof props.posY === "number" ? props.posY + "px" : props.posY) ||
    "35px"};

  font-size: ${(props) =>
    (typeof props.size === "number" ? props.size + "px" : props.size) ||
    "16px"};

  background-color: ${(props) => props.bgColor || "transparent"};

  &:disabled {
    background-color: rgba(239, 239, 239, 0.3);
  }

  &:not(:disabled) {
    color: ${(props) => props.color || "#000"};
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
    &:active {
      transform: translateY(3px);
    }
  }

  & + & {
    margin-left: 10px;
  }
`;
