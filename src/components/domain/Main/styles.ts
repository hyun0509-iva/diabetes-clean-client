import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { palette } from "libs/palette";

const TextAni = keyframes`
  0% {
    transform: translateX(50%);
  }
  100% {
    transform: translateX(0);
  }
`;
export const MainContainer = styled.div`
  .main_container {
    //메인 화면 공통 스타일
    padding: 30px 0;
    width: 80%;
    margin: auto;

    .inner {
      padding-top: 20px;
    }
  }

  /* video 영역 */
  section.banner_video {
    width: 100%;
    height: 100%;

    .video_wrap {
      position: relative;
      left: 0;
      top: 0;
      width: 100%;
      height: calc(100vh - 69px);
      opacity: 0.8;
      overflow: hidden;
      .video {
        width: 100%;
        height: 100%;
        object-fit: fill;
      }
    }
    .text {
      position: absolute;
      top: 50%;
      right: 20%;

      div {
        font-size: 3em;
        color: #fff;
        animation-name: ${TextAni};
        &.text_a {
          animation-duration: 1s;
        }
        &.text_b {
          animation-duration: 1.8s;
        }
      }
    }
  }

  /* Banner-text 영역 */
  section.banner_text {
    width: 100%;
    background-color: #fff;
    height: 500px;

    .inner {
      padding-top: 50px;
    }

    .banner_text_top {
      text-align: center;
      h2.banner_txt {
        font-size: 32px;
      }
      h3.banner_sub_txt {
        margin-top: 30px;
        font-size: 24px;

        span {
          color: #70290d;
        }
      }
    }

    .banner_text_bottom {
      width: 650px;
      margin: 100px auto;

      .hr {
        position: relative;
        border-top: 1px solid ${palette.gray[2]};

        .dot {
          position: absolute;
          top: -6px;
          display: inline-block;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: ${palette.gray[2]};
        }
        .dot:nth-of-type(1) {
          left: 0%;
        }
        .dot:nth-of-type(2) {
          left: 50%;
        }
        .dot:nth-of-type(3) {
          right: 0;
        }
      }
      .context_container {
        margin-top: 30px;
        position: relative;
        h4 {
          font-size: 18px;
          font-weight: 800;
          text-align: center;
          margin-bottom: 15px;
        }
        .context {
          position: absolute;
          top: 0;
          font-weight: 600;
        }
        .context:nth-of-type(1) {
          left: 0;
          transform: translateX(-50%);
          width: 175px;
        }
        .context:nth-of-type(2) {
          left: 50%;
          transform: translateX(-50%);
          width: 195px;
        }
        .context:nth-of-type(3) {
          right: 0;
          transform: translateX(50%);
          width: 196px;
        }
      }
    }
  }
  /* introduction 영역 */
  section.introduction {
    width: 100%;
    height: 900px;
    background-color: #f1f3f5;

    .title {
      h2 {
        font-size: 20px;
        span {
          color: #70290d;
        }
      }
    }
    .conents {
      ul.feature_list {
        position: relative;
      }
      .item {
        position: absolute;
      }
      .item:nth-child(1) {
        top: 20px;
        left: 15%;
        width: 300px;
        height: 300px;
        background-color: #70290d;
      }
      .item:nth-child(2) {
        top: 350px;
        left: 0%;
        width: 300px;
        height: 300px;
        background-color: rebeccapurple;
      }
      .item:nth-child(3) {
        top: 0;
        left: 70%;
        width: 300px;
        height: 500px;
        background-color: gainsboro;
      }
      .item:nth-child(4) {
        top: 0;
        left: 80%;
        width: 300px;
        height: 300px;
        background-color: antiquewhite;
      }
    }
  }

  /* popularStory 영역 */
  section.popular_story {
    width: 100%;
    height: 300px;
    background-color: #fff;
  }

  /* BannerBottomSec 영역 */
  section.banner_bottom {
    width: 100%;
    height: 300px;
    background-color: #f1f3f5;
  }
`;
