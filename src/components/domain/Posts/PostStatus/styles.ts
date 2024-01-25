import styled from "@emotion/styled";
import { palette } from "libs/palette";

export const PostStatusContainer = styled.div`
  .status_inner {
    display: flex;
    align-items: center;
    padding: 10px 0;
    gap: 20px;
  }

  .status_item {
    display: flex;
    align-items: center;
    &:hover {
      color: ${palette.gray[3]};
    }
  }

  .status_item.links {
    top: -2px;

    .likes-icon {
      display: flex;
      padding: 0 3px;
      font-size: 20px;
      cursor: pointer;
    }
    .count {
      padding-left: 3px;
    }
  }

  .status_item.comments {
    .count {
      padding-left: 3px;
    }
  }
`;
