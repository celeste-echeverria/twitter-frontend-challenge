import { useEffect, useState } from "react";
import useCustomQuery from "../api/hooks/useCustomQuery";
import { Author } from "../interfaces/user.interface";
import { profile } from "console";

export const useGetUserProfile = (userId: any) => {

  const { data, isLoading, isError, error, refetch } = useCustomQuery<Author>({
    endpoint: `/user/${userId}`, 
    queryKey: ['userProfile', userId]
  });
  console.log(data)

  return {profile: data, profileIsLoading: isLoading, profileIsError: isError, profileError: error, refetch }
}
