const BannerTextSec = () => {
  return (
    <>
      <section className="banner_text">
        <div className="main_container">
          <div className="inner">
            <div className="banner_text_top">
              <h2 className="banner_txt">건강을 위한 관리, 함께하는 행복.</h2>
              <h3 className="banner_sub_txt">
                <span>당클린</span>이 함께하겠습니다.
              </h3>
            </div>
            <div className="banner_text_bottom">
              <div className="hr">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
              </div>
              <div className="context_container">
                <div className="context">
                  <h4>당수치 관리</h4>
                  <p>매일 당수치를 기록해서 당관리를 꾸준히 합니다.</p>
                </div>
                <div className="context">
                  <h4>노하우 공유</h4>
                  <p>
                    혼자면 힘드니까 당뇨 관리에 대해 고민하며 같이 관리하는
                    노하우를 공유합니다.
                  </p>
                </div>
                <div className="context">
                  <h4>당수치 분석</h4>
                  <p>
                    하루, 주간의 기간별로 당수치 분석을 통해 현재 내 상황을
                    체크합니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BannerTextSec;
