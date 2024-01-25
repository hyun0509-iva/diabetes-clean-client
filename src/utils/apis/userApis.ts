import axios from "axios";
import api, { ResponseErrorType } from "utils/axios";
import useStorage from "utils/functions/useStorage";
import {
  CommonResponse,
  IAuthResponse,
  IUserResponse,
  TUserUpdateRequest
} from "models/data";
import { API_PATH } from "constants/api_path";
import alertHandler from "utils/functions/alertHandler";
const { AUTH, USER_API, CHECK_MEAIL, LOG_IN } = API_PATH;

// 로그인
const logInApi = async <T>(insertData: T) => {
  try {
    const { data } = await api.post<IAuthResponse>(`${LOG_IN}`, insertData);
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

// 회원 가입
const postUserApi = async <T>(insertData: T) => {
  try {
    const { data } = await api.post(`${USER_API}`, insertData);
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

// 회원 탈퇴
const deleteUserApi = async (userId: string) => {
  try {
    const { data } = await api.delete<CommonResponse>(`${USER_API}/${userId}`);
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

// 회원 정보 수정
const updateUserApi = async ({
  userId,
  userData
}: {
  userId: string;
  userData: TUserUpdateRequest;
}) => {
  try {
    const { data } = await api.patch(`${USER_API}/${userId}`, userData);
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

// 회원 상세 조회
const getUserFindById = async (userId: string) => {
  try {
    const { data } = await api.get<IUserResponse>(`${USER_API}/${userId}`);
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
      if (error.response?.status === 401) {
        setStorage("isAuth", JSON.stringify({ loginState: false }));
        console.error("인증 필요");
      } else if (error.response?.status === 403) {
        setStorage("isAuth", JSON.stringify({ loginState: false }));
        removeStorage("accessToken");
        window.location.reload();
        console.error("토큰이 유효하지 않아 로그아웃합니다.");
      } else {
        alertHandler.onToast({
          msg: "서버 오류! 잠시후 다시 시작해주세요.",
          icon: "error"
        });
      }
    }
    throw error;
  }
};

export {
  logInApi,
  getUserIdByToken,
  postUserApi,
  deleteUserApi,
  updateUserApi,
  getUserFindById,
  checkemailApi
};
