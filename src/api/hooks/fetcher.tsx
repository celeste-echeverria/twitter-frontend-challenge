import { AxiosError } from "axios";
import { authAxios, noAuthAxios } from "../axiosConfig";
import { QueryParams } from ".";



export const fetcher = async (path: string, params?: QueryParams): Promise<any> => {
  try {
    console.log('fetching ', path )
    const config = { params };
    const res = await authAxios({
      method: 'get', 
      url: path, 
      ...config
    });
    return res.data
  } catch (error) {
    if (error instanceof AxiosError) {
        throw new Error(error.response?.data?.message || 'Error fetching data');
    }
    throw new Error('Unexpected error');
  }
};
