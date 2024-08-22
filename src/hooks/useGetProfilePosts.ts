import { useEffect, useState } from "react";
import { updateFeed } from "../redux/user";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import useCustomQuery from "../api/hooks/useCustomQuery";
import { Post } from "../interfaces/post.interface";

export const useGetProfilePosts = () => {
  const { id } = useParams<{ id: string }>();
  const posts = useAppSelector((state) => state.user.feed);
  const dispatch = useAppDispatch();

  const { data, isLoading, isError } = useCustomQuery<Post[]>(
    `/posts/profile/${id}`,
    ['profilePosts', id],
    true 
  );

  useEffect(() => {
    if (data) {
      const updatedPosts = Array.from(new Set([...posts, ...data])).filter(
        (post) => post.authorId === id
      );
      dispatch(updateFeed(updatedPosts));
    }
  }, [data, id, posts, dispatch]);

  return { posts, loading: isLoading, error: isError };
};
