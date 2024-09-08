import { useInfiniteQuery, QueryKey } from "@tanstack/react-query";
import fetcher from "./fetcher";
import { QueryParams } from ".";
import { LIMIT } from "../../util/Constants";
import { TPage } from "../../interfaces/post.interface";

type InfiniteQueryProps<
  TBody = unknown,
  TError = Error
> = {
  endpoint: string;
  queryKey: QueryKey;
  params?: QueryParams;
  method?: string;
};

function useInfiniteCustomQuery<
  TBody = unknown,
  TError = Error
>({
  endpoint,
  queryKey,
  params,
  method = 'GET',
}: InfiniteQueryProps) {
  return useInfiniteQuery<TPage, TError>({
 
    initialPageParam: params,
    queryKey,

    queryFn: async ({ pageParam }) => {
        const response = await fetcher<TPage>({
          endpoint,
          params: pageParam as QueryParams, 
          method,
        })
        return response
    },

    getNextPageParam: (lastPage, pages) => {
        return lastPage.hasMore ? {after: lastPage.nextCursor, limit: params?.limit} : undefined;
    },

    retry: false,
    refetchOnReconnect: true,
  });
}

export default useInfiniteCustomQuery;
