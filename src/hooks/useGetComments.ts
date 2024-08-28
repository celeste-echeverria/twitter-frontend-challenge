import { useEffect, useState } from "react";
import { setLength, updateFeed } from "../redux/user";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import useCustomQuery from "../api/hooks/useCustomQuery";
import { Post } from "../interfaces/post.interface";

interface UseGetCommentsProps {
  postId: string;
}

export const useGetComments = ({ postId }: UseGetCommentsProps) => {
  const posts = useAppSelector((state) => state.user.feed);
  const dispatch = useAppDispatch();

  const { data, isLoading, isError, error } = useCustomQuery<Post[]>({
    path: `/post/comments/by_post/${postId}`,
    queryKey: [`postComments${postId}`]
  })

  useEffect(() => {
    if(data){
      const updatedPosts = Array.from(new Set([...posts, ...data])).filter(
        (post) => post.parentId === postId
      );
      dispatch(updateFeed(updatedPosts));
      dispatch(setLength(updatedPosts.length));
    };
  }, [data, postId, posts]);

  return { posts, isLoading, isError, error};
};
