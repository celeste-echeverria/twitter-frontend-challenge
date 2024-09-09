import axios, { AxiosError } from "axios";
import { authAxios } from "../axiosConfig";
import useCustomQuery from "../hooks/useCustomQuery";
import { Author } from "../../interfaces/user.interface";

//TODO: search abortcontroller and implement in user searches
export const searchUsers = async (username: string, limit: number, skip: number, signal: AbortSignal) => {
  try {
    const res = await authAxios.get(`/user/search`, {
      params: {
        username,
        limit,
        skip,
      },
      signal
    });

    return res.data

  } catch (error: any) {
    if (error.name === 'AbortError') {  
      console.log('Request was aborted'); 
    } else {
      console.error('Request failed:', error);
    }  
  }
}

export const deleteProfile = async () => {
  const res = await authAxios.delete(`/user/me`);
  if (res.status === 204) {
    localStorage.removeItem("token");
  }
}
