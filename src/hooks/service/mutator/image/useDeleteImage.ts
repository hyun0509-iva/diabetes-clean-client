import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { QUERY_KEY } from "constants/query_key";
import { deleteImage } from "utils/apis/uploadImage";
import alertHandler from "utils/functions/alertHandler";

const { COMMENT_KEY } = QUERY_KEY;

const useDeleteImage = () => {
  const queryClient = useQueryClient();
  return useMutation<any, AxiosError, string>(deleteImage, {
    onSuccess: (data) => {
      if (data.isOk) {
        alertHandler.onToast({ msg: data.msg });
      }
      queryClient.invalidateQueries<string>([COMMENT_KEY]);
    },
    onError: (err) => {
      console.log({ error: err });
      return err;
    }
  });
};

export default useDeleteImage;
