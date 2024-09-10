import React, {useEffect, useState} from "react";
import {StyledTweetContainer} from "./TweetContainer";
import AuthorData from "./user-post-data/AuthorData";
import type {Author} from "../../interfaces/user.interface";
import type {ExtendedPost, Post} from "../../interfaces/post.interface";
import {StyledReactionsContainer} from "./ReactionsContainer";
import type {Reaction as ReactionType} from "../../interfaces/reaction.interface";
import {IconType} from "../icon/Icon";
import {StyledContainer} from "../common/Container";
import ThreeDots from "../common/ThreeDots";
import DeletePostModal from "./delete-post-modal/DeletePostModal";
import ImageContainer from "./tweet-image/ImageContainer";
import CommentModal from "../comment/comment-modal/CommentModal";
import {useNavigate} from "react-router-dom";
import { useGetMe } from "../../hooks/useGetMe";
import { useCreateReaction } from "../../hooks/useCreateReaction";
import { useGetPost } from "../../hooks/useGetPost";
import { useQueryClient } from "@tanstack/react-query";
import { ReactionData, useDeleteReaction } from "../../hooks/useDeleteReaction";
import Reaction from "./reaction/Reaction";

interface TweetProps {
  actualPost: ExtendedPost;
}

const Tweet = ({actualPost}: TweetProps) => {
  const queryClient = useQueryClient();
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showCommentModal, setShowCommentModal] = useState<boolean>(false);
  const [postReactions, setPostReactions] = useState<ReactionType[]>(actualPost.reactions.map((r) => Object.assign({} as ReactionType, r)));
  const navigate = useNavigate();

  const {
    mutate: createReaction, 
    data: newReaction, 
    isPending: createReactionIsPending
  } = useCreateReaction({
    postId: actualPost.id,
  });

  useEffect(() => {
    if(newReaction) {
      setPostReactions([newReaction, ...postReactions])
    }
  }, [newReaction])

  const {
    mutate: deleteReaction, 
    isSuccess: deleteReactionIsSuccess, 
    variables: deleteReactionVariables,
    isPending: deleteReactionIsPending
  } = useDeleteReaction({});

  useEffect(() => {
    if(deleteReactionIsSuccess) {
      setPostReactions((prevReactions) => {
        let filteredReactions = []
        for (const reaction of prevReactions) {
          if (reaction.id != deleteReactionVariables?.reactionId) {
            filteredReactions.push(reaction)
          }
        }
        return filteredReactions
      });

    }
  }, [deleteReactionIsSuccess, deleteReactionVariables])


  const {data: user, isLoading: userIsLoading, isError: userIsError, error: userError} = useGetMe()

  const getCountByType = (type: string): number => {
    return actualPost?.reactions?.filter((r) => r.type === type).length ?? 0;
  };
  
  const handleReaction = async (type: string) => {
    if(!createReactionIsPending && !deleteReactionIsPending) {
      if(hasReactedByType(type)) {
        const reactionId = actualPost.reactions?.find((r) => ((r.userId === user?.id) && r.type === type))?.id
        if(reactionId) deleteReaction({reactionId});
      }else {
        createReaction({reactionType: type});
      }
    }
  };

  const hasReactedByType = (type: string): boolean => {
    if (!postReactions) {
      return false
    }
    if(postReactions?.find((r) => ((r.userId === user?.id) && r.type === type))) {
      return true
    } else {
      return false
    }
    
  }

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
              id={actualPost.authorId}
              name={actualPost.author.name ?? "Name"}
              username={actualPost.author.username}
              createdAt={actualPost.createdAt}
              profilePicture={actualPost.author.profilePicture}
          />
          {actualPost.authorId === user?.id && (
              <>
                <DeletePostModal
                    show={showDeleteModal}
                    id={actualPost.id}
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
        <StyledContainer onClick={() => navigate(`/post/${actualPost.id}`)}>
          <p>{actualPost.content}</p>
        </StyledContainer>
        {actualPost.images && actualPost.images!.length > 0 && (
            <StyledContainer padding={"0 0 0 10%"}>
              <ImageContainer images={actualPost.images}/>
            </StyledContainer>
        )}
        <StyledReactionsContainer>
          <Reaction
              img={IconType.CHAT}
              count={actualPost?.comments?.length}
              reactionFunction={() =>
                  window.innerWidth > 600
                      ? setShowCommentModal(true)
                      : navigate(`/compose/comment/${actualPost.id}`)
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
            post={actualPost}
            onClose={() => setShowCommentModal(false)}
        />
      </StyledTweetContainer>
  );
};

export default Tweet;
