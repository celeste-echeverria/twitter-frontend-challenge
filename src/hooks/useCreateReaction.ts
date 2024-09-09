// export const createReaction = async (postId: string, reaction: string) => {
//     const res = await authAxios.post(
//       `/reaction/${postId}`,
//       { type: reaction },
//     );
//     if (res.status === 201) {
//       return res.data;
//     }
// }

// export const deleteReaction = async (reactionId: string) => {
//   const res = await authAxios.delete(`/reaction/${reactionId}`);
//   return res.data;
// }


import { useQueryClient } from '@tanstack/react-query';
import useCustomMutation, { UseMutationProps } from '../api/hooks/useCustomMutation';

interface ReactionData {
    reactionType: string;
}
interface UseCreateReactionProps extends Omit<UseMutationProps, "endpoint">{
    postId: string
}
export const useCreateReaction = ({onError, onSuccess, postId}: UseCreateReactionProps) => {
    const queryClient = useQueryClient();
    return useCustomMutation<any, ReactionData> ({ 
        endpoint: `reaction/${postId}`,
        onSuccess: (data, variables) => {
            console.log(`Successfully reacted with type: ${variables.reactionType} to post with ID: ${postId}`);
            onSuccess?.(data, variables);
        },
        onError
    })
}


