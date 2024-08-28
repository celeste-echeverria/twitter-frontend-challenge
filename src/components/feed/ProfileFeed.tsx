import React from "react";
import Feed from "./Feed";
import { useGetProfilePosts } from "../../hooks/useGetProfilePosts";

const ProfileFeed = () => {
  const { posts, isLoading, isError, error } = useGetProfilePosts();
  
  return (
    <>
      <Feed posts={posts} loading={isLoading} />
    </>
  );
};
export default ProfileFeed;
