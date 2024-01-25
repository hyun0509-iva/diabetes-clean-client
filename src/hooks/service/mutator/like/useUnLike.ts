import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Like_key } from "constants/query_key";
import { CommonResponse, ILikeRequest } from "models/data";
import { unLike } from "utils/apis/like";

const useUnLike = () => {
  const queryClient = useQueryClient();
  return useMutation<CommonResponse, AxiosError, ILikeRequest>(unLike, {
    onSuccess: (data) => {
      queryClient.invalidateQueries<string>([Like_key]);
      console.log(data);
    },
    onError: (err) => {
      console.log({ error: err });
      return err;
    }
  });
};

export default useUnLike;
