import { useQueryClient } from '@tanstack/react-query';
import useCustomMutation, { UseMutationProps } from '../api/hooks/useCustomMutation';

export interface ReactionData {
    reactionId: string;
}

interface UseDeleteReactionProps extends Omit<UseMutationProps, "endpoint">{}
export const useDeleteReaction = ({onError, onSuccess}: UseDeleteReactionProps) => {
    return useCustomMutation<any, ReactionData> ({ 
        endpoint: `reaction/delete`,
        method: 'DELETE',
        onSuccess: (data, variables) => {
            onSuccess?.(data, variables);
        },
        onError
    })
}

