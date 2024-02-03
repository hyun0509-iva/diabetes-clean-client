import axios from "axios";

const uploadImage = async (file: File) => {
  const CLOUDINARY_NAME = process.env.REACT_APP_CLOUDINARY_NAME as string;
  const PRESET_NAME = process.env.REACT_APP_PRESET_NAME as string;

  try {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data" // 데이터 형식 지정
      }
    };
    const frmData = new FormData();
    frmData.append("file", file);
    frmData.append("upload_preset", PRESET_NAME);

    const { data } = await axios.post(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_NAME}/image/upload`,
      frmData,
      config
    );

    console.log(data);
    return data;
  } catch (error: unknown) {
    console.log(error);
    throw error;
  }
};

const deleteImage = async () => null;

export { uploadImage, deleteImage };
