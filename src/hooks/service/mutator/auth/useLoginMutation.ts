import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { USER_KEY } from "constants/query_key";
import { IAuthResponse, TAuthRequest } from "models/data";
import { useNavigate } from "react-router-dom";
import userState from "store/userState";
import { logInApi } from "utils/apis/userApis";
import alertHandler from "utils/functions/alertHandler";

const useLoginMutation = () => {
  const queryClient = useQueryClient();
  const { isAuth, setIsAuth, setUserInfo } = userState();
  const navigate = useNavigate();

  return useMutation<IAuthResponse, AxiosError, TAuthRequest>(
    logInApi<TAuthRequest>,
    {
      onSuccess(data) {
        if (data) {
          const { userInfo, accessToken } = data;
          if (isAuth) {
            // userInfo, token이 존재한다면 삭제하기
            setUserInfo(userInfo);
            setIsAuth(null);
            return;
          }
          setUserInfo(userInfo);
          setIsAuth(data.accessToken);
          navigate("/");
        }
        queryClient.refetchQueries({ queryKey: [USER_KEY] });
      },
      onError(error: any) {
        alertHandler.onToast({ msg: error.response.data.msg, icon: "error" });
      }
    }
  );
};
export default useLoginMutation;
