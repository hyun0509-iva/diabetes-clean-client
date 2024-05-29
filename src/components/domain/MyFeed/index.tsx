import { useState, useEffect, useCallback, useMemo } from "react";
import { useParams, Outlet } from "react-router-dom";
import { QueryClient, useQueryClient } from "@tanstack/react-query";
import gravatar from "gravatar";
import Avatar from "components/common/Avatar";
import NavMenu from "components/common/NavMenu";
import Button from "components/common/Button";
import { ROUTER_PATH } from "constants/router_path";
import userState from "store/userState";
import { useAPIByParamQuery } from "hooks/service/queries";
import useFollowMutation from "hooks/service/mutator/follow/useFollow";
import useUnFollowMutation from "hooks/service/mutator/follow/useUnFollow";
import { getMyFeedInfo } from "utils/apis/contents";
import { getFollow } from "utils/apis/follow";
import { QUERY_KEY } from "constants/query_key";
import { IFollowResponse, IMyFeedResponse } from "models/data";
import SideBtnMenu from "components/common/SideBtnMenu";
import {
  MyFeedContainer,
  MyFeedWrap,
  Header,
  LeftSide,
  MainContents,
  MyFeedMain,
  UserInfo,
  UserStatus
} from "./styles";

const { FOLLOW_KEY, MY_FEED_KEY } = QUERY_KEY;

const MyFeed = () => {
  const { STORY, SAVE_CONTENTS } = ROUTER_PATH;
  const [isFollow, setIsFollow] = useState(false);
  const { usernick } = useParams();
  const { data, isLoading } = useAPIByParamQuery<IMyFeedResponse>(
    usernick as string,
    `${MY_FEED_KEY}/info`,
    getMyFeedInfo // myfeedInfo: {writer, contentsCount}
  );
  const writer = data?.myfeedInfo.writer;
  const { userInfo: currentUser } = userState(); //현재 인증된 유저
  const followMutate = useFollowMutation();
  const unFollowMutate = useUnFollowMutation();
  const subMenus = useMemo(
    () => [
      {
        id: 1,
        label: `${usernick === currentUser?.nickname ? "내 게시글" : "게시글"}`,
        url: `${STORY}/${usernick}`
      },
      { id: 2, label: "관심 글", url: `${STORY}/${usernick}/empathy` }
    ],
    [STORY, currentUser?.nickname, usernick]
  );

  const { data: followData } = useAPIByParamQuery<IFollowResponse>(
    writer?._id as string,
    FOLLOW_KEY,
    getFollow
  );
  useEffect(() => {
    if (followData && currentUser) {
      // 팔로우 버튼: 유저의 팔로워 목록에 내가 존재하는가?
      setIsFollow(
        followData?.followInfo?.followers.includes(currentUser?._id as string)
      );
    }
  }, [currentUser, followData, writer]);

  const onFollow = useCallback(() => {
    isFollow
      ? unFollowMutate.mutate(writer?._id as string)
      : followMutate.mutate(writer?._id as string);
  }, [isFollow, followMutate, writer?._id, unFollowMutate]);

  if (isLoading) return null;
  return (
    <MyFeedWrap>
      <MyFeedContainer>
        <Header>
          <span>{writer?.nickname}님 스토리</span>
        </Header>
        <MyFeedMain>
          <LeftSide>
            <div className="inner">
              <UserInfo>
                <div className="profile-img">
                  <Avatar
                    imgName=""
                    size={150}
                    imgUrl={
                      writer?.imageData?.url
                        ? writer?.imageData?.url
                        : gravatar.url(writer?.email as string, {
                            s: "130px",
                            d: "retro"
                          })
                    }
                  />
                </div>
                <div className="user-fields">
                  <div>{writer?.nickname}</div>
                  <div>
                    {currentUser?.nickname !== writer?.nickname && (
                      <Button
                        context={`${isFollow ? "팔로우 취소" : "팔로우"}`}
                        type="button"
                        onClick={onFollow}
                        style={{
                          margin: "10px 0",
                          width: 120,
                          height: 45,
                          fontSize: 18,
                          color: "#edf2ff",
                          background: "#637ed3"
                        }}
                      />
                    )}
                  </div>
                </div>
              </UserInfo>
              <UserStatus>
                <ul>
                  <li>
                    <span className="status-inner">
                      <span className="status">팔로잉</span>
                      <span>{followData?.followInfo?.followings.length}</span>
                    </span>
                  </li>
                  <li>
                    <span className="status-inner">
                      <span className="status">팔로워</span>
                      <span>{followData?.followInfo?.followers.length}</span>
                    </span>
                  </li>
                  <li>
                    <span className="status-inner">
                      <span className="status">게시글</span>
                      <span>{data?.myfeedInfo.contentsCount}</span>
                    </span>
                  </li>
                </ul>
              </UserStatus>
            </div>
          </LeftSide>
          <MainContents>
            <NavMenu lists={subMenus} borderColor="#868e96" />
            <Outlet />
          </MainContents>
        </MyFeedMain>
      </MyFeedContainer>
      <SideBtnMenu
        menuItem={[
          {
            id: 1,
            path: `${SAVE_CONTENTS}`,
            label: "작성하기"
          }
        ]}
      />
    </MyFeedWrap>
  );
};

export default MyFeed;
