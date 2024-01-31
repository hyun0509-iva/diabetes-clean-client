import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { USER_KEY } from "constants/query_key";
import { IAuthResponse, TAuthRequest } from "models/data";
import { useNavigate } from "react-router-dom";
import userState from "store/userState";
import { logInApi } from "utils/apis/userApis";
import alertHandler from "utils/functions/alertHandler";
import useStorage from "utils/functions/useStorage";

const useLoginMutation = () => {
  const queryClient = useQueryClient();
  const { isAuth, setIsAuth, setUserInfo } = userState();
  const { setStorage } = useStorage;
  const navigate = useNavigate();

  return useMutation<IAuthResponse, AxiosError, TAuthRequest>(
    logInApi<TAuthRequest>,
    {
      onSuccess(data) {
        if (data) {
          console.log(data);
          const { userInfo, accessToken } = data;
          if (isAuth) return;

          setStorage("accessToken", accessToken);
          setUserInfo(userInfo);
          setIsAuth(true);
          navigate("/");
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
