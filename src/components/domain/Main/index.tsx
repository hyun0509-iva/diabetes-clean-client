import { MainContainer } from "./styles";
import Accordion from "components/common/Accordion";

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

const Main = () => {
  return (
    <MainContainer>
      {/* Banner-Video */}
      <section className="banner-video">
        <div className="video-wrap">
          <video className="video" width={800} autoPlay loop muted>
            <source src="/video/banner.mp4" />
          </video>
        </div>
        <div className="text-wrap">
          <div className="text">
            <div className="text_a">건강을 지키는 삶, </div>
            <div className="text_b">&nbsp;&nbsp; 우리 모두의 내일</div>
          </div>
        </div>
      </section>
      {/* Banner-text */}
      <section className="banner-text">
        <div className="main_container">
          <div className="inner">
            <div className="left-side">
              <div className="img_wrap">
                <img src="/images/diabetes.png" alt="diabetes-img" />
                <div className="inner_text">
                  <span>120</span>
                </div>
              </div>
            </div>
            <div className="main_text">
              <div className="title">
                <div className="up_text">How to thoroughly manage diabetes</div>
                <h2>건강을 위한 관리, 함께하는 행복.</h2>
              </div>
              <div className="contents">
                <p>당뇨는 더이상 먼 얘기가 아닙니다!</p>
                <p>철저히 관리하고 서로 공유하며 건강 노하우를 챙기자구요!</p>
                <p>
                  당클린에서는 당수치 관리 및 자신의 건강 노하우를 <br />
                  공유할 수 있어요!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* knowledge */}
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
      {/* Banner-md */}
      <section className="banner-md">
        <div className="main_container">
          <div className="inner">앱의 간단한 소개(배너 텍스트용)</div>
        </div>
      </section>
      {/* App-explanation */}
      <section className="app-explanation">
        <div className="main_container">
          <div className="inner">
            앱 기능 설명 (돕다 구버전 or 닥터다이어리 디자인 참고)
          </div>
        </div>
      </section>
      {/* last-banner */}
      <section className="last-banner">
        <div className="main_container">
          <div className="inner">
            앱의 간단한 소개(배너 텍스트용, 배경 이미지 슬라이드)
          </div>
          <div>사용해보기 버튼</div>
        </div>
      </section>
    </MainContainer>
  );
};

export default Main;
