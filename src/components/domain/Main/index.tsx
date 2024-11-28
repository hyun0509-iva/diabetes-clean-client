import VideoSec from "./VideoSec";
import BannerTextSec from "./BannerTextSec";
import IntroductionSec from "./IntroductionSec";
import PopularStorySec from "./PopularStorySec";
import BannerBottomSec from "./BannerBottomSec";
import { MainContainer } from "./styles";

const Main = () => {
  return (
    <MainContainer>
      {/* Banner-Video Section*/}
      <VideoSec />

      {/* Banner-text Section*/}
      <BannerTextSec />

      {/* Introduction Section */}
      <IntroductionSec />

      {/* PopularStory Section */}
      <PopularStorySec />

      {/* BannerBottomSec Section */}
      <BannerBottomSec />
    </MainContainer>
  );
};

export default Main;
