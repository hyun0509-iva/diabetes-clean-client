import { memo } from "react";
import Comments from "components/domain/Comments";
import PostHeader from "components/domain/Posts/PostHeader";
import PostStatus from "components/domain/Posts/PostStatus";
import {
  ICommentResponse,
  IContents,
  ILikeResponse,
  TMyInfo
} from "models/data";
import { useAPIByIdQuery } from "hooks/service/queries";
import { QUERY_KEY } from "constants/query_key";
import { getAllComment } from "utils/apis/comment";

import { Contour } from "styles/common";
import {
  PostBody,
  PostBodyBlock,
  ReviewBlock,
  PostItemWrap
} from "components/domain/Posts/styles";
import { getContentsLike } from "utils/apis/like";

const { COMMENT_KEY, Like_key } = QUERY_KEY;

const PostItem = ({
  _id,
  writer,
  content,
  imageName,
  imageUrl,
  isDeleted,
  createdAt
}: IContents) => {
  const { data: contentsLike } = useAPIByIdQuery<ILikeResponse>(
    _id,
    Like_key,
    getContentsLike
  );
  const { data: comments } = useAPIByIdQuery<ICommentResponse>(
    _id,
    COMMENT_KEY,
    getAllComment
  );

  return (
    <PostItemWrap key={_id}>
      <PostHeader
        createdAt={createdAt}
        writer={writer as TMyInfo}
        contentsId={_id}
        isDeleted={isDeleted}
      />
      {isDeleted ? (
        <PostBody>
          <PostBodyBlock>해당 게시물이 삭제되었습니다.</PostBodyBlock>
        </PostBody>
      ) : (
        <>
          <PostBody>
            <PostBodyBlock className="nn">
              {imageUrl && (
                <div className="img-wrap">
                  <img src={imageUrl} alt={imageName || ""} />
                </div>
              )}
              <div className="content-wrap">
                <p>{content}</p>
              </div>
            </PostBodyBlock>
            <PostBodyBlock>
              <PostStatus
                contentsId={_id}
                likes={contentsLike?.like}
                commentCount={comments?.comment.length}
              />
            </PostBodyBlock>
            <Contour />
            <ReviewBlock>
              {comments && (
                <Comments postId={_id} comments={comments?.comment} />
              )}
            </ReviewBlock>
          </PostBody>
        </>
      )}
    </PostItemWrap>
  );
};

export default memo(PostItem);
