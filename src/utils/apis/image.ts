import api, { ResponseErrorType } from "utils/axios";
import { API_PATH } from "constants/api_path";
import axios from "axios";
import alertHandler from "utils/functions/alertHandler";

const { PROFILE_IMAGE_API } = API_PATH;

const uploadImage = async (frmData: FormData) => {
  try {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data" // 데이터 형식 지정
      }
    };
    console.log(frmData);
    const data = await api.post(PROFILE_IMAGE_API, frmData, config);
    console.log({ data });
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

export { uploadImage };
