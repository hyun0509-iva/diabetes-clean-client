import { API_PATH } from "constants/api_path";
import api from "utils/axios";
//patch api/v1/users/:id/follow
const { USER_API } = API_PATH;

const followAPI = async (userId: string) => {
  if (!userId) return;
  const { data } = await api.patch(`${USER_API}/${userId}/follow`);
  return data;
};

// patch api/v1/users/:id/unfollow
const unFollowAPI = async (userId: string | null) => {
  if (!userId) return;
  const { data } = await api.patch(`${USER_API}/${userId}/unfollow`);
  return data;
};
const getFollowAPI = async (userId: string | null) => {
  if (!userId) return;
  const { data } = await api.get(`${USER_API}/${userId}/follow`);
  return data;
};

export { followAPI, unFollowAPI, getFollowAPI };
