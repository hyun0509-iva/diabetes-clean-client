import { memo, useEffect, useState } from "react";
import Comments from "components/domain/Comments";
import PostHeader from "components/common/Posts/PostHeader";
import PostStatus from "components/common/Posts/PostStatus";
import {
  IContents,
  IContentsLikeData,
  IContentsLikeResponse,
  IUploadedImg,
  TMyInfo
} from "models/data";
import { useAPIByParamQuery } from "hooks/service/queries";
import { QUERY_KEY } from "constants/query_key";

import { Contour } from "styles/common";
import {
  PostContent,
  PostContentBlock,
  ReviewBlock,
  PostItemWrap
} from "components/common/Posts/styles";
import { getContentsLikeAPI } from "utils/apis/like";
import NewLine from "components/common/NewLine";
import { useLocation, useNavigate } from "react-router-dom";
import PostLikeStatus from "../PostLikeStatus";

const { Like_key } = QUERY_KEY;

const imgLayoutClass = (imageLength: number) => {
  // const imgLen = (imageData as IUploadedImg[])?.length;
  return (() => {
    if (imageLength > 5) {
      return `flex_wrap_len05 more`;
    }

    switch (imageLength) {
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

const PostItem = ({
  _id,
  writer,
  content,
  imageData,
  isDeleted,
  createdAt,
  comments,
  commentCount
}: IContents) => {
  const { data } = useAPIByParamQuery<IContentsLikeResponse>(
    _id,
    `${Like_key}`,
    getContentsLikeAPI
  );
  // const { data: comments_ } = useAPIByParamQuery<ICommentResponse>(
  //   _id,
  //   COMMENT_KEY,
  //   getAllCommentAPI
  // );

  const [isOpenImgDetail, setIsOpenImgDetail] = useState(false);
  const [isDetailPage, setDetailPage] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    const segments = pathname.split("/");
    setDetailPage(segments[1] === "story" && segments.length === 3);
  }, [pathname]);

  return (
    <PostItemWrap key={_id}>
      <PostHeader
        createdAt={createdAt}
        writer={writer as TMyInfo}
        contentsId={_id}
        isDeleted={isDeleted}
      />
      {isDeleted ? (
        <PostContent>
          <PostContentBlock isDeleted={isDeleted}>
            해당 게시물이 삭제되었습니다.
          </PostContentBlock>
        </PostContent>
      ) : (
        <>
          <PostContent>
            <PostContentBlock
              isDeleted={isDeleted}
              onClick={() => navigate(`/story/${_id}`)}
            >
              <div className="content-wrap">
                <p>
                  <NewLine context={content} />
                </p>
              </div>
              <ul
                className={`img-wrap ${imgLayoutClass(
                  (imageData as IUploadedImg[])?.length
                )}`}
              >
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
            </PostContentBlock>
          </PostContent>
          <Contour />
          {isDetailPage ? (
            <>
              <PostStatus
                contentsId={_id}
                likeData={data?.like as IContentsLikeData}
                commentCount={commentCount as number}
              />
              <ReviewBlock>
                <Comments postId={_id} comments={comments} />
              </ReviewBlock>
            </>
          ) : (
            <PostStatus
              contentsId={_id}
              linkUrl={`/story/${_id}`}
              likeData={data?.like as IContentsLikeData}
              commentCount={commentCount as number}
            />
          )}
        </>
      )}
    </PostItemWrap>
  );
};

export default memo(PostItem);
