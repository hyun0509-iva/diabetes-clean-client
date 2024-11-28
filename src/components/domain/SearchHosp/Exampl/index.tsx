import { useCallback, useEffect, useState } from "react";
import {
  CustomOverlayMap,
  Map,
  MapMarker,
  MarkerClusterer
} from "react-kakao-maps-sdk";

const { kakao } = window;

export interface IPosType {
  center: { lat: number; lng: number };
  errMsg: string | null;
  isLoading: boolean;
}

const dsearch = {
  address_name: "경기 부천시 원미구 중동 1122",
  category_group_code: "HP8",
  category_group_name: "병원",
  category_name: "의료,건강 > 병원 > 내과",
  distance: "393",
  id: "1598040675",
  phone: "032-228-2700",
  place_name: "본디안내과의원",
  place_url: "http://place.map.kakao.com/1598040675",
  road_address_name: "경기 부천시 원미구 부흥로303번길 8",
  x: "126.776554184034",
  y: "37.4950987368486"
};

// 공공데이터에서 받아온건 상세 정보를 보여주는 용으로(아래 데이터를 가공해서 디비에 저장하기)
const publicDataType = {
  XPos: 126.7629626,
  YPos: 37.4986998,
  addr: "경기도 부천시 원미구 조마루로 170, (중동)",
  clCd: "01",
  clCdNm: "상급종합",
  cmdcGdrCnt: 0,
  cmdcIntnCnt: 0,
  cmdcResdntCnt: 0,
  cmdcSdrCnt: 0,
  detyGdrCnt: 1,
  detyIntnCnt: 0,
  detyResdntCnt: 0,
  detySdrCnt: 6,
  drTotCnt: 236,
  emdongNm: "중동",
  estbDd: 20010129,
  hospUrl: "www.schmc.ac.kr/bucheon/kor/index.do",
  mdeptGdrCnt: 0,
  mdeptIntnCnt: 0,
  mdeptResdntCnt: 1,
  mdeptSdrCnt: 228,
  pnursCnt: 0,
  postNo: 14584,
  sgguCd: 310303,
  sgguCdNm: "부천원미구",
  sidoCd: 310000,
  sidoCdNm: "경기",
  telno: "032-621-5114",
  yadmNm: "순천향대학교부속부천병원",
  ykiho: "JDQ4MTYyMiM1MSMkMSMkMCMkODkkMzgxMzUxIzExIyQxIyQzIyQ5MiQzN"
};

const dd = [publicDataType].map((item: any) => ({
  address_name: item.addr,
  category_group_code: "HP8",
  category_group_name: "병원",
  category_name: "의료,건강 > 병원 > 내과",
  // distance: "",
  phone: item.telno,
  place_name: item.yadmNm,
  place_url: item.hospUrl,
  road_address_name: item.addr,
  x: item.XPos, //lng x
  y: item.YPos //y
}));

console.log({ dd });

const Exampl = ({ data }: any) => {
  const [search, setSearch] = useState<Array<any>>([]);

  //공공데이터 가공
  const list = data.map((item: any, idx: number) => ({
    id: idx,
    address_name: item.addr,
    category_group_code: "HP8",
    category_group_name: "병원",
    category_name: "의료,건강 > 병원 > 내과",
    // distance: "",
    phone: item.telno,
    place_name: item.yadmNm,
    place_url: item.hospUrl,
    road_address_name: item.addr,
    x: item.XPos, //lng x
    y: item.YPos //y
  }));

  console.log({ list });

  // 기본 위치 상태
  const [state, setState] = useState<IPosType>({
    center: {
      lat: 33.450701,
      lng: 126.570667
    },
    errMsg: null,
    isLoading: true
  });

  // 카테고리 검색으로 주변 위치 검색하기
  const searchPlaces = useCallback(
    (keyword: any) => {
      // 현재 위치가 없을 경우 함수 종료
      if (!state.center) return;
      // places 서비스 객체 생성
      const ps = new kakao.maps.services.Places();

      // 검색 옵션 설정
      const options = {
        location: new kakao.maps.LatLng(state.center.lat, state.center.lng),
        radius: 5000,
        sort: kakao.maps.services.SortBy.DISTANCE
      };

      // Places 서비스의 keywordSearch 메소드 호출
      ps.keywordSearch(
        keyword,
        (data, status, _pagination) => {
          if (status === kakao.maps.services.Status.OK) {
            setSearch(data); // 검색 결과를 search 상태에 저장
          } else {
            console.error("검색에 실패하였습니다.");
          }
        },
        options // 검색 옵션 전달
      );
    },
    [state.center]
  );
  // 현재 사용자 위치 받아오기 (geolocation)
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setState((prev) => ({
            ...prev,
            center: {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            },
            isLoading: false
          }));
        },
        (err) => {
          setState((prev) => ({
            ...prev,
            errMsg: err.message,
            isLoading: false
          }));
        }
      );
    } else {
      setState((prev) => ({
        ...prev,
        errMsg: "geolocation을 사용할수 없어요..",
        isLoading: false
      }));
    }
  }, []);

  useEffect(() => {
    searchPlaces("내과");
  }, [searchPlaces]);
  console.log({ search });
  return (
    <>
      {/* 지도 컴포넌트 */}
      <Map
        center={state.center}
        style={{
          width: "100%",
          height: "calc(100vh - 109px)",
          marginTop: "48px"
        }}
        level={3}
      >
        {/* 현재 위치 마커 표시 */}
        <MapMarker
          // position={state.center}
          position={{ lng: dd[0].x, lat: dd[0].y }}
          image={{
            src: "https://cdn-icons-png.flaticon.com/128/7124/7124723.png",
            size: {
              width: 50,
              height: 50
            }
          }}
        />
        {/* 검색된 장소 마커 표시 */}
        <MarkerClusterer
          averageCenter={true}
          minLevel={8}
          styles={[
            {
              width: "50px",
              height: "50px",
              background: "#41cae2cc",
              textAlign: "center",
              fontWeight: "bold",
              lineHeight: "50px",
              fontSize: "18px",
              borderRadius: "50%"
            }
          ]}
        >
          {/* {search.map((data) => ( */}
          {list.map((data: any) => (
            <div key={data.id}>
              {/* <MapMarker position={{ lat: data.y, lng: data.x }} /> */}
              <CustomOverlayMap
                position={{ lat: data.y, lng: data.x }}
                yAnchor={1}
              >
                <div
                  className="customoverlay"
                  style={{
                    position: "relative",
                    background: "#fff",
                    boxShadow: "0px 1px 2px #888",
                    border: "2px solid #36c7d5",
                    borderRadius: "50px"
                  }}
                >
                  <span
                    className="title"
                    style={{
                      width: "100%",
                      display: "block",
                      textAlign: "center",
                      background: "#fff",
                      borderRadius: "50px",
                      marginRight: "35px",
                      padding: "10px 15px",
                      fontSize: "14px",
                      fontWeight: "bold"
                    }}
                  >
                    {data.place_name}
                  </span>
                  <span
                    style={{
                      position: "absolute",
                      marginLeft: "-12px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      bottom: "-12px",
                      width: "22px",
                      height: "12px",
                      borderTop: "9px solid #36c7d5",
                      borderLeft: "9px solid transparent",
                      borderRight: "10px solid transparent",
                      borderBottom: "0px solid transparent"
                    }}
                  ></span>
                </div>
              </CustomOverlayMap>
            </div>
          ))}
        </MarkerClusterer>
      </Map>
    </>
  );
};

export default Exampl;
