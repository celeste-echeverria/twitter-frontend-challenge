import axios, { AxiosError } from "axios";
import { authAxios } from "../axiosConfig";
import useCustomQuery from "../hooks/useCustomQuery";
import { User } from "../../interfaces/user.interface";

export const getRecommendedUsers = async (limit: number, skip: number) => {
  const res = await authAxios.get(`/user`, {
    params: {
      limit,
      skip,
    },
  });
  return res.data
}


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

export const getProfile = async (id: string) => {
  const res = await authAxios.get(`/user`, {
    params: {
      userId: id
    }
  });
  return res.data
}

export const getProfileView = async (id: string) => {
  const res = await authAxios.get(`/user/${id}`);
  return res.data
}

export const deleteProfile = async () => {
  const res = await authAxios.delete(`/user/me`);
  if (res.status === 204) {
    localStorage.removeItem("token");
  }
}
