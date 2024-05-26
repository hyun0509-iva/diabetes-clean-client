import Button from "components/common/Button";
import React from "react";
import { useNavigate } from "react-router-dom";

const BannerBottomSec = () => {
  const navigate = useNavigate();
  return (
    <section className="banner_bottom">
      <div className="main_container">
        <div className="inner">
          <div className="bottom_wrap">
            <div className="contents">
              <div className="text">
                <p>
                  당클린과 함께
                  <br /> 건강한 일상을 챙겨보세요.
                </p>
              </div>
              <div className="btn_wrap">
                <div className="more_btn">
                  <Button
                    onClick={() => navigate("/memo/diabetes")}
                    context={"당클린 시작하기"}
                  />
                </div>
              </div>
            </div>
            <div className="img_wrap">
              <img src="/images/dang_note.png" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BannerBottomSec;
