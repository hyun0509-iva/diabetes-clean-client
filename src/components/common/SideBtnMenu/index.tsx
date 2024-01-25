import { useState, useCallback, useRef } from "react";
import { MdAdd } from "react-icons/md";
import SubMenu from "components/common/SubMenu";
import { MenuItemType } from "typings/menuItem";
import { SubMenuBtn, SubMenuBtnContainer } from "./styles";

interface IProps {
  menuItem: MenuItemType[];
}

const SideBtnMenu = ({ menuItem }: IProps) => {
  const [showUserSubMenu, setShowUserSubMenu] = useState(false);
  const MenuRef = useRef<HTMLDivElement | null>(null);

  const onShowSubMenu = useCallback(() => {
    setShowUserSubMenu(!showUserSubMenu);
  }, [showUserSubMenu]);

  const onCloseMenu = useCallback(() => {
    setShowUserSubMenu(false);
  }, []);

  return (
    <SubMenuBtnContainer ref={MenuRef}>
      <SubMenuBtn
        onClick={onShowSubMenu}
        onMouseDown={(e) => e.stopPropagation()}
        open={showUserSubMenu}
      >
        <MdAdd />
      </SubMenuBtn>

      {showUserSubMenu && (
        <SubMenu
          menuItem={menuItem}
          showSubMenu={showUserSubMenu}
          onCloseMenu={onCloseMenu}
          customCss={{ posX: "55px", posY: "-50px", width: "90px" }}
        />
      )}
    </SubMenuBtnContainer>
  );
};

export default SideBtnMenu;
