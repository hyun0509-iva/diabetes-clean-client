import { useState, useEffect, useCallback, useLayoutEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { useInView } from "react-intersection-observer";
import Sidebar from "components/common/Sidebar";
import SearchBar from "components/common/SearchBar";
// import { useSetRecoilState } from "recoil";
import headerViewState from "store/headerViewState";
import UserMenu from "./components/UserMenu";
import { Navbar, OverWrap } from "./styles";

const Topbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { setIsViewHeader } = headerViewState();
  const [targetPath, setTargetPath] = useState(false);
  const [ref, isView] = useInView({
    threshold: 0.5
  });
  const location = useLocation();

  useLayoutEffect(() => {
    setTargetPath(
      location.pathname === "/story" || location.pathname === "/search"
    );
  }, [location.pathname]);

  useEffect(() => {
    setIsViewHeader(isView);
  }, [isView, setIsViewHeader]);

  const showSidebar = useCallback(() => setIsOpen(true), []);
  const showCloseSidebar = useCallback(() => setIsOpen(false), []);
  return (
    <>
      <Navbar className="navbar" ref={ref}>
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
