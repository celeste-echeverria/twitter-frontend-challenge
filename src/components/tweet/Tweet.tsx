import React, {useEffect, useState} from "react";
import {StyledTweetContainer} from "./TweetContainer";
import AuthorData from "./user-post-data/AuthorData";
import type {Author} from "../../interfaces/user.interface";
import type {Post} from "../../interfaces/post.interface";
import {StyledReactionsContainer} from "./ReactionsContainer";
import Reaction from "./reaction/Reaction";
import {getPostById} from '../../api/services/postService'
import {IconType} from "../icon/Icon";
import {StyledContainer} from "../common/Container";
import ThreeDots from "../common/ThreeDots";
import DeletePostModal from "./delete-post-modal/DeletePostModal";
import ImageContainer from "./tweet-image/ImageContainer";
import CommentModal from "../comment/comment-modal/CommentModal";
import {useNavigate} from "react-router-dom";
import { useGetMe } from "../../hooks/useGetMe";
import { useCreateReaction } from "../../hooks/useCreateReaction";

interface TweetProps {
  post: Post;
}

const Tweet = ({post}: TweetProps) => {
  const [actualPost, setActualPost] = useState<Post>(post);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showCommentModal, setShowCommentModal] = useState<boolean>(false);
  const navigate = useNavigate();

  const {mutate: createReaction} = useCreateReaction({
    postId: post.id
    //onerror, onsuccess
  });

  const {user, userIsLoading, userIsError, userError} = useGetMe()

  const getCountByType = (type: string): number => {
    return actualPost?.reactions?.filter((r) => r.type === type).length ?? 0;
  };

  const handleReaction = async (type: string) => {
    createReaction({reactionType: type});
  };

  const hasReactedByType = (type: string): boolean => {
    if (actualPost.reactions) {
      return actualPost.reactions.some(
          (r) => r.type === type && r.userId === user?.id
      );
    }
    return false
  };

  return (
      <StyledTweetContainer>
        <StyledContainer
            style={{width: "100%"}}
            flexDirection={"row"}
            alignItems={"center"}
            justifyContent={"center"}
            maxHeight={"48px"}
        >
          <AuthorData
              id={post.author.id}
              name={post.author.name ?? "Name"}
              username={post.author.username}
              createdAt={post.createdAt}
              profilePicture={post.author.profilePicture}
          />
          {post.authorId === user?.id && (
              <>
                <DeletePostModal
                    show={showDeleteModal}
                    id={post.id}
                    onClose={() => {
                      setShowDeleteModal(false);
                    }}
                />
                <ThreeDots
                    onClick={() => {
                      setShowDeleteModal(!showDeleteModal);
                    }}
                />
              </>
          )}
        </StyledContainer>
        <StyledContainer onClick={() => navigate(`/post/${post.id}`)}>
          <p>{post.content}</p>
        </StyledContainer>
        {post.images && post.images!.length > 0 && (
            <StyledContainer padding={"0 0 0 10%"}>
              <ImageContainer images={post.images}/>
            </StyledContainer>
        )}
        <StyledReactionsContainer>
          <Reaction
              img={IconType.CHAT}
              count={actualPost?.comments?.length}
              reactionFunction={() =>
                  window.innerWidth > 600
                      ? setShowCommentModal(true)
                      : navigate(`/compose/comment/${post.id}`)
              }
              increment={0}
              reacted={false}
          />
          <Reaction
              img={IconType.RETWEET}
              count={getCountByType("Retweet")}
              reactionFunction={() => handleReaction("Retweet")}
              increment={1}
              reacted={hasReactedByType("Retweet")}
          />
          <Reaction
              img={IconType.LIKE}
              count={getCountByType("Like")}
              reactionFunction={() => handleReaction("Like")}
              increment={1}
              reacted={hasReactedByType("Like")}
          />
        </StyledReactionsContainer>
        <CommentModal
            show={showCommentModal}
            post={post}
            onClose={() => setShowCommentModal(false)}
        />
      </StyledTweetContainer>
  );
};

export default Tweet;
