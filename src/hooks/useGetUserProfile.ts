import { useEffect, useState } from "react";
import useCustomQuery from "../api/hooks/useCustomQuery";
import { Author } from "../interfaces/user.interface";
import { profile } from "console";

export const useGetUserProfile = (userId: any) => {
  console.log('getuserprofile fetches user/ with params', userId)

  const { data, isLoading, isError, error } = useCustomQuery({
    endpoint: `/user/${userId}`, 
    params: {
      userId: userId
    },
    queryKey: [`userProfile`]
  });

  console.log('returned profile:', data)

  return {profile: data, profileIsLoading: isLoading, profileIsError: isError, profileError: error}
}
