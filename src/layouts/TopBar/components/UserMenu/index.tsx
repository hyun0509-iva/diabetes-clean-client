import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { FcCollapse, FcExpand } from "react-icons/fc";
import gravatar from "gravatar";
import { IUserResponse } from "models/data";
import Avatar from "components/common/Avatar";
import UserSubMenu from "layouts/TopBar/components/UserSubMenu";
import { getUserIdByToken } from "utils/apis/userApis";
import { ROUTER_PATH } from "constants/router_path";
import { QUERY_KEY } from "constants/query_key";

import { MenuList, UserInfoWrap, UserItem } from "./styles";
import { useAPIQuery } from "hooks/service/queries";
import userState from "store/userState";

const { USER_KEY } = QUERY_KEY;

const UserMenu = () => {
  const { LOGIN, SIGNUP } = ROUTER_PATH;
  const { isAuth } = userState();

  // 유저 인증 상태
  const { data: me, error } = useAPIQuery<IUserResponse>(
    USER_KEY,
    getUserIdByToken
  );

  const [showUserSubMenu, setShowUserSubMenu] = useState(false);
  const onShowUserSubMenu = useCallback(() => {
    setShowUserSubMenu(!showUserSubMenu);
  }, [showUserSubMenu]);

  const onCloseMenu = useCallback(() => {
    setShowUserSubMenu(false);
  }, []);

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
              {me && (
                <UserInfoWrap
                  onClick={onShowUserSubMenu}
                  onMouseDown={(e) => e.stopPropagation()}
                >
                  <span className="profile-img">
                    <Avatar
                      size={40}
                      imgUrl={
                        me?.userInfo?.imageSrc
                          ? me?.userInfo?.imageSrc
                          : gravatar.url(me?.userInfo?.email, {
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
