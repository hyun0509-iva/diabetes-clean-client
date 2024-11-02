import { useEffect, useState } from "react";

export interface IPosType {
  center: { lat: number; lng: number } | null;
  errMsg: string | null;
  done: boolean;
}

const useGeolocation = () => {
  const [userPos, setUserPos] = useState<IPosType>({
    center: null,
    errMsg: null,
    done: false
  });

  useEffect(() => {
    if (navigator.geolocation) {
      // 현재 사용자 위치 받아오기 (geolocation)
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserPos((prev) =>
            Object.assign(prev, {
              center: {
                lat: position.coords.latitude,
                lng: position.coords.longitude
              },
              done: true
            })
          );
        },
        (err) => {
          setUserPos((prev) =>
            Object.assign(prev, {
              errMsg: err.message,
              done: true
            })
          );
        }
      );
    } else {
      setUserPos((prev) =>
        Object.assign(prev, {
          errMsg: "geolocation을 사용할수 없어요..",
          done: true
        })
      );
    }
  }, []);

  return [userPos];
};

export default useGeolocation;
