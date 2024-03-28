import { ScrollTopBtn, ScrollTopWrap } from "./styles";
import { MdArrowUpward } from "react-icons/md";
import headerViewState from "store/headerState";

const ScrollTop = () => {
  const { isChangeHeaderHeight } = headerViewState();
  const onScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <ScrollTopWrap onClick={onScrollTop} isFadeIn={isChangeHeaderHeight}>
      <ScrollTopBtn isFadeIn={isChangeHeaderHeight}>
        <MdArrowUpward size={40} />
      </ScrollTopBtn>
    </ScrollTopWrap>
  );
};

export default ScrollTop;
