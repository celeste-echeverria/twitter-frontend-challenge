import { useEffect, useState } from "react";
import useCustomQuery from "../api/hooks/useCustomQuery";
import { Author } from "../interfaces/user.interface";


export const useGetChat = ({ userId }: { userId: any}) => {

  const { data, isLoading, isError, error } = useCustomQuery({
    endpoint: `/chat/messages/${userId}`, 
    queryKey: ['chatMessages', userId],
  });
  console.log(data)
  return { chatHistory: data, chatHistoryIsLoading: isLoading, chatHistoryIsError: isError, chatHistoryError: error}
  
}
