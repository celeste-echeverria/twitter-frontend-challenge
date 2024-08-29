import useCustomMutation, { UseMutationProps } from '../api/hooks/useCustomMutation';
import { SignUpData } from '../interfaces/auth.interface';

export const useSignUp = ({onError, onSuccess}: UseMutationProps) => {
  return useCustomMutation<void, SignUpData> ({
    mutation: 'auth/signup',
    onSuccess,
    onError
  })
}
