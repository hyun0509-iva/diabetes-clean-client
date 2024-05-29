import { useParams } from "react-router-dom";
import MyPosts from "components/domain/Posts";
import { getUserContents } from "utils/apis/contents";
import { QUERY_KEY } from "constants/query_key";

const { MY_FEED_KEY } = QUERY_KEY;

// 내 게시글
const MyPost = () => {
  const { usernick } = useParams();
  return (
    <MyPosts
      params={usernick as string}
      queryKey={MY_FEED_KEY}
      fetcher={getUserContents}
    />
  );
};

export default MyPost;
