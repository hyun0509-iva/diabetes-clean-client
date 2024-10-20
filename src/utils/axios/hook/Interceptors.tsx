import axios, { AxiosResponse } from "axios";
import useStorage from "utils/functions/useStorage";
import alertHandler from "utils/functions/alertHandler";
import { refleshToken } from "utils/apis/authApis";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "utils/axios";
import userState from "store/userState";
const { setStorage, removeStorage, getStorage } = useStorage;

export interface ResponseErrorType {
  code: string;
  msg: string;
  response: AxiosResponse;
  status: number;
}

const Interceptors = () => {
  const [isRefreshToken, setIsRefreshToken] = useState(false); //토큰 재발급 상태
  const navigate = useNavigate();
  const { removeIsAuth } = userState();

  useEffect(() => {
    const requestInterceptors = api.interceptors.request.use(
      async (config) => {
        const token = getStorage("accessToken");
        if (!token) {
          return {
            ...config,
            headers: {
              ...config.headers,
              Authorization: null
            }
          };
        }
        return {
          ...config,
          headers: {
            ...config.headers,
            Authorization: `Bearer ${token}`
          }
        };
      },
      async (error: any) => {
        return Promise.reject(error);
      }
    );

    const responseInterceptor = api.interceptors.response.use(
      async (config) => {
        return config;
      },
      async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !isRefreshToken) {
          setIsRefreshToken(true);
          const data = await refleshToken();
          if (data?.isExpiredRefleshToken) {
            //reflesh token이 만료되면 로컬스토리지에 저장한 accessToken 삭제
            setIsRefreshToken(false);
            removeStorage("accessToken");
            removeIsAuth();
            alertHandler.onToast({
              msg: "인증이 만료되어 재로그인이 필요합니다.",
              icon: "warning"
            });
            return navigate("/login", { replace: true });
          } else {
            setStorage("accessToken", data.accessToken);
            setIsRefreshToken(false);
            originalRequest.headers["Authorization"] = data.accessToken;
            return axios(originalRequest);
          }
        }

        // 네트워크 에러
        if (error.code === "ERR_NETWORK") {
          error.status = 500;
          alertHandler.onToast({
            msg: "서버 오류, 관리자에게 문의해주세요!",
            icon: "error"
          });
          throw error;
        }
        throw error;
      }
    );

    return () => {
      api.interceptors.response.eject(requestInterceptors);
      api.interceptors.response.eject(responseInterceptor);
    };
  }, [isRefreshToken, navigate, removeIsAuth]);

  return <></>;
};

export default Interceptors;
