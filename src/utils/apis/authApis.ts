import axios from "axios";
import { API_PATH } from "constants/api_path";
import { CommonResponse, IAuthResponse, IUserResponse } from "models/data";
import api, { ResponseErrorType } from "utils/axios/";
import useStorage from "utils/functions/useStorage";
import alertHandler from "utils/functions/alertHandler";
const { AUTH, LOG_IN, CHECK_MEAIL, REFLESH } = API_PATH;

// 로그인
const logInApi = async <T>(insertData: T) => {
  try {
    const { data } = await api.post<IAuthResponse>(LOG_IN, insertData);
    return data;
  } catch (error: unknown) {
    if (axios.isAxiosError<ResponseErrorType>(error)) {
      if (error.response?.status === 500) {
        alertHandler.onToast({
          msg: "서버 오류! 잠시후 다시 시작해주세요.",
          icon: "error"
        });
      }
    }
    throw error;
  }
};

// 이메일 중복
const checkemailApi = async <T>(insertData: T) => {
  try {
    const { data } = await api.post<CommonResponse>(`${CHECK_MEAIL}`, {
      email: insertData
    });
    return data;
  } catch (error: unknown) {
    if (axios.isAxiosError<ResponseErrorType>(error)) {
      if (error.response?.status === 500) {
        alertHandler.onToast({
          msg: "서버 오류! 잠시후 다시 시작해주세요.",
          icon: "error"
        });
      }
    }
    throw error;
  }
};

// 회원 인증 상태
const getUserIdByToken = async () => {
  const { removeStorage, setStorage } = useStorage;
  try {
    const { data } = await api.get<IUserResponse>(`${AUTH}`);
    return data;
  } catch (error: unknown) {
    if (axios.isAxiosError<ResponseErrorType>(error)) {
      console.error("데이터를 불러오는데 실패");
      // if (error.response?.status !== 500) {
      //   if (error.response?.status === 401) {
      //     console.log("autApi 401error");
      //     setStorage("userState", JSON.stringify({ state: null }));
      //     removeStorage("accessToken");
      //     throw new Error("인증이 필요합니다.");
      //   } else if (error.response?.status === 404) {
      //     console.error("요청한 api이 존재하지 않음");
      //     throw new Error("요청한 api이 존재하지 않음");
      //   } else {
      //     alertHandler.onToast({
      //       msg: "데이터를 처리하는데 실패했습니다. 401이외 에러들...",
      //       icon: "error"
      //     });
      //     console.log(error.response);
      //     throw new Error("데이터를 처리하는데 실패했습니다.");
      //   }
      // } else {
      //   console.log("인증 상태 - 서버 에러임");
      //   return alertHandler.onToast({
      //     msg: "서버 오류! 잠시후 다시 시작해주세요.",
      //     icon: "error"
      //   });
      // }
    }
    throw error;
  }
};

/* 토큰 갱신(재발행) */
const refleshToken = async () => {
  // try {
  const { data } = await api.post(REFLESH);
  return data;
  // } catch (error: unknown) {
  //   if (axios.isAxiosError<ResponseErrorType>(error)) {
  //     if (error.response?.status === 500) {
  //       alertHandler.onToast({
  //         msg: "서버 오류! 잠시후 다시 시작해주세요.",
  //         icon: "error"
  //       });
  //     }
  //   }
  //   throw error;
  // }
};

export { logInApi, checkemailApi, getUserIdByToken, refleshToken };
