import { Suspense, useMemo } from "react";
import { ROUTER_PATH } from "constants/router_path";
import FeedPost from "components/common/Posts";
import SideBtnMenu from "components/common/SideBtnMenu";
import userState from "store/userState";
import { StoryWarp } from "./styles";
import { getContentsFindByIdAPI } from "utils/apis/contents";
import { QUERY_KEY } from "constants/query_key";
import PostItem from "components/common/Posts/PostItem";
import { IContents, IContentsDetailResponse } from "models/data";
import { useAPIByParamQuery } from "hooks/service/queries";
import { useParams } from "react-router-dom";
import { PostCardWrap } from "components/common/Posts/styles";
// import Spinner from "components/common/Spinner";

const { CONTENTS_KEY } = QUERY_KEY;
const { SAVE_CONTENTS, STORY } = ROUTER_PATH;

const FeedDetail = () => {
  const { userInfo } = userState();
  const { id } = useParams();
  const { data } = useAPIByParamQuery<IContentsDetailResponse>(
    id as string,
    `${CONTENTS_KEY}/${id}`,
    getContentsFindByIdAPI
  );

  const contents: IContents = data?.contents as IContents;
  console.log({ de: contents });
  const menuItem = useMemo(
    () => [
      {
        id: 1,
        path: `${SAVE_CONTENTS}`,
        label: "작성하기"
      }
    ],
    []
  );
  return (
    <StoryWarp className="posts">
      <PostCardWrap>{data && <PostItem {...contents} />}</PostCardWrap>
      <SideBtnMenu menuItem={menuItem} />
    </StoryWarp>
  );
};

export default FeedDetail;
