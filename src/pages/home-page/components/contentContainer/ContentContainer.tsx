import React from "react";
import { StyledContentContainer } from "./StyledContentContainer";
import Header from "../header/Header";
import TweetBox from "../../../../components/tweet-box/TweetBox";
import { StyledFeedContainer } from "./FeedContainer";
import ForYouFeed from "../../../../components/feed/ForYouFeed";
import { StyledContainer } from "../../../../components/common/Container";
import { FeedProvider, useFeedContext } from "../../FeedContext";
import FollowingFeed from "../../../../components/feed/FollowingFeed";

const ContentContainer = () => {
  const { selectedFeed } = useFeedContext();

  return (
    <StyledContentContainer>
        <Header />
        <StyledFeedContainer>
          <StyledContainer
            width={"100%"}
            padding={"16px"}
            borderBottom={"1px solid #ebeef0"}
          >
            <TweetBox />
          </StyledContainer>
          <StyledContainer minHeight={"66vh"} width={"100%"}>
            {selectedFeed === 'forYou' ? <ForYouFeed /> : <FollowingFeed/>}
          </StyledContainer>
        </StyledFeedContainer>
    </StyledContentContainer>
  );
};

export default ContentContainer;
