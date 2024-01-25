import React from "react";
import { Link } from "react-router-dom";
import { MenuItemType } from "types/menuItem";
import { NavContents } from "layouts/TopBar/styles";

interface IProps {
  menuItemData: MenuItemType[];
  showCloseSidebar: () => void;
}

const LinkMenuItem = ({ menuItemData, showCloseSidebar }: IProps) => {
  return (
    <>
      {menuItemData?.map((item, index) => (
        <NavContents key={index} className={item?.label as string}>
          <Link to={item.path as string} onClick={showCloseSidebar}>
            <span>{item.label}</span>
          </Link>
        </NavContents>
      ))}
    </>
  );
};

export default React.memo(LinkMenuItem);
