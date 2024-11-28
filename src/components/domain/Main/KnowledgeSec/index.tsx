import Accordion from "components/common/Accordion";
import React from "react";
const data = [
  {
    title: "당뇨병",
    desc: "우리 몸에 가장 중요한 에너지원이 되는 탄수화물의 대사물인 포도당이 혈액 중에 필요 이상으로 올라가서 고혈당의 상태가 되고 결국 당이 넘쳐 소변으로 배설되는 질환을 말합니다."
  },
  {
    title: "당뇨병 증상",
    desc: [
      "합병증이 발생될때까지는 대부분 증상이 전혀 없습니다.",
      "몸안에 수분이 부족해 갈증이 심하고 피로감을 잘 느낍니다.",
      "식사량이 늘었지만 몸무게는 줄어듭니다.",
      "정리하자면, 다음(多飮, 물을 많이 마심), 다뇨(多尿, 소변을 많이 봄), 다식(多食, 많이 먹음)의 증상이 있다면 당뇨의 증상이므로 병원에 방문해 검사할것을 권장합니다."
    ]
  },
  {
    title: "당뇨병의 종류",
    desc: "당뇨병은 1형 당뇨와 2형 당뇨로 나뉩니다. 우선 1형 당뇨는 췌장에 전혀 인술린이 만들지 못해 혈당 조절을 못하는 경우를 말하며, 2형 당뇨는 인슐린이 나오더라도 간과 근육에서 인슐린 기능을 다하지 못해 혈당 조절이 되지 않는 경우를 말합니다."
  },
  {
    title: "당뇨병의 진단",
    desc: [
      "세가지 중 어느 하나에 속하면 당뇨병이라고 합니다",
      "공복시 혈당치가 126mg/dl이상일 때",
      "공복시 혈당치가 126mg/dl 미만이지만 경구 당부하 검사상 2시간 혈당치와 그후 2시간 사이의 혈당치가 200mg/dl 이상일 때"
    ]
  }
];

const KnowledgeSec = () => {
  // 이부분은 삭제할지 다른 탭으로 옮길지는 나중에 결정
  return (
    <section className="knowledge">
      <div className="main_container container">
        <div className="inner">
          <div className="title">
            <span>당뇨에 관해서 알아봐요</span>
          </div>
          <div className="contents">
            <Accordion data={data} />
          </div>
          <div style={{ textAlign: "end", cursor: "pointer" }}></div>
        </div>
      </div>
    </section>
  );
};

export default KnowledgeSec;
