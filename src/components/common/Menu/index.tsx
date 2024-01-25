import React, { FC, useEffect, useRef } from "react";
import { SubMenuContainer, SubMenuWrap } from "./styles";

export interface CustomCss {
  width?: string;
  height?: string;
  posX?: string;
  posY?: string;
}

interface Props {
  children: React.ReactNode;
  customCss?: CustomCss;
  showMenu: boolean;
  onCloseMenu: () => void;
}

const Menu: FC<Props> = ({ children, showMenu, onCloseMenu, customCss }) => {
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onClickOutSide = (e: globalThis.MouseEvent) => {
      if (showMenu && !menuRef.current?.contains(e.target as HTMLElement)) {
        onCloseMenu();
      }
    };
    document.addEventListener("mousedown", onClickOutSide);
    return () => {
      document.removeEventListener("mousedown", onClickOutSide);
    };
  }, [onCloseMenu, showMenu]);

  if (!showMenu) return null;

  return (
    <>
      <SubMenuWrap
        width={customCss?.width}
        posX={customCss?.posX}
        posY={customCss?.posY}
        ref={menuRef}
      >
        <SubMenuContainer>{children}</SubMenuContainer>
      </SubMenuWrap>
    </>
  );
};

export default React.memo(Menu);
