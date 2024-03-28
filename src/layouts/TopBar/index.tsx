import { useState, useEffect, useCallback, useLayoutEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import Sidebar from "components/common/Sidebar";
import SearchBar from "components/common/SearchBar";
import headerViewState from "store/headerState";
import UserMenu from "./components/UserMenu";
import { Navbar, OverWrap } from "./styles";
import userState from "store/userState";

const Topbar = ({ headerHeight }: { headerHeight: number }) => {
  const { isAuth } = userState();
  const [isOpen, setIsOpen] = useState(false);
  const { setIsChangeHeaderHeight } = headerViewState();
  const [targetPath, setTargetPath] = useState(false);
  const location = useLocation();

  const onHeaderScroll = useCallback(() => {
    if (window.scrollY > headerHeight) {
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

  useLayoutEffect(() => {
    setTargetPath(
      location.pathname === "/story" || location.pathname === "/search"
    );
  }, [location.pathname]);

  const showSidebar = useCallback(() => setIsOpen(true), []);
  const showCloseSidebar = useCallback(() => setIsOpen(false), []);
  return (
    <>
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
    </>
  );
};

export default Topbar;
