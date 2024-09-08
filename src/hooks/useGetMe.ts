import { useEffect, useState } from "react";
import useCustomQuery from "../api/hooks/useCustomQuery";
import { Author } from "../interfaces/user.interface";


export const useGetMe = () => {

  const { data, isLoading, isError, error } = useCustomQuery<Author>({
    endpoint: '/user/me', 
    queryKey: ['me']
  });
  return {user: data, userIsLoading: isLoading, userIsError: isError, userError: error}
  
}
