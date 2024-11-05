import { API_PATH } from "constants/api_path";
import { CommonResponse, IAuthResponse, IUserResponse } from "models/data";
import api from "utils/axios";
import useStorage from "utils/functions/useStorage";
const { getStorage } = useStorage;

const { AUTH, LOG_IN, LOG_OUT, CHECK_MEAIL, REFLESH } = API_PATH;

// 로그인
const logInAPI = async <T>(insertData: T) => {
  const { data } = await api.post<IAuthResponse>(LOG_IN, insertData);
  console.log({ loginData: data });

  return data;
};

const logOutAPI = async () => {
  const token = getStorage("accessToken");
  const { data } = await api.post<CommonResponse>(
    LOG_OUT,
    {},
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  );
  return data;
};

// 이메일 중복
const checkemailAPI = async <T>(insertData: T) => {
  const { data } = await api.post<CommonResponse>(CHECK_MEAIL, {
    email: insertData
  });
  return data;
};

// 회원 인증 상태
const getUserIdByTokenAPI = async () => {
  const { data } = await api.get<IUserResponse>(AUTH);
  return data;
};

/* 토큰 갱신(재발행) */
const refleshTokenAPI = async () => {
  const { data } = await api.post(REFLESH);
  return data;
};

export {
  logInAPI,
  logOutAPI,
  checkemailAPI,
  getUserIdByTokenAPI,
  refleshTokenAPI
};
