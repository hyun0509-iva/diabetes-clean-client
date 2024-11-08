import { API_PATH } from "constants/api_path";
import {
  CommonResponse,
  IContentsLikeRequest,
  IContentsLikeResponse
} from "models/data";
import api from "utils/axios";

const { CONTENTS_API } = API_PATH;
// contents/contentsId/:like
const addLikeAPI = async (insertData: IContentsLikeRequest) => {
  const { contentsId } = insertData;
  const { data } = await api.post<CommonResponse>(
    `${CONTENTS_API}/${contentsId}/addlike`
  );
  return data;
};

// contents/contentsId/:unlike
const unLikeAPI = async (insertData: IContentsLikeRequest) => {
  const { contentsId } = insertData;
  const { data } = await api.delete<CommonResponse>(
    `${CONTENTS_API}/${contentsId}/unlike`
  );
  return data;
};

// contents/contentsId/:like
const getContentsLikeAPI = async (contentsId: string | null) => {
  if (!contentsId) return;
  const { data } = await api.get<IContentsLikeResponse>(
    `${CONTENTS_API}/${contentsId}/like`
  );
  return data;
};

// contents/contentsId/like/users/:userId
const getMyContentsLikeAPI = async (userId: string | null) => {
  if (!userId) return;
  const { data } = await api.get<IContentsLikeResponse>(
    `${CONTENTS_API}/users/${userId}`
  );
  return data;
};

export { addLikeAPI, unLikeAPI, getContentsLikeAPI, getMyContentsLikeAPI };
