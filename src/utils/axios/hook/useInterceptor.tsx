import axios, { AxiosError } from "axios";
import useStorage from "utils/functions/useStorage";
import alertHandler from "utils/functions/alertHandler";
import { refleshTokenAPI } from "utils/apis/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "utils/axios";
import userState from "store/userState";
const { setStorage, removeStorage, getStorage } = useStorage;

const useInterceptor = () => {
  const token = getStorage("accessToken");
  const [isRefreshToken, setIsRefreshToken] = useState(false); //토큰 재발급 상태
  const navigate = useNavigate();
  const { setIsAuth } = userState();

  /* axios 인스턴스 기본 설정 */
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  api.defaults.headers.post["Content-Type"] =
    "application/x-www-form-urlencoded";

  useEffect(() => {
    const requestInterceptors = api.interceptors.request.use(
      async (config) => {
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
      async (error: AxiosError) => {
        const originalRequest = error.config;
        if (
          error.response &&
          error.response?.status >= 400 &&
          error.response?.status < 500
        ) {
          // 400번대 에러 처리
          await responseErrorHandler(error.response);

          return {
            status: error.response.status,
            data: error.response.data,
            isError: true
          };
        }

        if (error.response?.status === 500) {
          alertHandler.onToast({
            msg: "서버 오류! 잠시후 다시 시작해주세요.",
            icon: "error"
          });
        }

        if (error.code === "ERR_NETWORK") {
          error.status = 500;
          alertHandler.onToast({
            msg: "서버 오류, 관리자에게 문의해주세요!",
            icon: "error"
          });
          throw error;
        }
        return Promise.reject(originalRequest);
      }
    );

    const responseErrorHandler = async (responseError: any) => {
      const { data, status, config } = responseError;
      if (status === 401 && !isRefreshToken) {
        setIsRefreshToken(true);

        if (data.errorMsg === "Invalid token") {
          console.log("로그인을 해주세요");
        } else if (data.errorMsg === "Expired token") {
          // console.log("토큰이 만료되어 재발행합니다.");
          const data = await refleshTokenAPI();

          if (data?.isExpiredRefleshToken) {
            //reflesh token이 만료되면 로컬스토리지에 저장한 accessToken 삭제
            setIsRefreshToken(false);
            removeStorage("accessToken");
            setIsAuth(false);

            alertHandler.onToast({
              msg: "인증이 만료되어 재로그인이 필요합니다.",
              icon: "warning"
            });
            return navigate("/login", { replace: true });
          } else {
            // reflesh token이 유효하다면 accessToken 갱신
            setIsRefreshToken(false);
            setStorage("accessToken", data.accessToken);
            console.log(data.accessToken);
            config.headers["Authorization"] = data.accessToken;
            return axios(config);
          }
        }
      } else if (status === 400) {
        return alertHandler.onToast({
          msg: data?.errorMsg,
          icon: "error"
        });
      }
    };

    return () => {
      api.interceptors.response.eject(requestInterceptors);
      api.interceptors.response.eject(responseInterceptor);
    };
  }, [isRefreshToken, navigate, setIsAuth, token]);

  return null;
};

export default useInterceptor;
