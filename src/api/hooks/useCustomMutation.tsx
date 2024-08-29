import {MutationKey, useMutation, useQueryClient} from '@tanstack/react-query'
import { authAxios } from '../axiosConfig'

type MutationProps <
    TResultData = unknown,
    TBody = unknown, 
    TError = Error //TODO: revisar tipo de errores
> = {
    mutation: string;
    mutateFn?: (variables: TBody, dynamicPath?: string) => Promise<TResultData>;
    onMutate?: (body: TBody) => Promise<unknown | void> | unknown | void;
    onError?: (error?: TError) => Promise<unknown> | unknown;
    onSuccess?: (data: TResultData, body: TBody) => Promise <unknown> | unknown;
    method?: string;
}

export interface UseMutationProps<
    TResultData = unknown,
    TBody = unknown,
    TError = Error //check    
> extends Omit<MutationProps<TResultData, TBody, TError>, 'mutation'> {}

function useCustomMutation<
    TResultData = unknown,
    TBody = unknown,
    TError = Error //check
>({
    mutation,
    onSuccess,
    onMutate,
    onError,
    method = 'POST'
}: MutationProps<TResultData, TBody, TError>) {

    return useMutation<TResultData, TError, TBody>({
        mutationFn: async (body) => {
            return authAxios(mutation, {
                data: body,
                method
            })
        },

        onMutate: (value) => {
            console.log('MUTATING WITH VALUE', value)
            onMutate?.(value);
        },

        onError: (error) => {
            if (error) {
                console.log('ERROR MUTATING:', error)
            }
            onError?.(error)
        },

        onSuccess: async (data, variables) => {
            onSuccess?.(data, variables);
        }
    })
    
}

export default useCustomMutation;