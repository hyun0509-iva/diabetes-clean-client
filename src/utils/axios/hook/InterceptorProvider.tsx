import axios, { AxiosError, AxiosResponse } from "axios";
import useStorage from "utils/functions/useStorage";
import alertHandler from "utils/functions/alertHandler";
import { refleshToken } from "utils/apis/authApis";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "utils/axios";
import userState from "store/userState";
const { setStorage, removeStorage, getStorage } = useStorage;

const Interceptors = () => {
  const [isRefreshToken, setIsRefreshToken] = useState(false); //토큰 재발급 상태
  const navigate = useNavigate();
  const { removeIsAuth } = userState();

  useEffect(() => {
    const requestInterceptors = api.interceptors.request.use(
      async (config) => {
        const token = getStorage("accessToken");
        console.log({ token });
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
        console.log("응답 전역");
        console.log(error.response?.status);
        if (
          error.response &&
          error.response?.status >= 400 &&
          error.response?.status < 500
        ) {
          // 400번대 error 에러 처리
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
      console.log({ data, status });

      if (status === 401 && !isRefreshToken) {
        setIsRefreshToken(true);

        if (data.errorMsg === "Invalid token") {
          alertHandler.onToast({
            msg: "로그인을 해주세요!",
            icon: "info"
          });
        } else if (data.errorMsg === "Expired token") {
          console.log("토큰이 만료");
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
            // reflesh token이 유효하다면 accessToken 갱신
            setIsRefreshToken(false);
            setStorage("accessToken", data.accessToken);
            config.headers["Authorization"] = data.accessToke;
            return axios(config);
          }
        }
      }
    };

    return () => {
      api.interceptors.response.eject(requestInterceptors);
      api.interceptors.response.eject(responseInterceptor);
    };
  }, [isRefreshToken, navigate, removeIsAuth]);

  return <></>;
};

export default Interceptors;
