import { API_PATH } from "constants/api_path";
import {
  CommonResponse,
  IcommentdeleteResponse,
  ICommentRequest,
  ICommentResponse,
  IcommentupdateResponse
} from "models/data";
import api from "utils/axios";

const { CONTENTS_API } = API_PATH;

// /api/v1/contents/:id/comments
const createCommentAPI = async (insertData: ICommentRequest) => {
  const { contentsId, ...insert } = insertData;
  const { data } = await api.post<CommonResponse>(
    `${CONTENTS_API}/${contentsId}/comments`,
    insert
  );
  return data;
};

const updateCommentAPI = async (insertData: IcommentupdateResponse) => {
  const { contentsId, commentId, content } = insertData;
  const { data } = await api.patch<CommonResponse>(
    `${CONTENTS_API}/${contentsId}/comments/${commentId}`,
    { content }
  );
  return data;
};

const deleteCommentAPI = async (insertData: IcommentdeleteResponse) => {
  const { contentsId, commentId } = insertData;
  const { data } = await api.delete<CommonResponse>(
    `${CONTENTS_API}/${contentsId}/comments/${commentId}`
  );
  return data;
};

const getAllCommentAPI = async (contentsId: string | null) => {
  if (!contentsId) return;
  const { data } = await api.get<ICommentResponse>(
    `${CONTENTS_API}/${contentsId}/comments`
  );
  return data;
};

export {
  getAllCommentAPI,
  createCommentAPI,
  updateCommentAPI,
  deleteCommentAPI
};
