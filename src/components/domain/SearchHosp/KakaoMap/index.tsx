import { useCallback, useEffect, useState } from "react";
import {
  CustomOverlayMap,
  Map,
  MapMarker,
  MarkerClusterer
} from "react-kakao-maps-sdk";
import useGeolocation from "./hooks/useGeolocation";
//126.7695616, 37.4931456
interface ICenterPos {
  lat: number;
  lng: number;
}

interface IProps {
  data: any;
}

export const KakaoMap = ({ data }: IProps) => {
  const [userPos] = useGeolocation();
  const [searchKeyword, setSearchKeyword] = useState<Array<any>>([]);

  // 카테고리 검색으로 주변 위치 검색하기
  const searchPlaces = useCallback(
    (keyword: any) => {
      // 현재 위치가 없을 경우 함수 종료
      if (!userPos.center) return;
      // places 서비스 객체 생성
      const ps = new kakao.maps.services.Places();

      // 검색 옵션 설정
      const options = {
        location: new kakao.maps.LatLng(userPos.center.lat, userPos.center.lng),
        radius: 8000,
        sort: kakao.maps.services.SortBy.DISTANCE
      };

      // Places 서비스의 keywordSearch 메소드 호출
      console.log({ keyword });
      if (keyword) {
        ps.keywordSearch(
          keyword,
          (data, status, _pagination) => {
            console.log({ data, status, _pagination });
            if (status === kakao.maps.services.Status.OK) {
              setSearchKeyword(data); // 검색 결과를 search 상태에 저장
            } else {
              console.error("검색에 실패하였습니다.");
            }
          },
          options // 검색 옵션 전달
        );
      }
    },
    [userPos.center]
  );

  useEffect(() => {
    // searchPlaces("큰내과");
    searchPlaces("내과");
  }, [searchPlaces]);

  return userPos.done ? (
    <Map
      center={userPos.center as ICenterPos}
      style={{
        width: "100%",
        height: "calc(100vh - 109px)",
        marginTop: "48px"
      }}
      level={3}
    >
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
        {searchKeyword.map((data) => (
          <div key={data.id}>
            <MapMarker position={{ lat: data.y, lng: data.x }} />
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
  ) : (
    <div>불러오는중...</div>
  );
};
