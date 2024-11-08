import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { QUERY_KEY } from "constants/query_key";
import { CommonResponse, IcommentdeleteResponse } from "models/data";
import { deleteCommentAPI } from "utils/apis/comment";
import alertHandler from "utils/functions/alertHandler";

const { CONTENTS_KEY } = QUERY_KEY;

const useDelComment = () => {
  const queryClient = useQueryClient();
  return useMutation<CommonResponse, AxiosError, IcommentdeleteResponse>(
    deleteCommentAPI,
    {
      onSuccess: (data) => {
        if (data.isOk) {
          alertHandler.onToast({ msg: data.msg });
        }
        queryClient.invalidateQueries<string>([CONTENTS_KEY]);
        // queryClient.invalidateQueries<string>([COMMENT_KEY]);
      },
      onError: (err) => {
        console.log({ error: err });
        return err;
      }
    }
  );
};

export default useDelComment;
