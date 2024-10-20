import React, { useEffect, useState } from "react";

export interface IPosType {
  center: { lat: number; lng: number };
  errMsg: string | null;
  isLoading: boolean;
}
const useGeolocation = () => {
  const [userPos, setUserPos] = useState<IPosType>({
    center: {
      // 초기 중심좌표
      lat: 33.450701,
      lng: 126.570667
    },
    errMsg: null,
    isLoading: true
  });
  useEffect(() => {
    if (navigator.geolocation) {
      // 현재 사용자 위치 받아오기 (geolocation)
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserPos((prev) => ({
            ...prev,
            center: {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            },
            isLoading: false
          }));
        },
        (err) => {
          setUserPos((prev) => ({
            ...prev,
            errMsg: err.message,
            isLoading: false
          }));
        }
      );
    } else {
      setUserPos((prev) => ({
        ...prev,
        errMsg: "geolocation을 사용할수 없어요..",
        isLoading: false
      }));
    }
  }, []);
  return [userPos];
};

export default useGeolocation;
