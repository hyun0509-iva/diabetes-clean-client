import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { CommonResponse, IDiabetesRequest } from "models/data";
import { createDiabetesAPI } from "utils/apis/diabetes";
import { QUERY_KEY } from "constants/query_key";
import alertHandler from "utils/functions/alertHandler";
import { ROUTER_PATH } from "constants/router_path";
import { useNavigate } from "react-router-dom";

const { DIABETES_KEY } = QUERY_KEY;

const useCreateDiabetes = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { MEMO_DIABETES } = ROUTER_PATH;

  return useMutation<CommonResponse, AxiosError, IDiabetesRequest>(
    createDiabetesAPI<IDiabetesRequest>,
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries<string>([DIABETES_KEY]);
        alertHandler.onToast({ msg: data.msg });
        navigate(MEMO_DIABETES, { replace: true });
      },
      onError: (err) => {
        console.log({ error: err });
        return err;
      }
    }
  );
};

export default useCreateDiabetes;
