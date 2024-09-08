import { AxiosResponse, AxiosError } from 'axios';

export const responseInterceptor = (value: AxiosResponse) => {
  return value
};

