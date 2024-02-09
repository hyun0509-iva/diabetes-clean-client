import axios from "axios";
import api from "utils/axios";

const CLOUDINARY_NAME = process.env.REACT_APP_CLOUDINARY_NAME as string;
const PRESET_NAME = process.env.REACT_APP_PRESET_NAME as string;
const API_KEY = process.env.REACT_APP_API_KEY as string;
const API_SECRET = process.env.REACT_APP_API_SECRET as string;

const config = {
  headers: {
    "Content-Type": "multipart/form-data" // 데이터 형식 지정
  }
};

const uploadImage = async (file: File) => {
  try {
    const frmData = new FormData();
    frmData.append("file", file);
    frmData.append("upload_preset", PRESET_NAME);

    const { data } = await axios.post(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_NAME}/image/upload`,
      frmData,
      config
    );
    return data;
  } catch (error: unknown) {
    console.log(error);
    throw error;
  }
};

const deleteImage = async (publicId: string) => {
  console.log(API_KEY, API_SECRET);
  try {
    // 이미지 삭제 API 호출
    const res = await api.post("/api/v1/image", {
      publicId
    });
    console.log({ res });
    return res;
  } catch (error) {
    console.error("Error deleting image:", error);
    throw error;
  }
};

export { uploadImage, deleteImage };
