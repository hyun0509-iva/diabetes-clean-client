import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { USER_KEY } from "constants/query_key";
import { CommonResponse, IAuthRequest } from "models/data";
import { postUserApi } from "utils/apis/userApis";
import alertHandler from "utils/functions/alertHandler";

const useCreateUserMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<CommonResponse, AxiosError, IAuthRequest>(
    postUserApi<IAuthRequest>,
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries<string>([USER_KEY]);
        alertHandler.onToast({ msg: data.msg });
      },
      onError: (err) => {
        console.log({ error: err });
        return err;
      }
    }
  );
};
export default useCreateUserMutation;
