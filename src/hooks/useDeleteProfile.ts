
import useCustomMutation, { UseMutationProps } from '../api/hooks/useCustomMutation';

interface UseDeleteProfileProps extends Omit<UseMutationProps, "endpoint">{}
export const useDeleteProfile = ({onError, onSuccess}: UseDeleteProfileProps) => {
    return useCustomMutation<any, void> ({ 
        endpoint: `user/me`,
        method: 'DELETE',
        
        onSuccess: (data, variables) => {
            onSuccess?.(data, variables);
        },
        onError
    })
}

