import { ScrollTopBtn, ScrollTopWrap } from "./styles";
import { MdArrowUpward } from "react-icons/md";
import headerViewState from "store/headerViewState";

const ScrollTop = () => {
  const { isViewHeader } = headerViewState();
  const onScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <ScrollTopWrap onClick={onScrollTop} isFadeIn={!isViewHeader}>
      <ScrollTopBtn isFadeIn={!isViewHeader}>
        <MdArrowUpward size={40} />
      </ScrollTopBtn>
    </ScrollTopWrap>
  );
};

export default ScrollTop;
