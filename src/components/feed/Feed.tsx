import React from "react";
import { Post } from "../../interfaces/post.interface";
import { StyledContainer } from "../common/Container";
import Tweet from "../tweet/Tweet";
import Loader from "../loader/Loader";

interface FeedProps {
  posts: Post[];
  loading: boolean;
  error?: any
}

const Feed = ({ posts, loading }: FeedProps) => {
  return (
    <StyledContainer width={"100%"} alignItems={"center"} height={"auto"}>
      {loading && <Loader />}
      {posts.length > 0 && !loading ? (
        posts
        .filter((post, index, self) => {
          return self.findIndex((p) => p.id === post.id) === index;
        })
        .map((post: Post) => (
          <Tweet key={post.id} post={post} />
        )))
        : <></>
      }
    </StyledContainer>
  );
};

export default Feed;
