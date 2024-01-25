import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

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
    margin: 130px auto;
    width: 80%;
  }

  /* banner-video 영역 */
  section.banner-video {
    width: 100%;
    height: 100%;

    .video-wrap {
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

  /* introl_text 영역 */
  section.banner-text {
    width: 100%;
    background-color: #f1f3f5;

    .inner {
      padding: 25px 0;
      display: flex;
      gap: 15px;

      .left-side {
        flex: 1;

        .img_wrap {
          margin-top: -20px;
          width: 370px;
          position: relative;
          left: 0;
          top: 0;
        }

        .img_wrap img {
          width: 100%;
        }
        .img_wrap .inner_text {
          position: absolute;
          left: 154px;
          top: 80px;

          span {
            font-size: 30px;
          }
        }
      }

      .main_text {
        flex: 2;
        text-align: center;

        .title .up_text {
          padding-left: 3px;
          font-size: 16px;
        }

        .title h2 {
          font-size: 32px;
          font-weight: 800;
        }

        .contents {
          margin-top: 45px;
        }

        .contents p {
          line-height: 1.6;
          font-size: 25px;
        }
        .contents p:nth-of-type(3) {
          margin-top: 40px;
        }
      }
    }
  }

  section.knowledge {
    .inner {
      width: 65%;
      margin: auto;

      .title {
        border-left-color: pink;
        font-size: 24px;
        padding: 0 20px;

        & span {
          position: relative;
        }
        & span::before {
          position: absolute;
          background-color: #d9480f;
          top: 3px;
          left: -10px;
          content: "";
          width: 3px;
          height: 18px;
        }
      }
      .knowledge-contents {
        padding: 15px 8px;
        display: flex;
        flex-direction: column;
        gap: 15px;
        transition: height 0.3s ease-in-out;
        .content-item {
          overflow: hidden;
          box-shadow: 0px 0px 12px -3px rgb(0 0 0 / 20%);
        }
        .contents_title {
          padding: 20px 15px;
          cursor: pointer;
        }
        .contents_desc {
          & p {
            padding: 0px 15px;
            height: 0;
            transition: all 0.3s ease-in-out;
          }
        }
        .contents_desc.on {
          & p {
            padding: 20px 15px;
            display: block;
            height: auto;
          }
        }
      }
    }
  }
  section.banner-md {
    width: 100%;
    height: 300px;
    background-color: #f1f3f5;
  }

  section.app-explanation {
    width: 100%;
    height: 300px;
    background-color: #f1f3f5;
  }

  section.last-banner {
    width: 100%;
    height: 300px;
    background-color: #f1f3f5;
  }
`;
