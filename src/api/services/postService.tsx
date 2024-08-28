import { authAxios } from "../axiosConfig";
import { S3Service } from "./S3Service";
import { PostData } from "../../interfaces/post.interface";

export const createPost = async (data: PostData) => {
  const res = await authAxios.post(`/post`, data);
  if (res.status === 201) {
    const { upload } = S3Service;
    for (const imageUrl of res.data.images) {
      const index: number = res.data.images.indexOf(imageUrl);
      await upload(data.images![index], imageUrl);
    }
    return res.data;
  }
}

export const getPaginatedPosts = async (limit: number, after: string, query: string) => {
  const res = await authAxios.get(`/post/${query}`, {
    params: {
      limit,
      after,
    },
  });
  return res.data
}

export const getPosts = async (query: string) => {
  const res = await authAxios.get(`/post/${query}`);
  return res.data;
}

export const getPostById = async (id: string) => {
  const res = await authAxios.get(`/post/${id}`);
  return res.data
}

export const getPaginatedPostsFromProfile = async (
  limit: number,
  after: string,
  id: string
) => {
  const res = await authAxios.get(`/post/by_user/${id}`, {
    params: {
      limit,
      after,
    },
  });
  return res.data
}

export const getPostsFromProfile = async (id: string) => {
  const res = await authAxios.get(`/post/by_user/${id}`);
  return res.data
}

export const deletePost =  async (id: string) => {
  const res = await authAxios.delete(`/post/${id}`);
  return res.data
}

export const getPaginatedCommentsByPostId = async (
  id: string,
  limit: number,
  after: string
) => {
  const res = await authAxios.get(`/post/comment/by_post/${id}`, {
    params: {
      limit,
      after,
    },
  });
  return res.data
}

export const getCommentsByPostId = async (id: string) => {
  const res = await authAxios.get(`/post/comment/by_post/${id}`);
  return res.data
}