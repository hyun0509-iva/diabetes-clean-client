import axios from "axios";
import { API_PATH } from "constants/api_path";
import { IAuthResponse } from "models/data";
import api, { ResponseErrorType } from "utils/axios/";
import alertHandler from "utils/functions/alertHandler";
const { LOG_IN, REFLESH } = API_PATH;

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

const refleshToken = async () => {
  try {
    const { data } = await api.get(REFLESH);
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

export { logInApi, refleshToken };
