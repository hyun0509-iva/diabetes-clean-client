import { API_PATH } from "constants/api_path";
import { CommonResponse, ILikeRequest, ILikeResponse } from "models/data";
import api from "utils/axios";

const { LIKE_API } = API_PATH;

const addLikeAPI = async (insertData: ILikeRequest) => {
  const { data } = await api.post<CommonResponse>(`${LIKE_API}`, insertData);
  return data;
};
const unLikeAPI = async (insertData: ILikeRequest) => {
  const { userId, ...context } = insertData;
  const { data } = await api.post<CommonResponse>(
    `${LIKE_API}/contents/users/${userId}`,
    context
  );
  return data;
};
// /like/contents/contentsId
const getContentsLikeAPI = async (contentsId: string | null) => {
  if (!contentsId) return;
  const { data } = await api.get<ILikeResponse>(
    `${LIKE_API}/contents/${contentsId}`
  );
  return data;
};
// /like/users/6491db12d62b2e1abd051b97
const getMyContentsLikeAPI = async (userId: string | null) => {
  if (!userId) return;
  const { data } = await api.get<ILikeResponse>(`${LIKE_API}/users/${userId}`);
  return data;
};

export { addLikeAPI, unLikeAPI, getContentsLikeAPI, getMyContentsLikeAPI };
