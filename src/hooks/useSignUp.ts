import { useNavigate } from 'react-router-dom';
import useCustomMutation, { UseMutationProps } from '../api/hooks/useCustomMutation';
import { SignUpData } from '../interfaces/auth.interface';

export const useSignUp = () => {
  const navigate = useNavigate();
  return useCustomMutation<void, SignUpData> ({
    endpoint: 'auth/signup',
    onSuccess: () => {
      //todo: check token return
      console.log('navigating to home');
      navigate('/home');
    },
    onError: () => {
      //todo: toast
    }
  })
}
