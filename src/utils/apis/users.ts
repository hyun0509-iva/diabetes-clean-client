import api from "utils/axios";
import { CommonResponse, IUserResponse, TUserUpdateRequest } from "models/data";
import { API_PATH } from "constants/api_path";
const { USER_API } = API_PATH;

// 회원 가입
const postUserAPI = async <T>(insertData: T) => {
  const { data } = await api.post(`${USER_API}`, insertData);
  return data;
};

// 회원 탈퇴
const deleteUserAPI = async (userId: string) => {
  const { data } = await api.delete<CommonResponse>(`${USER_API}/${userId}`);
  return data;
};

// 회원 정보 수정
const updateUserAPI = async ({
  userId,
  userData
}: {
  userId: string;
  userData: TUserUpdateRequest;
}) => {
  const { data } = await api.patch(`${USER_API}/${userId}`, userData);
  return data;
};

// 회원 상세 조회(userId로 조회)
const getUserFindByIdAPI = async (userId: string) => {
  const { data } = await api.get<IUserResponse>(`${USER_API}/${userId}`);
  return data;
};
// 회원 상세 조회(username으로 조회)
const getUserFindByUserNickAPI = async (userNick: string) => {
  const { data } = await api.get<IUserResponse>(
    `${USER_API}/usernick/${userNick}`
  );
  return data;
};

export {
  postUserAPI,
  deleteUserAPI,
  updateUserAPI,
  getUserFindByIdAPI,
  getUserFindByUserNickAPI
};
