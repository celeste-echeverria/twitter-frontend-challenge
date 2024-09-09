import React, { useEffect } from "react";
import SuggestionBox from "./components/suggestionBox/SuggestionBox";
import ContentContainer from "./components/contentContainer/ContentContainer";
import { updateFeed } from "../../redux/user";
import { SearchBar } from "../../components/search-bar/SearchBar";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { StyledUserSuggestionContainer } from "./UserSeuggestionContainer";
import { useGetFeed } from "../../hooks/useGetFeed";
import { Post } from "../../interfaces/post.interface";
import { FeedProvider } from "./FeedContext";

const HomePage = () => {
 
  return (
    <>
      <FeedProvider>
        <ContentContainer />
        <StyledUserSuggestionContainer>
          <SearchBar />
          <SuggestionBox />
        </StyledUserSuggestionContainer>
      </FeedProvider>
    </>
  );
};

export default HomePage;
