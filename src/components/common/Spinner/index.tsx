import React from "react";
import { SpinnerWrap } from "./styles";

const Spinner = () => {
  return (
    <SpinnerWrap className="loading_frame">
      <span className="boll"></span>
      <span className="boll"></span>
      <span className="boll"></span>
    </SpinnerWrap>
  );
};

export default Spinner;
