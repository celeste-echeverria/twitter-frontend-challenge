import { useNavigate } from 'react-router-dom';
import useCustomMutation, { UseMutationProps } from '../api/hooks/useCustomMutation';
import { SignInData } from '../interfaces/auth.interface';

interface UseSignInProps extends Omit<UseMutationProps, 'endpoint'> {}
export const useSignIn = ({onSuccess, onMutate, onError}: UseSignInProps) => {
  const navigate = useNavigate();
  return useCustomMutation<any, SignInData> ({ 
    endpoint: 'auth/login',
    onSuccess,
    onMutate,
    onError
  })
}
