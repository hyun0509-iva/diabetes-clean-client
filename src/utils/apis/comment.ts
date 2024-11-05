import { API_PATH } from "constants/api_path";
import { CommonResponse, ICommentResponse } from "models/data";
import api from "utils/axios";

const { COMMENT_API } = API_PATH;

const createCommentAPI = async <T>(insertData: T) => {
  const { data } = await api.post<CommonResponse>(`${COMMENT_API}`, insertData);
  return data;
};

const updateCommentAPI = async ({
  content,
  commentId
}: {
  content: string;
  commentId: string;
}) => {
  const { data } = await api.patch<CommonResponse>(
    `${COMMENT_API}/${commentId}`,
    { content }
  );
  console.log({ predata: data });
  return data;
};

const deleteCommentAPI = async (commentId: string) => {
  const { data } = await api.delete<CommonResponse>(
    `${COMMENT_API}/${commentId}`
  );
  return data;
};

const getAllCommentAPI = async (contentsId: string | null) => {
  if (!contentsId) return;
  const { data } = await api.get<ICommentResponse>(
    `${COMMENT_API}/contents/${contentsId}`
  );
  return data;
};

export {
  getAllCommentAPI,
  createCommentAPI,
  updateCommentAPI,
  deleteCommentAPI
};
