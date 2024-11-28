import React from "react";

/** @description 디비에 \n으로 저장된 데이터를 &lt;br /&gt;로 변경해주는 컴포넌트 */
const NewLine = ({ context }: { context: string }) => {
  return (
    <>
      {context.split("\n").map((line, idx) => {
        return (
          <span key={idx}>
            {line}
            <br />
          </span>
        );
      })}
    </>
  );
};

export default NewLine;
