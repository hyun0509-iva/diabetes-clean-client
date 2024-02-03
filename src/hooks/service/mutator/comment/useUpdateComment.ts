import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { QUERY_KEY } from "constants/query_key";
import { CommonResponse } from "models/data";
import { updateComment } from "utils/apis/comment";
import alertHandler from "utils/functions/alertHandler";

const { COMMENT_KEY } = QUERY_KEY;

const useUpdateComment = () => {
  const queryClient = useQueryClient();
  return useMutation<
    CommonResponse,
    AxiosError,
    { content: string; commentId: string }
  >(updateComment, {
    onSuccess: (data) => {
      if (data.isOk) {
        queryClient.invalidateQueries<string>([COMMENT_KEY]);
        alertHandler.onToast({ msg: data.msg });
      }
    },
    onError: (err) => {
      console.log({ error: err });
      return err;
    }
  });
};

export default useUpdateComment;
