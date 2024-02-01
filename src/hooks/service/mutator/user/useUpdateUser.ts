//PATCH api/v1/comment/:id
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { USER_KEY } from "constants/query_key";
import { CommonResponse, TUserUpdateRequest } from "models/data";
import { updateUserApi } from "utils/apis/userApis";
import alertHandler from "utils/functions/alertHandler";

const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation<
    CommonResponse,
    AxiosError,
    {
      userId: string;
      userData: TUserUpdateRequest;
    }
  >(updateUserApi, {
    onSuccess: (data) => {
      if (data.isOk) {
        queryClient.invalidateQueries<string>([USER_KEY]);
        alertHandler.onToast({ msg: data.msg });
      }
    },
    onError: (err) => {
      console.log({ error: err });
      return err;
    }
  });
};

export default useUpdateUser;
