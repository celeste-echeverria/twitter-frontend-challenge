import React, {useEffect, useState} from "react";
import Button from "../button/Button";
import {unfollowUser, followUser} from "../../api/services/followService";
import {useMe} from "../../api/services/userService";
import UserDataBox from "../user-data-box/UserDataBox";
import {useTranslation} from "react-i18next";
import {ButtonType} from "../button/StyledButton";
import "./FollowUserBox.css";
import {Author, User} from "../../interfaces/user.interface";

interface FollowUserBoxProps {
  profilePicture?: string;
  name?: string;
  username?: string;
  id: string;
}

const FollowUserBox = ({
    profilePicture,
    name,
    username,
    id,
  }: FollowUserBoxProps) => {
  const {t} = useTranslation();

  const [isFollowing, setIsFollowing] = useState<boolean | undefined>(false);

  const {data, isPending, isError, error} = useMe()
  setIsFollowing(data?.following.some((f: Author) => f.id === id))

  const handleFollow = async () => {
    if (isFollowing) {
      await unfollowUser(id);
    } else {
      await followUser(id);
    }
    setIsFollowing(!isFollowing);
  };

  if (isPending) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  return (
      <div className="box-container">
        <UserDataBox
            id={id}
            name={name!}
            profilePicture={profilePicture!}
            username={username!}
        />
        <Button
            text={isFollowing ? t("buttons.unfollow") : t("buttons.follow")}
            buttonType={isFollowing ? ButtonType.DELETE : ButtonType.FOLLOW}
            size={"SMALL"}
            onClick={handleFollow}
        />
      </div>
  );
};

export default FollowUserBox;
