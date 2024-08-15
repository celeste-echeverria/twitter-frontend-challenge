import axios from "axios";
import { url } from '../config'

export const getRecommendedUsers = async (limit: number, skip: number) => {
    const res = await axios.get(`${url}/user`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
      params: {
        limit,
        skip,
      },
    });
    if (res.status === 200) {
      return res.data;
    }
}

export const me = async () => {
    const res = await axios.get(`${url}/user/me`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    if (res.status === 200) {
      return res.data;
    }
}

export const searchUsers = async (username: string, limit: number, skip: number) => {
    try {
      const cancelToken = axios.CancelToken.source();

      const response = await axios.get(`${url}/user/search`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
        params: {
          username,
          limit,
          skip,
        },
        cancelToken: cancelToken.token,
      });

      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      if (!axios.isCancel(error)) console.log(error);
    }
}

export const getProfile = async (id: string) => {
    const res = await axios.get(`${url}/user/${id}`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    if (res.status === 200) {
      return res.data;
    }
}

export const getProfileView = async (id: string) => {
    const res = await axios.get(`${url}/user/${id}`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });

    if (res.status === 200) {
      return res.data;
    }
}

export const deleteProfile = async () => {
    const res = await axios.delete(`${url}/user/me`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });

    if (res.status === 204) {
      localStorage.removeItem("token");
    }
}
