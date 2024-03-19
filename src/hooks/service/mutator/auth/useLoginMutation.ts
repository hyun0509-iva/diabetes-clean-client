import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { QUERY_KEY } from "constants/query_key";
import { IAuthResponse, TLoginRequest } from "models/data";
import { useNavigate } from "react-router-dom";
import userState from "store/userState";
import { logInApi } from "utils/apis/userApis";
import alertHandler from "utils/functions/alertHandler";
import useStorage from "utils/functions/useStorage";

const { USER_KEY } = QUERY_KEY;

const useLoginMutation = () => {
  const queryClient = useQueryClient();
  const { isAuth, setIsAuth, setUserInfo } = userState();
  const { setStorage } = useStorage;
  const navigate = useNavigate();

  return useMutation<IAuthResponse, AxiosError, TLoginRequest>(
    logInApi<TLoginRequest>,
    {
      onSuccess(data) {
        if (data) {
          const { userInfo, accessToken } = data;
          if (isAuth) return;

          setStorage("accessToken", accessToken);
          setUserInfo(userInfo);
          setIsAuth(true);
        }
        queryClient.refetchQueries({ queryKey: [USER_KEY] });
      },
      onError(error: any) {
        console.log({ loginError: error });
        alertHandler.onToast({ msg: error.response.data.msg, icon: "error" });
      }
    }
  );
};
export default useLoginMutation;
