import { authAxios } from "../axiosConfig";

export const getChats = async () => {
  const res = await authAxios.get(`/chat`);
  return res.data
}

export const createChat = async (id: string) => {
  const res = await authAxios.post(
    `/chat`,
    {
      users: [id],
    }
  );
  if (res.status === 201) {
    return res.data;
  }
}

export const getChat = async (id: string) => {
  const res = await authAxios.get(`/chat/${id}`);
  return res.data
}