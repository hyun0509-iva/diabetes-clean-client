import React from "react";
import { BollSpinnerWrap } from "../styles";

const BollSpinner = () => {
  return (
    <BollSpinnerWrap className="loading_frame">
      <span className="boll"></span>
      <span className="boll"></span>
      <span className="boll"></span>
    </BollSpinnerWrap>
  );
};

export default BollSpinner;
