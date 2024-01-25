import { css } from "@emotion/react";
import { palette } from "libs/palette";

export const reset = css`
  @font-face {
    font-family: "nexongoth";
    src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_two@1.0/NanumSquareRound.woff")
      format("woff");
    font-weight: normal;
    font-style: normal;
  }

  * {
    font-family: "nexongoth";
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "nexongoth";
    line-height: 1.4;
  }
  ::-webkit-scrollbar {
    width: 13px;
  }
  ::-webkit-scrollbar-track {
    background-color: #f1f1f1;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #868e96;
    border-radius: 25px;
    background-clip: padding-box;
    border: 2px solid transparent;

    &:hover {
      background-color: #495057;
    }
  }

  html {
    font-size: 16px;
  }

  body {
    font-size: 1rem;
    color: #000;
    background-color: ${palette.gray[0]};
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  ol,
  ul,
  li {
    list-style: none;
  }

  input::-ms-clear,
  input::-ms-reveal {
    display: none;
    width: 0;
    height: 0;
  }

  //input[type=search]의 x표시 없애기
  input::-webkit-search-decoration,
  input::-webkit-search-cancel-button,
  input::-webkit-search-results-button,
  input::-webkit-search-results-decoration {
    display: none;
  }

  .swal2-container {
    font-size: 18px !important;
  }
  .swal2-top-end {
    width: fit-content !important;
    .swal2-title {
      font-size: 15px !important;
    }
  }
`;
