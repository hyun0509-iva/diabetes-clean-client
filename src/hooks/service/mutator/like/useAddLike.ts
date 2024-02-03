import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { QUERY_KEY } from "constants/query_key";
import { CommonResponse, ILikeRequest } from "models/data";
import { addLike } from "utils/apis/like";

const { Like_key } = QUERY_KEY;

const useAddLike = () => {
  const queryClient = useQueryClient();
  return useMutation<CommonResponse, AxiosError, ILikeRequest>(addLike, {
    onSuccess: () => {
      queryClient.invalidateQueries<string>([Like_key]);
    },
    onError: (err) => {
      console.log({ error: err });
      return err;
    }
  });
};

export default useAddLike;
