import { PostStatusWrap } from "./styles";
import PostLikeStatus from "../PostLikeStatus";
import { IContentsLikeData } from "models/data";
import { useLocation, useNavigate } from "react-router-dom";
import PostCommentStatus from "../PostCommentStatus";

interface IProps {
  contentsId: string;
  likeData: IContentsLikeData;
  commentCount?: number;
}
const PostStatus = ({ contentsId, likeData, commentCount }: IProps) => {
  // console.log(likeData); /* {contentsLike, count} */
  const navigate = useNavigate();

  return (
    <PostStatusWrap>
      <div className="status_inner">
        <PostLikeStatus likeData={likeData} contentsId={contentsId} />
        <PostCommentStatus
          linkUrl={`/story/${contentsId}`}
          count={commentCount as number}
        />
      </div>
    </PostStatusWrap>
  );
};

export default PostStatus;
