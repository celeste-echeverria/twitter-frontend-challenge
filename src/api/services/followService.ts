import axios from "axios";
import { url } from '../config'

export const followUser = async (userId: string) => {
    const res = await axios.post(
      `${url}/follow/${userId}`,
      {},
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    if (res.status === 201) {
      return res.data;
    }
}

export const unfollowUser = async (userId: string) => {
    const res = await axios.delete(`${url}/follow/${userId}`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    if (res.status === 200) {
      return res.data;
    }
}

export const getMutualFollows = async () => {
    const res = await axios.get(`${url}/follow/mutual`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });

    if (res.status === 200) {
      return res.data;
    }
}