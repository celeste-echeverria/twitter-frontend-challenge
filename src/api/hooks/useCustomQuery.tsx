import { QueryKey } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query"; 
import { fetcher } from "./fetcher";

export default function useCustomQuery<T>(path: string, queryKey: QueryKey, authRequired: boolean) {
    return useQuery<T>({
        queryKey: [queryKey], 
        queryFn: () => fetcher(path, authRequired),
    });
}