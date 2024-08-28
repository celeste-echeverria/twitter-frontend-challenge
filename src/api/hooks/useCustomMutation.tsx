import {MutationKey, useMutation} from '@tanstack/react-query'
import { authAxios } from '../axiosConfig'

interface useCustomMutationProps {
    method: string,
    path: string,
    mutationKey: MutationKey,
    body?: any
}

export default function useCustomMutation<TResultData>({method, path, mutationKey, body}: useCustomMutationProps) {
    return useMutation({
        mutationFn: async () => authAxios({
            method, 
            url: path, 
            data: body,
        }), 
        mutationKey,
        //TODO: borrar
        onSuccess: ((body) => console.log('mutated', body))
    })
}