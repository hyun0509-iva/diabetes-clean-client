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

export const PostBodyBlock = styled.div`
  padding: 0 5px;

  .img-wrap {
    padding-top: 8px;
    width: 100%;
    height: 350px;

    img {
      width: 100%;
      height: 100%;
      border-radius: 5px;
    }
  }
  .content-wrap {
    padding: 30px 0px;
    p {
      width: 100%;
      font-size: 16px;
      font-weight: 300;
    }
  }
`;

export const ReviewBlock = styled.div`
  padding-top: 25px;
`;
