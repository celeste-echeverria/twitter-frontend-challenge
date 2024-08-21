import React, { useState, useEffect } from "react";
import { StyledH5 } from "../../components/common/text";
import { StyledContainer } from "../../components/common/Container";
import CommentFeed from "../../components/feed/CommentFeed";
import Loader from "../../components/loader/Loader";
import TweetBox from "../../components/tweet-box/TweetBox";
import Tweet from "../../components/tweet/Tweet";
import { StyledFeedContainer } from "../home-page/components/contentContainer/FeedContainer";
import { getPostById } from "../../api/services/postService";
import { Post } from "../../interfaces/post.interface";

const PostPage: React.FC = () => {

    const [postId, setPostId] = useState<string>(window.location.href.split("/")[4])
    const [post, setPost] = useState<Post | undefined>(undefined)
   
    const fetchPost = async () => {
      try {
          setPost(await getPostById(postId));
      } catch (error) {
          console.log(error);
      }
    };
    
    useEffect(() => {
        fetchPost();
    }, [postId]);
    
    return (
        <StyledContainer borderRight={"1px solid #ebeef0"}>
          <StyledContainer
            padding={"16px"}
            borderBottom={"1px solid #ebeef0"}
            maxHeight={"53px"}
          >
            <StyledH5>Tweet</StyledH5>
          </StyledContainer>
          <StyledFeedContainer>
            {post ? (
              <>
                <Tweet post={post} />
                <StyledContainer
                  borderBottom={"1px solid #ebeef0"}
                  padding={"16px"}
                >
                  <TweetBox parentId={postId} />
                </StyledContainer>
  
                <StyledContainer minHeight={"53.5vh"}>
                  <CommentFeed postId={postId} />
                </StyledContainer>
              </>
            ) : (
              <StyledContainer justifyContent={"center"} alignItems={"center"}>
                <Loader />
              </StyledContainer>
            )}
          </StyledFeedContainer>
        </StyledContainer>
    );

}

export default PostPage