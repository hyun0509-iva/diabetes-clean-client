import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { QUERY_KEY } from "constants/query_key";
import { CommonResponse } from "models/data";
import { deleteDiabetes } from "utils/apis/diabetesApis";
import alertHandler from "utils/functions/alertHandler";

const { DIABETES_KEY } = QUERY_KEY;

const useDelDiabetes = () => {
  const queryClient = useQueryClient();
  return useMutation<CommonResponse, AxiosError, string>(deleteDiabetes, {
    onSuccess: (data, variables, context) => {
      console.log({ data, variables, context });
      if (data.isOk) {
        alertHandler.onToast({ msg: data.msg });
      }
      queryClient.invalidateQueries<string>([DIABETES_KEY]);
    },
    onError: (err: any) => {
      console.log({ error: err });
      return err;
    }
  });
};

export default useDelDiabetes;
