import { useEffect, useState, Suspense, useRef } from "react";
import { Outlet } from "react-router-dom";
import { Cloudinary } from "@cloudinary/url-gen";
import { Main } from "styles/common";
import Topbar from "./TopBar";
import ScrollTop from "components/common/ScrollTop";
import GlobalModal from "components/common/GlobalModal";
import modalState from "store/modalState";
import cloudinaryState from "store/cloudinaryState";
import headerViewState from "store/headerState";
import { TopHeader } from "./TopBar/styles";

const RootLayout = () => {
  const { modal } = modalState();
  const { isChangeHeaderHeight } = headerViewState();
  const headerRef = useRef<HTMLDivElement | null>(null);
  const [headerHeight, setHeaderHeight] = useState<null | number>(null);
  const [isOpenModal, setOpenModal] = useState(false);
  const { setCid } = cloudinaryState();

  useEffect(() => {
    const cld = new Cloudinary({
      cloud: {
        cloudName: process.env.REACT_APP_CLOUDINARY_NAME
      }
    });
    setCid(cld);
  }, [setCid]);

  useEffect(() => {
    const $body = document.body;
    // 모달 활성시 스크롤 방지
    $body.style.overflow = modal?.isOpen ? "hidden" : "auto";
    setOpenModal(modal?.isOpen as boolean);
  }, [isOpenModal, modal?.isOpen]);

  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.getBoundingClientRect().height);
    }
  }, []);

  return (
    <div>
      <TopHeader isChangeHeaderHeight={isChangeHeaderHeight} ref={headerRef}>
        <Topbar headerHeight={headerHeight as number} />
      </TopHeader>
      <Suspense fallback={<div>로딩중...</div>}>
        <Main>
          <Outlet />
          <ScrollTop />
        </Main>
      </Suspense>
      {isOpenModal && <GlobalModal isOpenModal={modal?.isOpen as boolean} />}
    </div>
  );
};

export default RootLayout;
