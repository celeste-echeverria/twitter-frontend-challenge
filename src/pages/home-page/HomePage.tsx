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

const HomePage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const query = useAppSelector((state) => state.user.query);

  const {posts, postsIsLoading, postsIsError, postsError} = useGetFeed()

  const handleSetUser = async () => {
    try {
      if(posts)
      dispatch(updateFeed(posts));
    } catch (e) {
      console.log('error in home page handlesetuser', e);
      //navigate("/sign-in");
    }
  };

  useEffect(() => {
    handleSetUser().then();
  }, []);

  return (
    <>
      <ContentContainer />
      <StyledUserSuggestionContainer>
        <SearchBar />
        <SuggestionBox />
      </StyledUserSuggestionContainer>
    </>
  );
};

export default HomePage;
