import { fetcher, poster } from "@/utils/fetcher";
import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";
import { toast } from "sonner";

export const useFetchData = <T,>(key: string, url: string) => {
  const queryOptions: UseQueryOptions<T, Error> = {
    queryKey: [key],
    queryFn: async () => {
      const res = await fetcher(url);
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
      if (data.success) {
        return data.data as T;
      }
      throw new Error("Network response was not ok");
    },
  };

  const query = useQuery(queryOptions);

  return query;
};

export const usePostData = <T,>(key: string, url: string, payload: any) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error>({
    mutationFn: async (json) => {
      const res = await poster(url, payload);
      return await res.json();
    },
    onSuccess: () => {
      toast.success("Created");

      queryClient.invalidateQueries({ queryKey: [key] });
    },
    onError: (error) => {
      toast.error("Failed to create new record!");
    },
  });
  return mutation;
};
