import { PostStatusWrap } from "./styles";
import LikeStatus from "../PostLikeStatus";
import { ILike } from "models/data";

interface IProps {
  contentsId: string;
  likes?: ILike[];
  commentCount?: number;
}
const PostStatus = ({ contentsId, likes, commentCount }: IProps) => {
  return (
    <PostStatusWrap>
      <div className="status_inner">
        <LikeStatus
          likes={likes}
          contentsId={contentsId}
          likeCount={likes?.length}
        />
        <div className="status_item comments">
          <div>댓글</div>
          <div className="count">{commentCount}</div>
        </div>
      </div>
    </PostStatusWrap>
  );
};

export default PostStatus;
