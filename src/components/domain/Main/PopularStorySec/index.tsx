import Button from "components/common/Button";

const PopularStorySec = () => {
  return (
    <section className="popular_story">
      <div className="main_container">
        <div className="inner">
          <div className="title">
            <h2>인기 스토리</h2>
          </div>
          <div className="conents">
            <div className="popular_story_list">
              <div className="item">
                <div className="img_wrap">
                  <img
                    src="/images/fishing-boat-6273132_960_720.jpg"
                    alt=""
                    width={"100%"}
                  />
                </div>
                <div className="content_wrap">
                  <div className="text">텍스트 텍스트 텍스트 텍스트</div>
                  <div className="more_btn">
                    <Button context={"자세히보기"} />
                  </div>
                </div>
              </div>
              <div className="item">
                <div className="img_wrap">
                  <img
                    src="/images/fishing-boat-6273132_960_720.jpg"
                    alt=""
                    width={"100%"}
                  />
                </div>
                <div className="content_wrap">
                  <div className="text">텍스트 텍스트 텍스트 텍스트</div>
                  <div className="more_btn">
                    <Button context={"자세히보기"} />
                  </div>
                </div>
              </div>
              <div className="item">
                <div className="img_wrap">
                  <img
                    src="/images/fishing-boat-6273132_960_720.jpg"
                    alt=""
                    width={"100%"}
                  />
                </div>
                <div className="content_wrap">
                  <div className="text">텍스트 텍스트 텍스트 텍스트</div>
                  <div className="more_btn">
                    <Button context={"자세히보기"} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default PopularStorySec;
