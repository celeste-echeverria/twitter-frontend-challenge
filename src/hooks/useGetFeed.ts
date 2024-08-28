import { useEffect, useState } from "react";
import { setLength, updateFeed } from "../redux/user";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import useCustomQuery from "../api/hooks/useCustomQuery";
import { Post } from "../interfaces/post.interface";

export const useGetFeed = () => {
  const posts = useAppSelector((state) => state.user.feed);
  const query = useAppSelector((state) => state.user.query);
  const dispatch = useAppDispatch();
  
  const { data, isLoading, isError, error } = useCustomQuery<Post[]>({
    path: `/post/${query}`,
    queryKey: [`post${query}`] 
  });

  useEffect(() => {
    if(data && data.length>0){
      const updatedPosts = Array.from(new Set([...posts, ...data]));
      dispatch(updateFeed(updatedPosts));
      dispatch(setLength(updatedPosts.length));
    }
  }, [data, query]);

  return { posts, postsIsLoading: isLoading, postsIsError: isError, postsError: error };
};
