import { theme } from "libs/palette";
import styled from "@emotion/styled";

export const PostCardWrap = styled.div`
  width: 100%;
  padding: 10px 0px;
  display: flex;
  flex-direction: column;
  gap: 25px;
  border-radius: 5px;
  color: #343a40;
`;

// PostItem
export const PostItemWrap = styled.div`
  padding: 30px 15px;
  background-color: #fff;
  border-radius: 5px;
`;

export const ErrprPostItemWrap = styled(PostItemWrap)`
  height: 360px;
  color: #adb5bd;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const PostHeader = styled.header`
  position: relative;
  width: 100%;
`;

export const PostHeaderBlock = styled.div`
  width: 35%;
  display: flex;
  border-radius: 5px;
`;

export const Icons = styled.div`
  position: absolute;
  right: 12px;
  cursor: pointer;

  & span {
    width: 35px;
    height: 35px;
    font-size: 20px;
    border-radius: 50%;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    &:active {
      opacity: 0.3;
    }
    &:hover {
      background-color: #f1f3f5;
    }
  }

  .submenu {
    position: absolute;
    top: 0;
    left: 0;
  }
`;

// post-contents
export const PostBody = styled.section`
  position: relative;
  padding-top: 10px;
`;

export const PostBodyBlock = styled.div<{ moreImg?: number }>`
  padding: 0 5px;

  .content-wrap {
    padding: 15px 0px;
    p {
      width: 100%;
      font-size: 16px;
      font-weight: 300;
    }
  }

  .img-wrap {
    padding-top: 8px;
    width: 100%;
    display: flex;
    gap: 10px;

    &.flex_wrap_len02 {
      flex-wrap: wrap;

      li {
        width: 305px;
      }
    }
    &.flex_wrap_len03,
    &.flex_wrap_len04 {
      flex-wrap: wrap;

      li {
        width: 305px;
      }
    }
    &.flex_wrap_len05 {
      flex-wrap: wrap;

      li {
        width: 305px;
        &:not(:nth-of-type(1), :nth-of-type(2)) {
          width: 200px;
        }
      }
    }

    &.more {
      flex-wrap: wrap;
      height: 610px;
      overflow: hidden;

      .more_txt {
        position: absolute;
      }

      li {
        position: relative;
        &:not(:nth-of-type(1), :nth-of-type(2)) {
          width: 200px;
          height: 230px;
        }
        &:nth-of-type(5) {
          position: relative;
          z-index: 10;

          &::after {
            content: "더보기";
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            font-size: 25px;
            color: #fff;
            z-index: 15;
          }
          &::before {
            content: "";
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            background: rgb(81 77 77 / 50%);
            z-index: 10;
          }
        }
      }
    }

    li {
      width: 100%;
      height: 350px;
      position: relative;
    }
    img {
      width: 100%;
      height: 100%;
      border-radius: 5px;
    }
  }
`;

export const ReviewBlock = styled.div`
  padding-top: 25px;
`;
