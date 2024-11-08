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
  padding: 16px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0px 0px 10px 4px rgb(0 0 0 /10%);
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
export const EmptyPostItemWrap = styled(ErrprPostItemWrap)`
  height: 360px;
  color: #adb5bd;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const PostContent = styled.section`
  position: relative;
  margin-bottom: 25px;
  padding-top: 10px;
`;

export const PostContentBlock = styled.div<{
  isDeleted: boolean;
  moreImg?: number;
}>`
  padding: 0 5px;
  cursor: ${(props) => (props.isDeleted ? "default" : "pointer")};

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
          cursor: pointer;

          &::after {
            content: "더보기";
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            font-size: 25px;
            color: #fff;
          }
          &::before {
            content: "";
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            background: rgb(81 77 77 / 50%);
          }

          .item_txt {
            position: absolute;
            top: 57%;
            right: 28%;
            color: #fff;
            font-size: 28px;
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
  padding: 0;
`;

export const PostsSpinnerBlock = styled.div`
  position: fixed;
  top: 80%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 99;
`;
