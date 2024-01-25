import { Link } from "react-router-dom";
import { SubMenuItem, SubMenuList } from "./styles";
import Menu, { CustomCss } from "components/common/Menu";

export interface MenuItemType {
  id: number;
  path: string | null;
  label: string | React.ReactNode;
  handler?: any;
}

interface Props {
  customCss?: CustomCss;
  showSubMenu: boolean;
  onCloseMenu: () => void;
  menuItem: MenuItemType[];
}

const SubMenu = ({ menuItem, showSubMenu, onCloseMenu, customCss }: Props) => {
  return (
    <Menu
      showMenu={showSubMenu}
      onCloseMenu={onCloseMenu}
      customCss={customCss}
    >
      <SubMenuList width="110px">
        {menuItem?.map((menu) =>
          menu.path ? (
            <SubMenuItem
              key={menu.id}
              className="menu-list"
              onClick={onCloseMenu}
            >
              <Link onClick={onCloseMenu} to={menu.path}>
                {menu.label}
              </Link>
            </SubMenuItem>
          ) : (
            <SubMenuItem
              key={menu.id}
              className="menu-list"
              onClick={menu.handler}
            >
              {typeof menu.label === "string" ? (
                <button onClick={onCloseMenu}>{menu.label}</button>
              ) : (
                <>{menu.label}</>
              )}
            </SubMenuItem>
          )
        )}
      </SubMenuList>
    </Menu>
  );
};

export default SubMenu;
