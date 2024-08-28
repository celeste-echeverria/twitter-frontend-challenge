import React from "react";
import Feed from "./Feed";
import { useGetFeed } from "../../hooks/useGetFeed";

const ContentFeed = () => {
  const { posts, postsIsLoading, postsIsError, postsError } = useGetFeed();

  return <Feed posts={posts} loading={postsIsLoading} error={postsError}/>;
};
export default ContentFeed;
