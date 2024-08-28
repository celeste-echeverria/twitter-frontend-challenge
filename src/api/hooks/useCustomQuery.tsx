import { QueryKey } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query"; 
import { fetcher } from "./fetcher";
import { QueryParams } from ".";

interface useCustomQueryProps {
    path: string,
    queryKey: QueryKey, 
    params?: QueryParams
}

export default function useCustomQuery<TResultData>({ path, queryKey, params}: useCustomQueryProps) {
    return useQuery<TResultData>({
        queryKey, 
        queryFn: async () => fetcher(path, params),
        retry: false, 
    });
}