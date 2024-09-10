import { useEffect, useState } from "react";
import useCustomQuery from "../api/hooks/useCustomQuery";
import { Author } from "../interfaces/user.interface";


export const useGetMe = () => {

  return useCustomQuery<Author>({
    endpoint: '/user/me', 
    queryKey: ['me']
  });
  
}
