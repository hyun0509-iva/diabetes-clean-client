import React, { useCallback, useMemo } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import SubMenu from "components/common/SubMenu";
import api from "utils/axios";
import { ROUTER_PATH } from "constants/router_path";
import { QUERY_KEY } from "constants/query_key";
import userState from "store/userState";
import useStorage from "utils/functions/useStorage";
import { API_PATH } from "constants/api_path";

interface IProps {
  showSubMenu: boolean;
  onCloseMenu: () => void;
}

const { USER_KEY } = QUERY_KEY;
const { LOG_OUT } = API_PATH;

const UserSubMenu = ({ showSubMenu, onCloseMenu }: IProps) => {
  const { MYPAGE, STORY, REPORT } = ROUTER_PATH;
  const { userInfo, removeIsAuth, removeUserInfo } = userState();
  const { removeStorage } = useStorage;
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const handleLogOut = useCallback(() => {
    api.post(LOG_OUT, { withCredentials: true }).then(() => {
      queryClient.setQueryData([USER_KEY], false);

      removeUserInfo();
      navigate("/login", { replace: true });
      removeStorage("accessToken");
      removeIsAuth();
    });
    onCloseMenu();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const menuItem = useMemo(
    () => [
      {
        id: 1,
        label: "마이페이지",
        path: `${MYPAGE}`
      },
      {
        id: 2,
        label: "당수치 분석",
        path: `${REPORT}`
      },
      {
        id: 3,
        label: "내피드",
        path: `${STORY}/${userInfo?.nickname}`
      },
      {
        id: 4,
        label: "로그아웃",
        path: null,
        handler: handleLogOut
      }
    ],
    [MYPAGE, STORY, handleLogOut, userInfo?.nickname]
  );

  return (
    <>
      {showSubMenu && (
        <SubMenu
          menuItem={menuItem}
          showSubMenu={showSubMenu}
          onCloseMenu={onCloseMenu}
          customCss={{
            posX: "135px",
            posY: "60px"
          }}
        />
      )}
    </>
  );
};

export default React.memo(UserSubMenu);
