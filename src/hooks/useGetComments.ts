import { useEffect, useState } from "react";
import { setLength, updateFeed } from "../redux/user";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {getCommentsByPostId} from '../api/services/postService'

interface UseGetCommentsProps {
  postId: string;
}

export const useGetComments = ({ postId }: UseGetCommentsProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const posts = useAppSelector((state) => state.user.feed);

  const dispatch = useAppDispatch();

  useEffect(() => {
    try {
      setLoading(true);
      setError(false);
      getCommentsByPostId(postId).then((res) => {
        const updatedPosts = Array.from(new Set([...posts, ...res])).filter(
          (post) => post.parentId === postId
        );
        dispatch(updateFeed(updatedPosts));
        dispatch(setLength(updatedPosts.length));
        setLoading(false);
      });
    } catch (e) {
      setError(true);
      console.log(e);
    }
  }, [postId]);

  return { posts, loading, error };
};
