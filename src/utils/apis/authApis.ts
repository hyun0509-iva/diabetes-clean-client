import { API_PATH } from "constants/api_path";
import { CommonResponse, IAuthResponse, IUserResponse } from "models/data";
import api from "utils/axios/";
const { AUTH, LOG_IN, CHECK_MEAIL, REFLESH } = API_PATH;

// 로그인
const logInApi = async <T>(insertData: T) => {
  const { data } = await api.post<IAuthResponse>(LOG_IN, insertData);
  return data;
};

// 이메일 중복
const checkemailApi = async <T>(insertData: T) => {
  const { data } = await api.post<CommonResponse>(`${CHECK_MEAIL}`, {
    email: insertData
  });
  return data;
};

// 회원 인증 상태
const getUserIdByToken = async () => {
  const { data } = await api.get<IUserResponse>(`${AUTH}`);
  return data;
};

/* 토큰 갱신(재발행) */
const refleshToken = async () => {
  const { data } = await api.post(REFLESH);
  return data;
};

export { logInApi, checkemailApi, getUserIdByToken, refleshToken };
