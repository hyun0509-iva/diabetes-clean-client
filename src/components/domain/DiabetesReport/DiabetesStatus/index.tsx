import React from "react";
import { DiabetesStatusHeader, DiabetesStatusWrap } from "../style";

const DiabetesStatus = () => {
  return (
    <DiabetesStatusWrap>
      <DiabetesStatusHeader>
        <h2 className="title">예상 당화혈색소</h2>
      </DiabetesStatusHeader>
    </DiabetesStatusWrap>
  );
};

export default DiabetesStatus;
