import { useMemo } from "react";
import { ROUTER_PATH } from "constants/router_path";
import FeedPost from "components/domain/Posts";
import SideBtnMenu from "components/common/SideBtnMenu";
import userState from "store/userState";
import { StoryWarp } from "./styles";
import { getAllContents } from "utils/apis/contents";
import { CONTENTS_KEY } from "constants/query_key";

const { SAVE_CONTENTS, STORY } = ROUTER_PATH;
const Feed = () => {
  const { userInfo } = userState();

  const menuItem = useMemo(
    () => [
      {
        id: 1,
        path: `${SAVE_CONTENTS}`,
        label: "작성하기"
      },
      {
        id: 2,
        path: `${STORY}/${userInfo?.nickname}`,
        label: "내피드"
      }
    ],
    [userInfo?.nickname]
  );
  return (
    <StoryWarp className="posts">
      <FeedPost params="" queryKey={CONTENTS_KEY} fetcher={getAllContents} />
      <SideBtnMenu menuItem={menuItem} />
    </StoryWarp>
  );
};

export default Feed;
