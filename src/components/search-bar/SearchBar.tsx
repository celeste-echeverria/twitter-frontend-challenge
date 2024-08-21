import React, { ChangeEvent, useRef, useState } from "react";
import SearchResultModal from "./search-result-modal/SearchResultModal";
import { Author } from "../../interfaces/user.interface";
import { searchUsers } from "../../api/services/userService";
import { useTranslation } from "react-i18next";
import { StyledSearchBarContainer } from "./SearchBarContainer";
import { StyledSearchBarInput } from "./SearchBarInput";

export const SearchBar = () => {
  const [results, setResults] = useState<Author[]>([]);
  const [query, setQuery] = useState<string>("");
  let debounceTimer: NodeJS.Timeout;
  const { t } = useTranslation();
  const abortController = useRef<AbortController | null>(null);


  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputQuery = e.target.value;

    setQuery(inputQuery);
    const newAbortController = new AbortController();
    abortController.current = newAbortController;

    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(async () => {
      try {
        setResults(await searchUsers(inputQuery, 4, 0, newAbortController.signal));
      } catch (error) {
        console.log(error);
      }
    }, 300);
  };

  return (
    <StyledSearchBarContainer>
      <StyledSearchBarInput
        onChange={handleChange}
        value={query}
        placeholder={t("placeholder.search")}
      />
      <SearchResultModal show={query.length > 0} results={results} />
    </StyledSearchBarContainer>
  );
};
