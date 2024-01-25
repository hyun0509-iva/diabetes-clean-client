import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { COMMENT_KEY } from "constants/query_key";
import { CommonResponse } from "models/data";
import { deleteComment } from "utils/apis/comment";
import alertHandler from "utils/functions/alertHandler";

const useDelComment = () => {
  const queryClient = useQueryClient();
  return useMutation<CommonResponse, AxiosError, string>(deleteComment, {
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

export default useDelComment;
