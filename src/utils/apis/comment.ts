import axios from "axios";
import { API_PATH } from "constants/api_path";
import { CommonResponse, ICommentResponse } from "models/data";
import api, { ResponseErrorType } from "utils/axios";
import alertHandler from "utils/functions/alertHandler";

const { COMMENT_API } = API_PATH;

const createComment = async <T>(insertData: T) => {
  try {
    const { data } = await api.post<CommonResponse>(
      `${COMMENT_API}`,
      insertData
    );
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

const updateComment = async ({
  content,
  commentId
}: {
  content: string;
  commentId: string;
}) => {
  try {
    const { data } = await api.patch<CommonResponse>(
      `${COMMENT_API}/${commentId}`,
      { content }
    );
    console.log({ predata: data });
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

const deleteComment = async (commentId: string) => {
  try {
    const { data } = await api.delete<CommonResponse>(
      `${COMMENT_API}/${commentId}`
    );
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

const getAllComment = async (contentsId: string | null) => {
  try {
    if (!contentsId) return;
    const { data } = await api.get<ICommentResponse>(
      `${COMMENT_API}/contents/${contentsId}`
    );
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

export { getAllComment, createComment, updateComment, deleteComment };
