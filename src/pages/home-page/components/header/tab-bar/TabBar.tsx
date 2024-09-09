import React, { useState } from "react";
import Tab from "./tab/Tab";
import { setQuery, updateFeed } from "../../../../../redux/user";
import { getPosts } from "../../../../../api/services/postService";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "../../../../../redux/hooks";
import { StyledTabBarContainer } from "./TabBarContainer";
import { useFeedContext } from "../../../FeedContext";

const TabBar = () => {
  const { selectedFeed, setSelectedFeed } = useFeedContext();

  const { t } = useTranslation();

  return (
    <>
      <StyledTabBarContainer>
        <Tab
          active={selectedFeed === 'forYou'}
          text={t("header.for-you")}
          onClick={() => setSelectedFeed('forYou')} // Cambia el estado al feed de "For You"
        />
        <Tab
          active={selectedFeed === 'following'}
          text={t("header.following")}
          onClick={() => setSelectedFeed('following')} // Cambia el estado al feed de "Following"
        />
      </StyledTabBarContainer>
    </>
  );
};

export default TabBar;
