import axios from "axios";
import { API_PATH } from "constants/api_path";
import api, { ResponseErrorType } from "utils/axios";
import alertHandler from "utils/functions/alertHandler";
//patch api/v1/users/:id/follow
const { USER_API } = API_PATH;

const follow = async (userId: string) => {
  if (!userId) return;
  try {
    const { data } = await api.patch(`${USER_API}/${userId}/follow`);
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

// patch api/v1/users/:id/unfollow
const unFollow = async (userId: string | null) => {
  if (!userId) return;
  try {
    const { data } = await api.patch(`${USER_API}/${userId}/unfollow`);
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
const getFollow = async (userId: string | null) => {
  if (!userId) return;
  try {
    const { data } = await api.get(`${USER_API}/${userId}/follow`);
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

export { follow, unFollow, getFollow };
