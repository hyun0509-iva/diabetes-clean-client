import { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { FiMoreHorizontal } from "react-icons/fi";
import gravatar from "gravatar";
import SubMenu from "components/common/SubMenu";

import { PostHeaderBlock, Icons } from "components/domain/Posts/styles";
import userState from "store/userState";
import { IUserInfo, TMyInfo } from "models/data";
import { useDelContents } from "hooks/service/mutator";
import alertHandler from "utils/functions/alertHandler";
import PostUserInfo from "components/domain/Feed/PostUserInfo";
import useUnFollowMutation from "hooks/service/mutator/follow/useUnFollow";
import useFollowMutation from "hooks/service/mutator/follow/useFollow";
import { ROUTER_PATH } from "constants/router_path";

interface IProps {
  writer: TMyInfo;
  contentsId: string;
  isDeleted: boolean;
  createdAt: string | Date;
}
const { UPDATE_CONTENTS } = ROUTER_PATH;
const PostHeader = ({ writer, contentsId, createdAt, isDeleted }: IProps) => {
  const { userInfo: currentUser } = userState();
  const [isFollow, setIsFollow] = useState(false);
  const [showSubMenu, setShowSubMenu] = useState<boolean>(false);
  const navigate = useNavigate();
  const followMutate = useFollowMutation();
  const unFollowMutate = useUnFollowMutation();
  const contentsMutation = useDelContents();

  useEffect(() => {
    if (writer) {
      setIsFollow((currentUser as IUserInfo).followings.includes(writer._id));
    }
  }, [currentUser, writer]);

  const onToggleMenu = useCallback(() => {
    setShowSubMenu((prev) => !prev);
  }, []);

  const onCloseMenu = useCallback(() => {
    setShowSubMenu(false);
  }, []);

  const onDelPost = useCallback(() => {
    if (contentsId) {
      console.log({ contentsId });
      alertHandler
        .onConfirm({
          msg: "포스팅을 삭제하실건가요?"
        })
        .then((result) => {
          if (result.isConfirmed) {
            contentsMutation.mutate(contentsId);
          }
        });
    }
  }, [contentsMutation, contentsId]);

  const onUpdatePost = useCallback(() => {
    navigate(`${UPDATE_CONTENTS}`, { state: contentsId });
  }, [contentsId, navigate]);

  const onFollow = useCallback(() => {
    isFollow
      ? unFollowMutate.mutate(writer?._id as string)
      : followMutate.mutate(writer?._id as string);
  }, [isFollow, writer, followMutate, unFollowMutate]);

  const onReportPost = useCallback(() => {
    console.log("ReportPost");
  }, []);

  const menuItem = useMemo(() => {
    if (currentUser?._id === writer?._id) {
      return [
        {
          id: 1,
          path: null,
          label: "게시물 수정",
          handler: onUpdatePost
        },
        {
          id: 2,
          path: null,
          label: "게시물 삭제",
          handler: onDelPost
        },
        {
          id: 3,
          path: null,
          label: "취소",
          handler: onCloseMenu
        }
      ];
    }

    return [
      {
        id: 1,
        path: null,
        label: `${isFollow ? "팔로우 취소" : "팔로우"}`,
        handler: onFollow
      },
      {
        id: 2,
        path: null,
        label: "게시물 신고",
        handler: onReportPost
      },
      {
        id: 3,
        path: null,
        label: "취소",
        handler: onCloseMenu
      }
    ];
  }, [
    currentUser?._id,
    isFollow,
    onCloseMenu,
    onDelPost,
    onFollow,
    onReportPost,
    onUpdatePost,
    writer?._id
  ]);

  return (
    <div style={{ position: "relative", width: "100%" }}>
      <PostHeaderBlock>
        <PostUserInfo
          createdAt={createdAt}
          userName={writer?.nickname}
          imgUrl={
            writer?.imageSrc
              ? writer?.imageSrc
              : gravatar.url(writer?.nickname, {
                  s: "32px",
                  d: "retro"
                })
          }
          link={`/story/${writer?.nickname}`}
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
        {!isDeleted && showSubMenu && (
          <SubMenu
            customCss={{ posX: "125px" }}
            menuItem={menuItem}
            showSubMenu={showSubMenu}
            onCloseMenu={onCloseMenu}
          />
        )}
      </PostHeaderBlock>
    </div>
  );
};

export default PostHeader;
