import { useParams } from "react-router-dom";
import LikedPosts from "components/common/Posts";
import { getLikedPostsAPI } from "utils/apis/contents";

// 관심글
const LikedPost = () => {
  const { usernick } = useParams();

  return (
    <LikedPosts
      params={usernick as string}
      queryKey="liked_contents"
      fetcher={getLikedPostsAPI}
    />
  );
};

export default LikedPost;
