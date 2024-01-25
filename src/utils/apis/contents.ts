import axios from "axios";
import { API_PATH } from "constants/api_path";
import { CommonResponse, IContentsResponse } from "models/data";
import api, { ResponseErrorType } from "utils/axios";
import alertHandler from "utils/functions/alertHandler";

const { CONTENTS_API, SEARCH_API } = API_PATH;

export interface ResData {
  data: { isOk: boolean; likedPost: []; msg: string };
}

// 게시글 추가
const createContents = async <T>(insertData: T) => {
  try {
    const { data } = await api.post<CommonResponse>(
      `${CONTENTS_API}`,
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

// 게시글 삭제
const deleteContents = async (contentId: string) => {
  console.log(contentId);
  try {
    const { data } = await api.delete<CommonResponse>(
      `${CONTENTS_API}/${contentId}`
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

// 게시글 수정
const updateContents = async ({
  contentsId,
  content
}: {
  contentsId: string;
  content: string;
}) => {
  try {
    const { data } = await api.patch<CommonResponse>(
      `${CONTENTS_API}/${contentsId}`,
      {
        content
      }
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

//모든 게시글
const getAllContents = async (page: string) => {
  const limit = 10;
  try {
    //contents?page=1&size=10
    const { data } = await api.get<IContentsResponse>(
      `${CONTENTS_API}?page=${page}&size=${limit}`
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

//내피드 페이징처리
const getUserContents = async (page: string, context: string) => {
  const limit = 10;
  try {
    const { data } = await api.get<IContentsResponse>(
      `${CONTENTS_API}/users/${context}?page=${page}&size=${limit}`
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

// 내 게시글 (게시글수 포함)
const getMyFeedInfo = async (context: string) => {
  try {
    const { data } = await api.get<IContentsResponse>(
      `${CONTENTS_API}/users/${context}/info`
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

// 내 관심글
const getLikedPosts = async (page: string, context: string) => {
  const limit = 10;
  try {
    //contents/like/users/username?page=1&size=10
    const { data } = await api.get<IContentsResponse>(
      `${CONTENTS_API}/like/users/${context}?page=${page}&size=${limit}`
    );
    //응답 데이터를 contents와 맞추기 위해 가공함.
    if (!data.likedPost.length)
      return {
        isOk: false,
        contents: []
      };
    const contents = data?.likedPost
      .map((item: any) => item.contents)
      .reverse();
    const data_: IContentsResponse = {
      isOk: true,
      contents
    };

    return data_;
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

// 게시글 검색
//search?keyword=오늘&page=1&size=10
const getSearchContents = async (page: string, context: string) => {
  const limit = 10;
  try {
    const { data } = await api.get<IContentsResponse>(
      `${SEARCH_API}?keyword=${context}&page=${page}&size=${limit}`
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

// 게시글 상세 조회
const getContentsFindById = async (id: string | null) => {
  try {
    if (!id) return;
    const { data } = await api.get(`${CONTENTS_API}/${id}`);
    return data;
  } catch (error: any) {
    alertHandler.onToast({
      msg: error.data.msg || "서버 오류, 관리자에게 문의해주세요!",
      icon: "error"
    });
    throw error.response;
  }
};

export {
  getAllContents,
  getSearchContents,
  getUserContents,
  getMyFeedInfo,
  getLikedPosts,
  createContents,
  deleteContents,
  updateContents,
  getContentsFindById
};
