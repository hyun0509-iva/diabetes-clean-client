import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { QUERY_KEY } from "constants/query_key";
import { CommonResponse, ICommentRequest } from "models/data";
import { createCommentAPI } from "utils/apis/comment";
import alertHandler from "utils/functions/alertHandler";

const { COMMENT_KEY } = QUERY_KEY;

const useCreateComment = () => {
  const queryClient = useQueryClient();

  return useMutation<CommonResponse, AxiosError, ICommentRequest>(
    createCommentAPI<ICommentRequest>,
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
