import { useMemo } from "react";
import { CloseBtn, NavbarToggle, StyledNavMenu } from "./styles";
import { ROUTER_PATH } from "constants/router_path";
import LinkMenuItem from "layouts/TopBar/components/LinkMenuItem";

interface IProps {
  isOpen: boolean;
  showCloseSidebar: () => void;
}

const Sidebar = ({ isOpen, showCloseSidebar }: IProps) => {
  const { MEMO_DIABETES, STORY, MYPAGE, SEARCH_HOSPITAL, REPORT } = ROUTER_PATH;
  const userMenuItem = useMemo(
    () => [
      {
        id: 1,
        label: "기록",
        path: `${MEMO_DIABETES}`
      },
      {
        id: 2,
        label: "당수치 분석",
        path: `${REPORT}`
      },
      {
        id: 3,
        label: "스토리",
        path: `${STORY}`
      },
      {
        id: 4,
        label: "병원 찾기",
        path: `${SEARCH_HOSPITAL}`
      }
    ],
    [MEMO_DIABETES, REPORT, SEARCH_HOSPITAL, STORY]
  );

  return (
    <StyledNavMenu className={isOpen ? "nav-menu active" : "nav-menu"}>
      <ul className="nav-menu-items">
        <NavbarToggle className="navbar-toggle">
          <CloseBtn onClick={showCloseSidebar}>
            <span>&times;</span>
          </CloseBtn>
        </NavbarToggle>
        <LinkMenuItem
          menuItemData={userMenuItem}
          showCloseSidebar={showCloseSidebar}
        />
      </ul>
    </StyledNavMenu>
  );
};

export default Sidebar;
