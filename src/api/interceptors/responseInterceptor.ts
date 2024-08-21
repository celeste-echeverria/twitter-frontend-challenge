import { AxiosResponse, AxiosError } from 'axios';

export const responseInterceptor = (value: AxiosResponse) => {
  return value
};

export const responseErrorInterceptor = (error: AxiosError) => {
    if (error.response?.status === 401) {
        window.location.href = '/';
    }
    return Promise.reject(error);
};
