import { useCallback } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { FcLike } from "react-icons/fc";
import userState from "store/userState";
import { IContentsLikeData } from "models/data";
import useAddLike from "hooks/service/mutator/like/useAddLike";
import useUnLike from "hooks/service/mutator/like/useUnLike";

interface IProps {
  likeData: IContentsLikeData;
  contentsId: string;
}
/* {contetnsLike, count} */
const PostLikeStatus = ({ likeData, contentsId }: IProps) => {
  const { userInfo: currentUser } = userState();
  const addLike = useAddLike();
  const unLike = useUnLike();

  const isLiked =
    !!likeData?.contentsLike.length &&
    !!likeData?.contentsLike.find((like) => like.writer === currentUser?._id);

  const onClickLikes = useCallback(() => {
    if (!isLiked) {
      addLike.mutate({ contentsId });
    } else {
      unLike.mutate({ contentsId });
    }
  }, [addLike, contentsId, isLiked, unLike]);

  return (
    <div className="status_item links">
      <div>공감</div>
      <div className="likes-icon" onClick={onClickLikes}>
        {isLiked ? (
          <FcLike color="#000" className="icon" />
        ) : (
          <AiOutlineHeart color="#f44336" className="icon" />
        )}
      </div>
      <div className="count">{likeData?.count}</div>
    </div>
  );
};

export default PostLikeStatus;
