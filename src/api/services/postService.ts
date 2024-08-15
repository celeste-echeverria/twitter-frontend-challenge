import axios from "axios";
import { url } from "../config";
import { S3Service } from "../../service/S3Service";
import { PostData } from "../types";

export const createPost = async (data: PostData) => {
  const res = await axios.post(`${url}/post`, data, {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });
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
  const res = await axios.get(`${url}/post/${query}`, {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
    params: {
      limit,
      after,
    },
  });
  if (res.status === 200) {
    return res.data;
  }
}

export const getPosts = async (query: string) => {
  const res = await axios.get(`${url}/post/${query}`, {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });
  if (res.status === 200) {
    return res.data;
  }
}

export const getPostById = async (id: string) => {
  const res = await axios.get(`${url}/post/${id}`, {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });
  if (res.status === 200) {
    return res.data;
  }
}

export const getPaginatedPostsFromProfile = async (
  limit: number,
  after: string,
  id: string
) => {
  const res = await axios.get(`${url}/post/by_user/${id}`, {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
    params: {
      limit,
      after,
    },
  });

  if (res.status === 200) {
    return res.data;
  }
}

export const getPostsFromProfile = async (id: string) => {
  const res = await axios.get(`${url}/post/by_user/${id}`, {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });

  if (res.status === 200) {
    return res.data;
  }
}

export const deletePost =  async (id: string) => {
  await axios.delete(`${url}/post/${id}`, {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });
}

export const getPaginatedCommentsByPostId = async (
  id: string,
  limit: number,
  after: string
) => {
  const res = await axios.get(`${url}/post/comment/by_post/${id}`, {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
    params: {
      limit,
      after,
    },
  });
  if (res.status === 200) {
    return res.data;
  }
}

export const getCommentsByPostId = async (id: string) => {
  const res = await axios.get(`${url}/post/comment/by_post/${id}`, {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });
  if (res.status === 200) {
    return res.data;
  }
}