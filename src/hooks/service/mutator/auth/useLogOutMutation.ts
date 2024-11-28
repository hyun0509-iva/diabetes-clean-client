import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { QUERY_KEY } from "constants/query_key";
import { CommonResponse, IAuthResponse, TLoginRequest } from "models/data";
import userState from "store/userState";
import { logOutAPI } from "utils/apis/auth";
import alertHandler from "utils/functions/alertHandler";
import useStorage from "utils/functions/useStorage";

const { USER_KEY } = QUERY_KEY;

const useLogOutMutation = () => {
  const queryClient = useQueryClient();
  const { setIsAuth, removeUserInfo } = userState();
  const { removeStorage } = useStorage;

  return useMutation<CommonResponse, AxiosError>(logOutAPI, {
    onSuccess(data) {
      if (data.isOk) {
        removeUserInfo();
        removeStorage("accessToken");
        setIsAuth(false);
        queryClient.invalidateQueries({ queryKey: [USER_KEY] });
      }
    },
    onError(error: any) {
      console.log({ loginError: error });
      alertHandler.onToast({ msg: error.response.data.msg, icon: "error" });
    }
  });
};
export default useLogOutMutation;
