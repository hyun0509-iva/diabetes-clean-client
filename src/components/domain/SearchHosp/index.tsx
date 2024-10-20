import { useCallback, useEffect, useState } from "react";
import { HospContents, LeftHospList, SearchHospWarp } from "./styles";
import { useKakaoLoader } from "react-kakao-maps-sdk";
import axios from "axios";
import HospitalForm from "./HospitalForm";
import HospitalList from "./HospitalList";
import { API_PATH } from "constants/api_path";
import { KakaoMap } from "./KakaoMap";
import Exampl from "./Exampl";

const { HOSP_END_POINT_API } = API_PATH;

const SearchHosp = () => {
  const [data, setData] = useState([]);
  const [LoadingData, setLoadingData] = useState(false);

  const [loading, error] = useKakaoLoader({
    appkey: (process.env.REACT_APP_KAKAO_APP_KEY as string) || "",
    libraries: ["services", "clusterer"]
  });
  const d = "상세정보";

  const ps = new kakao.maps.services.Places();
  console.log({ ps });

  const fetch = useCallback(() => {
    // 병원 조회
    axios
      .get(
        `${HOSP_END_POINT_API}/getHospBasisList?ServiceKey=${process.env.REACT_APP_SERVICE_KEY}&dgsbjtCd=01&sgguCd=310303&numOfRows=15`
      )
      .then(({ data }) => {
        setLoadingData(true);
        if (data.response.body.items) {
          setData(data.response.body.items.item);
          setLoadingData(false);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  if (error) {
    <div>지도를 불러오는데 에러가 났습니다.</div>;
  }
  if (loading) return <div>불러오는중...</div>;
  // if (LoadingData) return <div>불러오는중...</div>;
  return (
    <SearchHospWarp>
      <LeftHospList>
        <HospitalForm />
        <HospitalList data={data} />
      </LeftHospList>
      <HospContents>
        <div className="hosp_map">
          <KakaoMap data={""} />
          {/* <Exampl /> */}
        </div>
        <div className="hosp_cnt">
          <ul className="hosp_cnt_menu">
            <li>상세정보</li>
            <li>리뷰</li>
          </ul>
          <div className="hosp_cnt_inner">
            {d === "상세정보" ? <div>상세정보 내용</div> : <div>리뷰</div>}
          </div>
        </div>
      </HospContents>
    </SearchHospWarp>
  );
};

export default SearchHosp;
