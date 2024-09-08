import useCustomQuery from "../api/hooks/useCustomQuery";

export const useVerifyAuth = () => {

  const { data , isLoading, isError, error } = useCustomQuery({
    endpoint: '/auth/verify', 
    queryKey: ['verifyAuth'],
    returnFullResponse: true
  });

  return {data, isLoading, isError, error}
}
