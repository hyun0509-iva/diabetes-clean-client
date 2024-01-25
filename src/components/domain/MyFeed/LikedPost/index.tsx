import { useParams } from "react-router-dom";
import LikedPosts from "components/domain/Posts";
import { getLikedPosts } from "utils/apis/contents";

// 관심글
const LikedPost = () => {
  const { username } = useParams();
  return (
    <LikedPosts
      params={username as string}
      queryKey="liked_contents"
      fetcher={getLikedPosts}
    />
  );
};

export default LikedPost;
