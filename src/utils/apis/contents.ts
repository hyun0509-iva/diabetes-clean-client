import { API_PATH } from "constants/api_path";
import { CommonResponse, IContentsResponse } from "models/data";
import api from "utils/axios";
import useStorage from "utils/functions/useStorage";

const { CONTENTS_API, SEARCH_API } = API_PATH;

export interface ResData {
  data: { isOk: boolean; likedPost: []; msg: string };
}

const { getStorage } = useStorage;
// 게시글 추가
const createContentsAPI = async <T>(insertData: T) => {
  const { data } = await api.post<CommonResponse>(
    `${CONTENTS_API}`,
    insertData
  );
  return data;
};

// 게시글 삭제
const deleteContentsAPI = async (contentId: string) => {
  const { data } = await api.delete<CommonResponse>(
    `${CONTENTS_API}/${contentId}`
  );
  return data;
};

// 게시글 수정
const updateContentsAPI = async ({
  contentsId,
  content
}: {
  contentsId: string;
  content: string;
}) => {
  const { data } = await api.patch<CommonResponse>(
    `${CONTENTS_API}/${contentsId}`,
    {
      content
    }
  );
  return data;
};

//모든 게시글
const getAllContentsAPI = async (page: string) => {
  const limit = 10;
  //contents?page=1&size=10
  const res = await api.get<IContentsResponse>(
    `${CONTENTS_API}?page=${page}&size=${limit}`
  );
  //page: string, context: string
  if (res.status === 204) {
    return { contents: null };
  }
  return res.data;
};

//내피드(페이징 처리)
const getUserContentsAPI = async (page: string, context: string) => {
  const limit = 10;
  const res = await api.get<IContentsResponse>(
    `${CONTENTS_API}/users/${context}?page=${page}&size=${limit}`
  );
  if (res.status === 204) {
    return { contents: null };
  }
  const data = res.data;
  return data;
};

// 내 관심글
const getLikedPostsAPI = async (page: string, context: string) => {
  const limit = 10;
  //contents/like/users/username?page=1&size=10
  const res = await api.get<IContentsResponse>(
    `${CONTENTS_API}/like/users/${context}?page=${page}&size=${limit}`
  );
  //응답 데이터를 contents와 맞추기 위해 가공함.
  if (res.status === 204) {
    return { contents: null };
  }
  const data = res.data;
  if (!data.likedPost?.length) {
    return {
      isOk: false,
      contents: []
    };
  }

  const contents = data?.likedPost.map((item: any) => item.contents).reverse();

  const data_: IContentsResponse = {
    isOk: true,
    ...contents
  };

  return data_;
};

// 내 게시글 정보(페이징 처리되지 않음)
const getMyFeedInfoAPI = async (ninkName: string) => {
  const token = getStorage("accessToken");
  const { data } = await api.get<IContentsResponse>(
    `${CONTENTS_API}/myfeed-info/users/${ninkName}`,
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  );
  return data;
};

// 게시글 검색
//search?keyword=오늘&page=1&size=10
const getSearchContentsAPI = async (page: string, context: string) => {
  const limit = 10;
  const { data } = await api.get<IContentsResponse>(
    `${SEARCH_API}?keyword=${context}&page=${page}&size=${limit}`
  );
  return data;
};

// 게시글 상세 조회
const getContentsFindByIdAPI = async (id: string | null) => {
  if (!id) return;
  const { data } = await api.get(`${CONTENTS_API}/${id}`);
  return data;
};

export {
  getAllContentsAPI,
  getSearchContentsAPI,
  getUserContentsAPI,
  getMyFeedInfoAPI,
  getLikedPostsAPI,
  createContentsAPI,
  deleteContentsAPI,
  updateContentsAPI,
  getContentsFindByIdAPI
};
