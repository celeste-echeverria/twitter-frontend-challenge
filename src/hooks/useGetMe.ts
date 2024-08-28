import { useEffect, useState } from "react";
import useCustomQuery from "../api/hooks/useCustomQuery";
import { User } from "../interfaces/user.interface";


export const useGetMe = () => {

  const { data: user , isLoading, isError, error } = useCustomQuery<User>({
    path: '/user/me', 
    queryKey: ['me']
  });

  return {user, userIsLoading: isLoading, userIsError: isError, userError: error}
}
