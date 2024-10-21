import { useState, useEffect, useCallback } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { FcLike } from "react-icons/fc";
import userState from "store/userState";
import { ILike } from "models/data";
import useAddLike from "hooks/service/mutator/like/useAddLike";
import useUnLike from "hooks/service/mutator/like/useUnLike";

interface IProps {
  contentsId?: string;
  likes?: ILike[];
  likeCount?: number;
}

const PostLikeStatus = ({ contentsId, likes, likeCount }: IProps) => {
  const [isLike, setIsLike] = useState(false);
  const { userInfo: currentUser } = userState();
  const addLike = useAddLike();
  const unLike = useUnLike();

  useEffect(() => {
    likes?.map((like) => {
      if (like.writer === currentUser?._id) {
        setIsLike(like.writer === currentUser?._id);
      }
    });

    return () => {
      if (!likes) {
        setIsLike(false);
      }
    };
  }, [currentUser?._id, likes]);

  const onClickLikes = useCallback(() => {
    const insertData = {
      userId: currentUser?._id as string,
      contentsId: contentsId
    };
    if (!isLike) {
      addLike.mutate(insertData);
    } else {
      unLike.mutate(insertData);
      setIsLike(false);
    }
  }, [addLike, contentsId, currentUser?._id, isLike, unLike]);

  return (
    <div className="status_item links">
      <div>공감</div>
      <div className="likes-icon" onClick={onClickLikes}>
        {isLike ? (
          <FcLike color="#000" className="icon" />
        ) : (
          <AiOutlineHeart color="#f44336" className="icon" />
        )}
      </div>
      <div className="count">{likeCount}</div>
    </div>
  );
};

export default PostLikeStatus;
