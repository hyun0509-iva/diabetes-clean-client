import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { QUERY_KEY } from "constants/query_key";
import { CommonResponse } from "models/data";
import { unFollow } from "utils/apis/follow";
import alertHandler from "utils/functions/alertHandler";

const { FOLLOW_KEY } = QUERY_KEY;

const useUnFollow = () => {
  const queryClient = useQueryClient();
  return useMutation<CommonResponse, AxiosError, string>(unFollow, {
    onSuccess: (data) => {
      queryClient.invalidateQueries<string>([FOLLOW_KEY]);
      alertHandler.onToast({ msg: data.msg });
    },
    onError: (err) => {
      console.log({ error: err });
      return err;
    }
  });
};

export default useUnFollow;
