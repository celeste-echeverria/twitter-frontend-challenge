import axios from "axios";
import { url } from '../config'

export const getChats = async () => {
    const res = await axios.get(`${url}/chat`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });

    if (res.status === 200) {
      return res.data;
    }
}

export const createChat = async (id: string) => {
    const res = await axios.post(
      `${url}/chat`,
      {
        users: [id],
      },
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

export const getChat = async (id: string) => {
    const res = await axios.get(`${url}/chat/${id}`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });

    if (res.status === 200) {
      return res.data;
    }
}