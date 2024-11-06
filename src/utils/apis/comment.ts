import { API_PATH } from "constants/api_path";
import { CommonResponse, ICommentRequest, ICommentResponse } from "models/data";
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

const updateCommentAPI = async ({
  content,
  commentId
}: {
  content: string;
  commentId: string;
}) => {
  const { data } = await api.patch<CommonResponse>(
    `${CONTENTS_API}/${commentId}`,
    { content }
  );
  console.log({ predata: data });
  return data;
};

const deleteCommentAPI = async (commentId: string) => {
  const { data } = await api.delete<CommonResponse>(
    `${CONTENTS_API}/${commentId}`
  );
  return data;
};

const getAllCommentAPI = async (contentsId: string | null) => {
  if (!contentsId) return;
  const { data } = await api.get<ICommentResponse>(
    `${CONTENTS_API}/${contentsId}/comments`
  );
  console.log({ data });
  return data;
};

export {
  getAllCommentAPI,
  createCommentAPI,
  updateCommentAPI,
  deleteCommentAPI
};
