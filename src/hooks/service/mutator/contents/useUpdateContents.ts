//PATCH api/v1/contents/:id

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { DIABETES_KEY } from "constants/query_key";
import { CommonResponse } from "models/data";
import { useNavigate } from "react-router-dom";
import { updateContents } from "utils/apis/contents";
import alertHandler from "utils/functions/alertHandler";

const useUpdateDiabetes = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation<
    CommonResponse,
    AxiosError,
    {
      contentsId: string;
      content: string;
    }
  >(updateContents, {
    onSuccess: (data) => {
      if (data.isOk) {
        queryClient.invalidateQueries<string>([DIABETES_KEY]);
        alertHandler.onToast({ msg: data.msg });
        navigate(-1);
      }
    },
    onError: (err) => {
      console.log({ error: err });
      return err;
    }
  });
};

export default useUpdateDiabetes;
