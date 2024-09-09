import React, {useEffect, useState} from "react";
import Button from "../button/Button";
import UserDataBox from "../user-data-box/UserDataBox";
import {useTranslation} from "react-i18next";
import {ButtonType} from "../button/StyledButton";
import "./FollowUserBox.css";
import {Author} from "../../interfaces/user.interface";
import { useGetMe } from "../../hooks/useGetMe";
import { useQueryClient } from "@tanstack/react-query";
import { useFollowUser } from "../../hooks/useFollowUser";
import { useUnfollowUser } from "../../hooks/useUnfollowUser";
import { useGetUserProfile } from "../../hooks/useGetUserProfile";
import { ToastType } from "../toast/Toast";
import ToastPortal from "../toast/ToastPortal";

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
  const queryClient = useQueryClient();

  const { profile, profileIsLoading } = useGetUserProfile(id);
  const {user, userIsLoading, userIsError, userError} = useGetMe()

  const { mutate: unfollowUser, isError: unfollowIsError, error: unfollowError, isSuccess: unfollowIsSuccess } = useUnfollowUser({
    userId: id,
    onError: () => {
      console.log('Error al dejar de seguir');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['userProfile', id],
        refetchType: 'active',
      })
    }
  });

  const { mutate: followUser, isError: followIsError, error: followError, isSuccess: followIsSuccess } = useFollowUser({
    userId: id,
    onError: () => {
      console.log('Error al seguir');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['userProfile', id],
        refetchType: 'active',
      })
    }
  });

  const handleFollow = async () => {
    if (profile?.followedByActiveUser) {
      unfollowUser({ userId: id });
    } else {
      followUser({ userId: id });
    }
  };

  return (
      <div className="box-container">
        <UserDataBox
            id={id}
            name={name!}
            profilePicture={profilePicture!}
            username={username!}
        />
        <Button
            text={profile?.followedByActiveUser ? t("buttons.unfollow") : t("buttons.follow")}
            buttonType={profile?.followedByActiveUser ? ButtonType.DELETE : ButtonType.FOLLOW}
            size={"SMALL"}
            onClick={handleFollow}
        />
        {followIsError && <ToastPortal message={followError.message} type={ToastType.ERROR} />}
        {followIsSuccess && <ToastPortal message={`Followed ${profile?.name}`} type={ToastType.SUCCESS} />} 
        {unfollowIsError && <ToastPortal message={unfollowError.message} type={ToastType.ERROR} />}
        {unfollowIsSuccess && <ToastPortal message={`Unfollowed ${profile?.name}`} type={ToastType.SUCCESS} />} 
      </div>
  );
};

export default FollowUserBox;
