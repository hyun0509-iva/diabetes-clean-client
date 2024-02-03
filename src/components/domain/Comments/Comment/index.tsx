import { useCallback, useMemo } from "react";
import { FiMoreHorizontal } from "react-icons/fi";
import gravatar from "gravatar";
import { IComment } from "models/data";
import SubMenu from "components/common/SubMenu";
import ContentsInfo from "components/domain/Feed/PostUserInfo";
import CommentForm from "components/domain/Comments/CommentForm";
import { Icons } from "components/domain/Posts/styles";
import alertHandler from "utils/functions/alertHandler";
import userState from "store/userState";
import { useDelComment } from "hooks/service/mutator";
import { useToggle } from "hooks/common/useToggle";
import { CommentContainer, CommentContents, CommentHeader } from "./styles";
import { ROUTER_PATH } from "constants/router_path";

interface Iprops {
  comment: IComment;
}

const Comment = ({ comment }: Iprops) => {
  const { userInfo } = userState();
  const userId = userInfo?._id as string;
  const [isShowSubMenu, setIsShowSubMenu, onToggleMenu] = useToggle();
  const [isShowCommentForm, setIsShowCommentForm, onToggleComment] =
    useToggle();
  const mutation = useDelComment();
  const {
    _id: commentId,
    content,
    createdAt,
    writer,
    isDeleted,
    contentsId
  } = comment;
  const { STORY } = ROUTER_PATH;
  const onCloseMenu = useCallback(() => {
    setIsShowSubMenu(false);
  }, []);
  const onCloseCommentForm = useCallback(() => {
    setIsShowCommentForm(false);
  }, []);

  const onReportComment = useCallback(() => {
    console.log("ReportPost >> 개발중");
  }, []);

  const onHideComment = useCallback(() => {
    console.log("HidePost >> 개발중");
  }, []);

  const onDelComment = useCallback(() => {
    if (commentId) {
      alertHandler
        .onConfirm({
          msg: "댓글을 삭제하실건가요?"
        })
        .then((result) => {
          if (result.isConfirmed) {
            mutation.mutate(commentId);
          }
        });
    }
  }, [commentId, mutation]);

  const menuItem = useMemo(() => {
    if (userId === writer?._id) {
      return [
        {
          id: 1,
          path: null,
          label: `${isShowCommentForm ? "수정 취소" : "댓글 수정"}`,
          handler: isShowCommentForm ? onCloseCommentForm : onToggleComment
        },
        {
          id: 2,
          path: null,
          label: "댓글 삭제",
          handler: onDelComment
        }
      ];
    }
    return [
      {
        id: 1,
        path: null,
        label: "신고",
        handler: onHideComment
      }
    ];
  }, [
    userId,
    writer?._id,
    onHideComment,
    isShowCommentForm,
    onCloseCommentForm,
    onToggleComment,
    onDelComment
  ]);
  return (
    <CommentContainer>
      <CommentHeader>
        <ContentsInfo
          createdAt={createdAt}
          imgUrl={
            writer?.imageSrc
              ? writer?.imageSrc
              : gravatar.url(writer?.nickname, {
                  s: "32px",
                  d: "retro"
                })
          }
          imgSize={40}
          userName={writer.nickname}
          link={`${STORY}/${writer.nickname}`}
        />
        {!isDeleted && (
          <Icons
            onClick={onToggleMenu}
            onMouseDown={(e) => {
              e.stopPropagation();
            }}
          >
            <span>
              <FiMoreHorizontal />
            </span>
          </Icons>
        )}
        {!isDeleted && isShowSubMenu && (
          <SubMenu
            menuItem={menuItem}
            showSubMenu={isShowSubMenu}
            onCloseMenu={onCloseMenu}
            customCss={{ posX: "125px", posY: "35px" }}
          />
        )}
      </CommentHeader>
      <CommentContents>
        <>
          {isDeleted ? (
            "해당 댓글이 삭제되었습니다."
          ) : (
            <>
              {isShowCommentForm ? (
                <CommentForm
                  contentsId={contentsId}
                  commentId={commentId}
                  preContent={content}
                  onClose={onCloseCommentForm}
                  editMode
                />
              ) : (
                <p>{content}</p>
              )}
            </>
          )}
        </>
      </CommentContents>
    </CommentContainer>
  );
};

export default Comment;
