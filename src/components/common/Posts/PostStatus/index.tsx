import { PostStatusWrap } from "./styles";
import PostLikeStatus from "../PostLikeStatus";
import { IContentsLikeData } from "models/data";

interface IProps {
  contentsId: string;
  likeData: IContentsLikeData;
  commentCount?: number;
}
const PostStatus = ({ contentsId, likeData, commentCount }: IProps) => {
  // console.log(likeData); /* {contentsLike, count} */
  return (
    <PostStatusWrap>
      <div className="status_inner">
        <PostLikeStatus likeData={likeData} contentsId={contentsId} />
        <div className="status_item comments">
          <div>댓글</div>
          <div className="count">{commentCount}</div>
        </div>
      </div>
    </PostStatusWrap>
  );
};

export default PostStatus;
