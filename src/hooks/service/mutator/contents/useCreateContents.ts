import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { QUERY_KEY } from "constants/query_key";
import { CommonResponse, IContentsRequest } from "models/data";
import { createContents } from "utils/apis/contents";

const { CONTENTS_KEY } = QUERY_KEY;

const useCreateContentsMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<CommonResponse, AxiosError, IContentsRequest>(
    createContents<IContentsRequest>,
    {
      onSuccess: () => {
        queryClient.invalidateQueries<string>([CONTENTS_KEY]);
      },
      onError: (err) => {
        console.log({ error: err });
        return err;
      }
    }
  );
};

export default useCreateContentsMutation;
