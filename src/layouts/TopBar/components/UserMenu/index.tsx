import React, { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { FcCollapse, FcExpand } from "react-icons/fc";
import gravatar from "gravatar";
import { IUserInfo, IUserResponse } from "models/data";
import Avatar from "components/common/Avatar";
import UserSubMenu from "layouts/TopBar/components/UserSubMenu";
import { getUserIdByTokenAPI } from "utils/apis/auth";
import { ROUTER_PATH } from "constants/router_path";
import { QUERY_KEY } from "constants/query_key";
import { useAPIQuery } from "hooks/service/queries";

import { MenuList, UserInfoWrap, UserItem } from "./styles";

import userState from "store/userState";

const { USER_KEY } = QUERY_KEY;

const UserMenu = () => {
  const { LOGIN, SIGNUP } = ROUTER_PATH;
  const { isAuth, userInfo } = userState();

  // 유저 인증 상태
  // const {
  //   data: me,
  //   error,
  //   isLoading
  // } = useAPIQuery<IUserResponse>([USER_KEY], getUserIdByTokenAPI, {
  //   enabled: isAuth !== null && isAuth
  // });

  const [showUserSubMenu, setShowUserSubMenu] = useState(false);
  const onShowUserSubMenu = useCallback(() => {
    setShowUserSubMenu(!showUserSubMenu);
  }, [showUserSubMenu]);

  const onCloseMenu = useCallback(() => {
    setShowUserSubMenu(false);
  }, []);

  // if (isLoading) return null;
  const renderMenu = (isLoggedIn: boolean) => {
    if (!isLoggedIn) {
      return (
        <>
          <UserItem>
            <Link to={LOGIN}>로그인</Link>
          </UserItem>
          <UserItem>
            <Link to={SIGNUP}>회원가입</Link>
          </UserItem>
        </>
      );
    } else {
      return (
        <>
          <MenuList>
            <UserItem>
              {userInfo && (
                <UserInfoWrap
                  onClick={onShowUserSubMenu}
                  onMouseDown={(e) => e.stopPropagation()}
                >
                  <span className="profile-img">
                    <Avatar
                      size={40}
                      imgUrl={
                        (userInfo as IUserInfo)?.imageData.url
                          ? (userInfo as IUserInfo)?.imageData.url
                          : gravatar.url((userInfo as IUserInfo)?.email, {
                              s: "40px",
                              d: "retro"
                            })
                      }
                    />
                  </span>
                  <span className="menuIcon">
                    {showUserSubMenu ? <FcCollapse /> : <FcExpand />}
                  </span>
                </UserInfoWrap>
              )}
            </UserItem>
          </MenuList>
          <UserSubMenu
            showSubMenu={showUserSubMenu}
            onCloseMenu={onCloseMenu}
          />
        </>
      );
    }
  };

  return <>{renderMenu(isAuth as boolean)}</>;
};

export default React.memo(UserMenu);
