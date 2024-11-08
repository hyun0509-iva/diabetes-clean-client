import styled from "@emotion/styled";
import { palette } from "libs/palette";

export const LikeStatusWrap = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 5px;

  .likes-icon {
    display: flex;
    padding: 0 3px;
    font-size: 20px;
    cursor: pointer;
  }
  .btn-link {
    cursor: pointer;
  }
  .count {
    position: relative;
    top: -3px;
  }

  &:hover {
    color: ${palette.gray[3]};
  }
`;
