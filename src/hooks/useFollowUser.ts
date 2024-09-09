import { useQueryClient } from '@tanstack/react-query';
import useCustomMutation, { UseMutationProps } from '../api/hooks/useCustomMutation';

interface FollowUserData {
    userId: string;
}

interface UseFollowUserProps extends Omit<UseMutationProps, "endpoint">{
    userId: string
}
export const useFollowUser = ({onError, onSuccess, userId}: UseFollowUserProps) => {
    const queryClient = useQueryClient();

    return useCustomMutation<any, FollowUserData> ({ 
        endpoint: `follower/follow/${userId}`,
        onSuccess: (data, variables) => {
            console.log(`Successfully followed user with ID: ${variables.userId}`);
            onSuccess?.(data, variables);
        },
        onError
    })
}


