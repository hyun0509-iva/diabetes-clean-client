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
    padding: 50px 0;
    width: 100%;
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
      margin-top: 50px;

      .feature_list {
        display: flex;
        gap: 15px;

        .item {
          width: 500px;
          height: 500px;
          box-shadow: 5px 6px 15px rgba(3, 3, 3, 0.4);
        }
        .item:nth-of-type(even) {
          transform: translateY(-20px);
        }
      }
    }
  }

  /* popularStory 영역 */
  section.popular_story {
    padding: 50px 0;
    width: 100%;
    background-color: #fff;

    .title {
      h2 {
        font-size: 20px;
        span {
          color: #70290d;
        }
      }
    }
    .conents {
      margin-top: 25px;

      .popular_story_list {
        display: flex;
        gap: 30px;

        .item {
          min-width: 350px;
          width: 33.3%;
          display: flex;
          flex-direction: column;
          box-shadow: 5px 6px 15px rgba(3, 3, 3, 0.4);
        }
        .img_wrap {
          width: 100%;
          height: 300px;

          img {
            width: 100%;
            height: 100%;
          }
        }
        .content_wrap {
          margin: 10px 0;
          padding: 10px 15px 30px;
          height: 150px;
          .text {
            height: 75%;
            padding: 10px 15px;
            font-size: 18px;
            text-align: center;
          }
          .more_btn {
            display: flex;
            justify-content: center;
            align-items: center;
            /* height: 35%; */

            button {
              width: 150px;
              height: 40px;
              display: flex;
              justify-content: center;
              align-items: center;
              border-radius: 20px;
              color: #fff;
              background-color: #454749;
            }
          }
        }
      }
    }
  }

  /* BannerBottomSec 영역 */
  section.banner_bottom {
    overflow: hidden;
    width: 100%;
    height: 500px;
    background-color: #f1f3f5;

    .bottom_wrap {
      padding: 80px;
      position: relative;

      .contents {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 50px;
        padding-top: 50px;

        .text {
          p {
            font-size: 22px;
            font-weight: 800;
            text-align: center;
          }
        }
        .more_btn {
          display: flex;
          justify-content: center;
          align-items: center;

          button {
            width: 150px;
            height: 45px;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 20px;
            color: #fff;
            background-color: #70290d;
          }
        }
      }
      .img_wrap {
        position: absolute;
        transform: rotate(36deg);
        top: 81px;
        right: -18px;
        width: 350px;
        height: 500px;

        img {
          width: 100%;
          height: 100%;
          box-shadow: 0px 0px 10px 4px rgb(0 0 0 /11%);
        }
      }
    }
  }
`;
