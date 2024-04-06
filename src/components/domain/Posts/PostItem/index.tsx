import { memo, useState } from "react";
import Comments from "components/domain/Comments";
import PostHeader from "components/domain/Posts/PostHeader";
import PostStatus from "components/domain/Posts/PostStatus";
import {
  ICommentResponse,
  IContents,
  ILikeResponse,
  IUploadedImg,
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
import NewLine from "components/common/NewLine";

const { COMMENT_KEY, Like_key } = QUERY_KEY;

const PostItem = ({
  _id,
  writer,
  content,
  imageData,
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

  const [isOpenImgDetail, setIsOpenImgDetail] = useState(false);

  const imgLayoutClass = () => {
    const imgLen = (imageData as IUploadedImg[])?.length;
    return (() => {
      if (imgLen > 5) {
        return `flex_wrap_len05 more`;
      }

      switch (imgLen) {
        case 2:
          return "flex_wrap_len02";
        case 3:
          return "flex_wrap_len03";
        case 4:
          return "flex_wrap_len04";
        case 5:
          return "flex_wrap_len05";
        default:
          return "";
      }
    })();
  };
  console.log(imageData);
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
            <PostBodyBlock>
              <div className="content-wrap">
                <p>
                  <NewLine context={content} />
                </p>
              </div>
              <ul className={`img-wrap ${imgLayoutClass()}`}>
                {imageData?.length
                  ? imageData.map((image, idx) => (
                      <li
                        key={image.assetId}
                        onClick={() => {
                          if (idx === 4) {
                            console.log(idx);
                            // 이미지 상세 열기를 위한 상태 관리
                            setIsOpenImgDetail((prev) => !prev);
                          }
                        }}
                      >
                        <img src={image.url} alt="" width={"300px"} />
                        {imageData.length > 5 && (
                          <div className="item_txt">
                            &#43;{imageData.length - 5}
                          </div>
                        )}
                      </li>
                    ))
                  : null}
              </ul>
              {isOpenImgDetail && <div>이미지 상세 모달 형식의 페이지</div>}
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
