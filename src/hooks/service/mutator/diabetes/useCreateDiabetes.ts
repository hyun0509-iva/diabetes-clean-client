import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { CommonResponse, IDiabetesRequest } from "models/data";
import { createDiabetes } from "utils/apis/diabetesApis";
import { DIABETES_KEY } from "constants/query_key";
import alertHandler from "utils/functions/alertHandler";
import { ROUTER_PATH } from "constants/router_path";
import { useNavigate } from "react-router-dom";

const useCreateDiabetes = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { MEMO_DIABETES } = ROUTER_PATH;

  return useMutation<CommonResponse, AxiosError, IDiabetesRequest>(
    createDiabetes<IDiabetesRequest>,
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
