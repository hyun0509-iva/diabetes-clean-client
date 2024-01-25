import { useParams } from "react-router-dom";
import MyPosts from "components/domain/Posts";
import { getUserContents } from "utils/apis/contents";
import { MY_FEED } from "constants/query_key";

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
