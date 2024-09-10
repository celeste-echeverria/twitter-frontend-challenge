import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { Author, UserView } from "../../interfaces/user.interface";
import { searchUsers } from "../../api/services/userService";
import { useTranslation } from "react-i18next";
import { StyledSearchBarContainer } from "./SearchBarContainer";
import { StyledSearchBarInput } from "./SearchBarInput";
import { useGetSearchUsers } from "../../hooks/useGetSearchUsers";
import { StyledContainer } from "../common/Container";
import { StyledSearchResultModalContainer } from "./search-result-modal/SearchResultModalContainer";
import UserDataBox from "../user-data-box/UserDataBox";
import Loader from "../loader/Loader";
import {QueryClient} from '@tanstack/react-query'
import useDebounce from "../../hooks/useDebounce";

export const SearchBar = () => {
  const [showResultsModal, setShowResultsModal] = useState<boolean>(false);
  const [results, setResults] = useState<UserView[]>([]);
  const [query, setQuery] = useState<string>("");
  const debouncedSearch = useDebounce(query.trim(), 500);
  const { t } = useTranslation();

  const {data: users, isLoading: searchIsLoading} = useGetSearchUsers({query: debouncedSearch});

  useEffect(() => {
    if (users) {
      setResults(users);
    }
  }, [users]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <StyledSearchBarContainer>
      <StyledSearchBarInput
        onChange={handleChange}
        value={query}
        placeholder={t("placeholder.search")}
      />
      <StyledContainer style={{ width: "100%" }}>
          {query.trim() && 
            <StyledSearchResultModalContainer>
              {searchIsLoading && <Loader />}
              {(results && results.length == 0 && !searchIsLoading && <div>No users found</div>)}
              {
                results.map((author) => (
                  <UserDataBox
                    key={"search-result-" + author.id}
                    username={author.username}
                    name={author.name!}
                    id={author.id}
                    profilePicture={author.profilePicture!}
                  />
                ))
              }
            </StyledSearchResultModalContainer>
          }
        </StyledContainer>
    </StyledSearchBarContainer>
  );
};
