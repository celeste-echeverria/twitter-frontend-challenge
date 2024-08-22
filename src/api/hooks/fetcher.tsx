import { authAxios, noAuthAxios } from "../axiosConfig";

export const fetcher = async (path: string, authRequired: boolean): Promise<any> => {
  try {
    const res = authRequired ? await authAxios.get(path) : await noAuthAxios.get(path)
    return res
  } catch (error) {
    console.log('Error fetching data from', path)
  }
};
