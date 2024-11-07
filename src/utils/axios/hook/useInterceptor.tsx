import axios, { AxiosError } from "axios";
import useStorage from "utils/functions/useStorage";
import alertHandler from "utils/functions/alertHandler";
import { refleshTokenAPI } from "utils/apis/auth";
import { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import api from "utils/axios";
import userState from "store/userState";

const { setStorage, removeStorage, getStorage } = useStorage;

const useInterceptor = () => {
  console.log("useInterceptor");
  const [isRefreshToken, setIsRefreshToken] = useState(false);
  const navigate = useNavigate();
  const { setIsAuth } = userState();
  const requestInterceptorId = useRef<number>();
  const responseInterceptorId = useRef<number>();

  const responseErrorHandler = useCallback(
    async (responseError: any) => {
      const { data, status, config } = responseError;
      console.log({ data, status, config });
      if (status === 401 && !isRefreshToken) {
        setIsRefreshToken(true);

        if (data.errorMsg === "Invalid token") {
          console.log("로그인을 해주세요");
        } else if (data.errorMsg === "Expired token") {
          const data = await refleshTokenAPI();

          if (data?.isExpiredRefleshToken) {
            setIsRefreshToken(false);
            removeStorage("accessToken");
            setIsAuth(false);

            alertHandler.onToast({
              msg: "인증이 만료되어 재로그인이 필요합니다.",
              icon: "warning"
            });
            return navigate("/login", { replace: true });
          } else {
            setIsRefreshToken(false);
            setStorage("accessToken", data.accessToken);
            config.headers["Authorization"] = data.accessToken;
            return axios(config);
          }
        }
      } else if (status === 400) {
        console.log(data);
        return alertHandler.onToast({
          // msg: data?.errorMsg,
          msg: "예기치 않는 에러",
          icon: "error"
        });
      }
    },
    [isRefreshToken, navigate, setIsAuth]
  );

  useEffect(() => {
    console.log("responseInterceptorId", responseInterceptorId);
    const token = getStorage("accessToken");
    if (!token) return;

    api.defaults.headers.post["Content-Type"] =
      "application/x-www-form-urlencoded";

    // Request Interceptor
    requestInterceptorId.current = api.interceptors.request.use(
      async (config) => {
        const currentToken = getStorage("accessToken"); // 현재 토큰을 매번 새로 가져옴
        return {
          ...config,
          headers: {
            ...config.headers,
            Authorization: `Bearer ${currentToken}`
          }
        };
      },
      async (error: any) => {
        return Promise.reject(error);
      }
    );

    // Response Interceptor
    responseInterceptorId.current = api.interceptors.response.use(
      async (config) => {
        return config;
      },
      async (error: AxiosError) => {
        const originalRequest = error.config;
        console.log({ interceptor: error });
        if (
          error.response &&
          error.response?.status >= 400 &&
          error.response?.status < 500
        ) {
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

    // Cleanup function
    return () => {
      if (requestInterceptorId.current !== undefined) {
        api.interceptors.request.eject(requestInterceptorId.current);
      }
      if (responseInterceptorId.current !== undefined) {
        api.interceptors.response.eject(responseInterceptorId.current);
      }
    };
  }, [requestInterceptorId, responseErrorHandler, responseInterceptorId]); // 의존성 배열 추가

  return null;
};

export default useInterceptor;
