import styled from "@emotion/styled";

interface IStyleProps {
  size?: number;
  posX?: number;
  posY?: number;
}

export const AvatarStyle = styled.span<IStyleProps>`
  display: inline-block;
  width: ${({ size }) => size ?? 80}px;
  height: ${({ size }) => size ?? 80}px;
  img {
    border: 1px solid rgb(0 0 0 / 10%);
    padding: 2px;
    border-radius: 50%;
    width: inherit;
    height: inherit;
  }
`;
