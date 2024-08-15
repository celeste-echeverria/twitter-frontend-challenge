import axios from "axios";
import { url } from '../config'

export const createReaction = async (postId: string, reaction: string) => {
    const res = await axios.post(
      `${url}/reaction/${postId}`,
      { type: reaction },
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

export const deleteReaction = async (reactionId: string) => {
    const res = await axios.delete(`${url}/reaction/${reactionId}`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    if (res.status === 200) {
      return res.data;
    }
}