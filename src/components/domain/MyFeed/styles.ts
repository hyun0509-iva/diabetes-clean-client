import { palette } from "libs/palette";
import styled from "@emotion/styled";
import { Container } from "styles/common";
import { StoryWarp } from "components/domain/Feed/styles";

export const MyFeedWrap = styled(Container)`
  max-width: inherit;
  width: 90%;
`;
export const Header = styled.header`
  width: 100%;
  padding: 15px 20px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  background-color: ${palette.gray[1]};
  box-shadow: 0px 0px 12px -3px rgb(0 0 0 / 30%);
  font-size: 18px;
`;

export const MyFeedMain = styled.section`
  display: flex;
`;
export const MyFeedContainer = styled.div`
  width: 100%;
`;

export const LeftSide = styled.aside`
  position: sticky;
  top: 0;
  width: 350px;
  height: 500px;
  .inner {
    padding: 20px 20px 20px 0px;
    text-align: center;
  }
  .user-info {
    padding-top: 20px;
  }
`;

export const UserInfo = styled.div`
  position: relative;
  padding: 20px 0 30px;
  box-shadow: 0px 0px 12px -3px rgb(0 0 0 / 20%);

  .profile-img {
    width: 100%;
    padding-bottom: 8px;
  }

  .user-fields {
    font-size: 17px;
    display: flex;
    flex-direction: column;
    gap: 13px;
  }
`;

export const UserStatus = styled.div`
  padding-top: 30px;

  ul {
    display: flex;
    justify-content: center;
    gap: 15px;
    padding: 10px 0;
    box-shadow: 0px 0px 12px -3px rgb(0 0 0 / 20%);
  }
  li {
    padding: 10px 6px;
    & .status-inner {
      display: flex;
      flex-direction: column;
      position: relative;
    }
    &:not(:last-child) .status-inner::after {
      content: "";
      position: absolute;
      top: 0;
      right: -10px;
      width: 1px;
      height: 100%;
      background-color: ${palette.gray[2]};
    }
    & .status {
      display: inline-block;
    }
  }
`;

export const MainContents = styled(StoryWarp)`
  flex: 80px 3;

  .container {
    background-color: ${palette.gray[1]};
    padding: 30px;
  }
`;
