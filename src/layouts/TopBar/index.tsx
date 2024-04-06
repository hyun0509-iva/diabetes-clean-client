import {
  useState,
  useEffect,
  useCallback,
  useLayoutEffect,
  useRef
} from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import Sidebar from "components/common/Sidebar";
import SearchBar from "components/common/SearchBar";
import headerViewState from "store/headerState";
import UserMenu from "./components/UserMenu";
import { Navbar, OverWrap, TopHeader } from "./styles";
import userState from "store/userState";

const Topbar = () => {
  const { isAuth } = userState();
  const [headerHeight, setHeaderHeight] = useState<null | number>(null);
  const [isOpen, setIsOpen] = useState(false);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const { isChangeHeaderHeight, setIsChangeHeaderHeight } = headerViewState();
  const [targetPath, setTargetPath] = useState(false);
  const location = useLocation();

  const onHeaderScroll = useCallback(() => {
    if (headerHeight && window.scrollY > headerHeight) {
      setIsChangeHeaderHeight(true);
    } else {
      setIsChangeHeaderHeight(false);
    }
  }, [headerHeight, setIsChangeHeaderHeight]);

  useEffect(() => {
    window.addEventListener("scroll", onHeaderScroll);

    return () => {
      window.removeEventListener("scroll", onHeaderScroll);
    };
  }, [onHeaderScroll, setIsChangeHeaderHeight]);

  useEffect(() => {
    const $body = document.body;
    // 모달 활성시 스크롤 방지
    $body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.getBoundingClientRect().height);
    }
  }, []);

  useLayoutEffect(() => {
    setTargetPath(
      location.pathname === "/story" || location.pathname === "/search"
    );
  }, [location.pathname]);

  const showSidebar = useCallback(() => setIsOpen(true), []);
  const showCloseSidebar = useCallback(() => setIsOpen(false), []);
  return (
    <TopHeader
      isOpen={isOpen}
      isChangeHeaderHeight={isChangeHeaderHeight}
      ref={headerRef}
    >
      <Navbar className="navbar" isAuth={isAuth as boolean}>
        <div className="menu-left">
          <div>
            <button className="menu-bars">
              <span onClick={showSidebar}>
                <FaBars />
              </span>
            </button>
          </div>
          <div className="logo">
            <Link to="/">
              <img width={100} src="/images/logo.png" alt="logo-img" />
            </Link>
          </div>
        </div>
        <div className="search-center">{targetPath && <SearchBar />}</div>
        <div className="menu-right">
          <UserMenu />
        </div>
      </Navbar>
      {isOpen && <OverWrap onClick={showCloseSidebar}></OverWrap>}
      <Sidebar isOpen={isOpen} showCloseSidebar={showCloseSidebar} />
    </TopHeader>
  );
};

export default Topbar;
