import { useEffect, useState } from "react";
import { Author, UserView } from "../interfaces/user.interface";
import { searchUsers } from "../api/services/userService";
import { LIMIT } from "../util/Constants";
import useCustomQuery from "../api/hooks/useCustomQuery";

interface UseGetRecommendationsProps {
  query: string;
}

export const useGetSearchUsers = ({
  query
}: UseGetRecommendationsProps) => {

  const { data, isLoading, isError, error, refetch, isRefetching, isSuccess } = useCustomQuery<UserView[]>({
    endpoint: `/user/search/`,
    queryKey: [`searchUsers`, query],
    params:{
      query: query,
    },
  });

  return { data, isLoading, isError, error, refetch, isRefetching, isSuccess };

};
