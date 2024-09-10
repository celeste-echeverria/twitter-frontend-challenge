// export const deletePost =  async (postId: string) => {
//     const res = await authAxios.delete(`/post/${postId}`);
//     return res.data
//   }


import useCustomMutation, { UseMutationProps } from '../api/hooks/useCustomMutation';

interface UseDeleteTweetProps extends Omit<UseMutationProps, "endpoint">{
    postId: string
}
export const useDeleteTweet = ({onError, onSuccess, postId}: UseDeleteTweetProps) => {
    return useCustomMutation<any, void> ({ 
        endpoint: `post/${postId}`,
        method: 'DELETE',
        
        onSuccess: (data, variables) => {
            onSuccess?.(data, variables);
        },
        onError
    })
}
