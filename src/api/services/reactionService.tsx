import { authAxios } from "../axiosConfig";

export const createReaction = async (postId: string, reaction: string) => {
    const res = await authAxios.post(
      `/reaction/${postId}`,
      { type: reaction },
    );
    if (res.status === 201) {
      return res.data;
    }
}

export const deleteReaction = async (reactionId: string) => {
  const res = await authAxios.delete(`/reaction/${reactionId}`);
  return res.data;
}