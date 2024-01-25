import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { COMMENT_KEY } from "constants/query_key";
import { CommonResponse, ICommentRequest } from "models/data";
import { createComment } from "utils/apis/comment";
import alertHandler from "utils/functions/alertHandler";

const useCreateComment = () => {
  const queryClient = useQueryClient();
  return useMutation<CommonResponse, AxiosError, ICommentRequest>(
    createComment<ICommentRequest>,
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries<string>([COMMENT_KEY]);
        alertHandler.onToast({ msg: data.msg });
      },
      onError: (err) => {
        console.log({ error: err });
        return err;
      }
    }
  );
};
export default useCreateComment;
