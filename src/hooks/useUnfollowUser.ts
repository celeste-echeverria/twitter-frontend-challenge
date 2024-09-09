import { useQueryClient } from '@tanstack/react-query';
import useCustomMutation, { UseMutationProps } from '../api/hooks/useCustomMutation';

interface FollowUserData {
    userId: string;
}

interface UseUnfollowUserProps extends Omit<UseMutationProps, "endpoint">{
    userId: string
} 
export const useUnfollowUser = ({onError, onSuccess, userId}: UseUnfollowUserProps) => {
    const queryClient= useQueryClient();
    return useCustomMutation<any, FollowUserData> ({ 
        endpoint: `follower/unfollow/${userId}`,
        onSuccess: (data, variables) => {
            console.log(`Successfully unfollowed user with ID: ${variables.userId}`);
            queryClient.invalidateQueries({
                queryKey: ['userProfile', userId],
                refetchType: 'active',
              })
            onSuccess?.(data, variables);
        },
        onError
    })
}


