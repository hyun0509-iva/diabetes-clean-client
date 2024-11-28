import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

const useAPIByParamQuery = <TYPE = unknown>(
  queryParam: string,
  apiKey: string,
  apiFunc: (context: string) => Promise<any>,
  options?: Omit<
    UseQueryOptions<TYPE, AxiosError, TYPE>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery<TYPE, AxiosError>({
    queryKey: [apiKey, queryParam],
    queryFn: () => apiFunc(queryParam),
    enabled: !!queryParam,
    ...options
  });
};

export default useAPIByParamQuery;
