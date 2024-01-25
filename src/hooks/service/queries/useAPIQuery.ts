import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

const useAPIQuery = <TYPE = unknown>(
  apiKey: string,
  apiFunc: () => Promise<any>
) => {
  return useQuery<TYPE | undefined, AxiosError>({
    queryKey: [apiKey],
    queryFn: () => apiFunc()
  });
};

export default useAPIQuery;
