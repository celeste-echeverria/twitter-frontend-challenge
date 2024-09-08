import React, { useEffect, useState } from "react";
import FollowUserBox from "../../../../components/follow-user/FollowUserBox";
import { getRecommendedUsers } from "../../../../api/services/userService";
import { useTranslation } from "react-i18next";
import { Author } from "../../../../interfaces/user.interface";
import { StyledSuggestionBoxContainer } from "./SuggestionBoxContainer";
import { useGetRecommendations } from "../../../../hooks/useGetRecommendations";

const SuggestionBox = () => {
  const { t } = useTranslation();

  const { users, isLoading, isError, error } = useGetRecommendations({page: 0});

  return (
    <StyledSuggestionBoxContainer>
      <h6>{t("suggestion.who-to-follow")}</h6>
      {users.length > 0 ? (
        users
          .filter((value, index, array) => {
            return array.indexOf(value) === index;
          })
          .slice(0, 5)
          .map((user) => (
            <FollowUserBox
              key={user.id}
              id={user.id}
              name={user.name}
              username={user.username}
              profilePicture={user.profilePicture}
            />
          ))
      ) : (
        <p>{t("suggestion.no-recommendations")}</p>
      )}
      {users.length > 5 && (
        <a href="/recommendations">{t("suggestion.show-more")}</a>
      )}
    </StyledSuggestionBoxContainer>
  );
};

export default SuggestionBox;
