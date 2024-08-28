import { useMutation } from '@tanstack/react-query';
import { SignUpData} from '../interfaces/auth.interface'
import useCustomMutation from '../api/hooks/useCustomMutation';


export const useSignUp = async(userData: SignUpData) => {

    const { data: user, isPending, isError, error } = useCustomMutation<SignUpData>({
      method: 'POST',
      path: '/auth/signup', 
      body: userData,
      mutationKey: ['signup']
    });
  
    return {user, signUpIsLoading: isPending, signUpIsError: isError, signUpError: error}
}
  
/*
import { useMutation } from 'react-query';

const updateUser = async (userData) => {
  // Perform the mutation logic, e.g., make an API request to update the user
  const response = await fetch('/api/users', {
    method: 'PUT',
    body: JSON.stringify(userData),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  if (!response.ok) {
    throw new Error('Failed to update user');
  }

  return response.json();
};

const EditUserForm = ({ userId }) => {
  const [mutate, { isLoading, isError, error }] = useMutation(updateUser);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const userData = Object.fromEntries(formData);

    mutate(userData);
  };


  export const signUp = async (data: Partial<SignUpData>) => {
        const res = await noAuthAxios.post(`/auth/signup`, data);
        if (res.status === 201) {
            localStorage.setItem("token", `Bearer ${res.data.token}`);
            return true;
        }
    }
 */