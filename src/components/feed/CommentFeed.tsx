import React from "react";
import Feed from "./Feed";
import { useGetComments } from "../../hooks/useGetComments";

interface CommentFeedProps {
  postId: string;
}
const CommentFeed = ({ postId }: CommentFeedProps) => {
  const { posts, isLoading, isError, error } = useGetComments({
    postId,
  });

  return (
    <>
      <Feed posts={posts} loading={isLoading} error={error} />
    </>
  );
};
export default CommentFeed;
