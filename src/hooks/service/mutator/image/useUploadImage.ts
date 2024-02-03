import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { uploadImage } from "utils/apis/uploadImage";
import alertHandler from "utils/functions/alertHandler";

const useUploadImage = () => {
  return useMutation<any, AxiosError, File>(uploadImage, {
    onSuccess: () => {
      alertHandler.onToast({
        icon: "success",
        msg: "이미지를 업로드했습니다."
      });
    },
    onError: (error) => {
      console.log({ error });
      if (error.response?.status === 500) {
        alertHandler.onToast({
          msg: "서버 오류! 잠시후 다시 시작해주세요.",
          icon: "error"
        });
      }
      return error;
    }
  });
};
export default useUploadImage;
