import useCustomMutation, { UseMutationProps } from '../api/hooks/useCustomMutation';
import { SignInData } from '../interfaces/auth.interface';

export const useSignIn = ({onError, onSuccess}: UseMutationProps) => {
  return useCustomMutation<void, SignInData> ({
    mutation: 'auth/login',
    onSuccess,
    onError
  })
}
