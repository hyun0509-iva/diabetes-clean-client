import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { USER_KEY } from "constants/query_key";
import { CommonResponse } from "models/data";
import { useNavigate } from "react-router-dom";
import { deleteUserApi } from "utils/apis/userApis";
import alertHandler from "utils/functions/alertHandler";

const useDeleteUser = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation<CommonResponse, AxiosError, string>(deleteUserApi, {
    onSuccess: (data, variables, context) => {
      if (data.isOk) {
        alertHandler
          .onDefaultAlert({
            icon: "success",
            html: `<p
              style={{
                height: 50,
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}>
              회원 탈퇴되었습니다. <br />
              그동안 서비스를 사용해주셔서 감사합니다.
              </p>
            `
          })
          .then((result) => {
            if (result.isConfirmed) {
              console.log({ 회원탈퇴: result });
              queryClient.setQueryData([USER_KEY], false);
              navigate("/login", { replace: true });
            }
          });
      }
    },
    onError: (err: any) => {
      console.log({ error: err });
      return err;
    }
  });
};

export default useDeleteUser;
