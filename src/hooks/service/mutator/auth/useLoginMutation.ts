import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { QUERY_KEY } from "constants/query_key";
import { IAuthResponse, TLoginRequest } from "models/data";
import userState from "store/userState";
import { logInAPI } from "utils/apis/auth";
import alertHandler from "utils/functions/alertHandler";
import useStorage from "utils/functions/useStorage";

const { USER_KEY } = QUERY_KEY;

const useLoginMutation = () => {
  const queryClient = useQueryClient();
  const { setIsAuth, setUserInfo } = userState();
  const { setStorage } = useStorage;

  return useMutation<IAuthResponse, AxiosError, TLoginRequest>(
    logInAPI<TLoginRequest>,
    {
      onSuccess(data) {
        if (data.isOk) {
          const { userInfo, accessToken } = data;
          console.log({ mu: userInfo });

          setStorage("accessToken", accessToken);
          setUserInfo(userInfo);
          setIsAuth(true);
          queryClient.invalidateQueries({ queryKey: [USER_KEY] });
        }
      },
      onError(error: any) {
        console.log({ loginError: error });
        alertHandler.onToast({ msg: error.response.data.msg, icon: "error" });
      }
    }
  );
};
export default useLoginMutation;
