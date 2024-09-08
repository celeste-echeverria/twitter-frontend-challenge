import useCustomMutation, { UseMutationProps } from '../api/hooks/useCustomMutation';

interface FollowUserData {
    userId: string;
}

interface UseUnfollowUserProps extends Omit<UseMutationProps, "endpoint">{
    userId: string
} 
export const useUnfollowUser = ({onError, onSuccess, userId}: UseUnfollowUserProps) => {
    return useCustomMutation<any, FollowUserData> ({ 
        endpoint: `follower/unfollow/${userId}`,
        onSuccess: (data, variables) => {
            console.log(`Successfully unfollowed user with ID: ${variables.userId}`);
            onSuccess?.(data, variables);
        },
        onError
    })
}


