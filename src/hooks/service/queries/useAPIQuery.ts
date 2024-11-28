import { QueryKey, UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

const useAPIQuery = <TYPE = unknown>(
  apiKey: QueryKey,
  apiFunc: () => Promise<any>,
  options?: Omit<
    UseQueryOptions<TYPE, AxiosError, TYPE>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery<TYPE, AxiosError, TYPE, QueryKey>({
    queryKey: apiKey,
    queryFn: apiFunc,
    ...options
  });
};

export default useAPIQuery;
