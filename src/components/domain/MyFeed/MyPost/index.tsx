import { useParams } from "react-router-dom";
import MyPosts from "components/domain/Posts";
import { getUserContents } from "utils/apis/contents";
import { QUERY_KEY } from "constants/query_key";

const { MY_FEED } = QUERY_KEY;

// 내 게시글
const MyPost = () => {
  const { username } = useParams();
  return (
    <MyPosts
      params={username as string}
      queryKey={MY_FEED}
      fetcher={getUserContents}
    />
  );
};

export default MyPost;
