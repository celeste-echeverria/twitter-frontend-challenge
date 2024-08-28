import { authAxios } from "../axiosConfig";

export const followUser = async (userId: string) => {
  const res = await authAxios.post(
    `/follow/${userId}`
  );
  if (res.status === 201) {
    return res.data;
  }
}

export const unfollowUser = async (userId: string) => {
  const res = await authAxios.delete(`/follow/${userId}`);
  return res.data
}

export const getMutualFollows = async () => {
  const res = await authAxios.get(`/follow/mutual`);
  return res.data
}