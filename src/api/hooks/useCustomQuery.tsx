import { QueryKey } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query"; 
import  fetcher from "./fetcher";
import { QueryParams } from ".";

type QueryProps <
    TResultData = unknown,
    TBody = unknown, 
    TError = Error //TODO: revisar tipo de errores
> = {
    endpoint: string,
    queryKey: QueryKey,
    params?: QueryParams,
    method?: string,
    returnFullResponse?: boolean
}

function useCustomQuery<
    TResultData = unknown,
    TBody = unknown,
    TError = Error //check
>({ 
    endpoint, 
    queryKey, 
    params,
    method = 'GET',
    returnFullResponse = false
}: QueryProps) { 

    return useQuery({
        queryKey, 
        queryFn: async () => {
            return await fetcher({
                method: method,
                endpoint,
                params: params,
                returnFullResponse
            })
        },
        retry: false, 
    });

}

export default useCustomQuery;