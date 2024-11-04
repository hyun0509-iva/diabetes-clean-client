import axios from "axios";
import api, { ResponseErrorType } from "utils/axios";
import {
  CommonResponse,
  IAuthResponse,
  IUserResponse,
  TUserUpdateRequest
} from "models/data";
import { API_PATH } from "constants/api_path";
import alertHandler from "utils/functions/alertHandler";
const { USER_API } = API_PATH;

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

// 회원 상세 조회(userId로 조회)
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
// 회원 상세 조회(username으로 조회)
const getUserFindByUserNick = async (userNick: string) => {
  try {
    const { data } = await api.get<IUserResponse>(
      `${USER_API}/usernick/${userNick}`
    );
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

export {
  postUserApi,
  deleteUserApi,
  updateUserApi,
  getUserFindById,
  getUserFindByUserNick
};
