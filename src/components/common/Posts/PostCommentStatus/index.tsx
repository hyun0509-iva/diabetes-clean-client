import React from "react";
import { useNavigate } from "react-router-dom";
import { CommentStatusWrap } from "./style";

interface IProps {
  linkUrl?: string;
  count: number;
}

const PostCommentStatus = ({ linkUrl, count }: IProps) => {
  const navigate = useNavigate();

  return (
    <CommentStatusWrap>
      {linkUrl ? (
        <div className="btn-link" onClick={() => navigate(linkUrl)}>
          댓글
        </div>
      ) : (
        <div>댓글</div>
      )}
      <div className="count">{count}</div>
    </CommentStatusWrap>
  );
};

export default PostCommentStatus;
