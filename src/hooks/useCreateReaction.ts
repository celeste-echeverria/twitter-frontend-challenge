import { useQueryClient } from '@tanstack/react-query';
import useCustomMutation, { UseMutationProps } from '../api/hooks/useCustomMutation';
import type { Reaction } from '../interfaces/reaction.interface';

interface ReactionData {
    reactionType: string;
}
interface UseCreateReactionProps extends Omit<UseMutationProps, "endpoint">{
    postId: string
}


export const useCreateReaction = ({onError, onSuccess, postId}: UseCreateReactionProps) => {
    return useCustomMutation<Reaction, ReactionData> ({ 
        endpoint: `reaction/${postId}`,
        onSuccess: (data, variables) => {
            console.log(`Successfully reacted with type: ${variables.reactionType} to post with ID: ${postId}`);
            onSuccess?.(data, variables);
        },
        onError
    })
}


