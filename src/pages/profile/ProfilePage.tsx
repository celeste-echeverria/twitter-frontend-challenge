import React, {useEffect, useState} from "react";
import ProfileInfo from "./ProfileInfo";
import {useNavigate, useParams} from "react-router-dom";
import Modal from "../../components/modal/Modal";
import {useTranslation} from "react-i18next";
import {Author} from "../../interfaces/user.interface";
import {ButtonType} from "../../components/button/StyledButton";
import {getProfile, deleteProfile, getProfileView} from "../../api/services/userService";
import {followUser, unfollowUser} from "../../api/services/followService";
import Button from "../../components/button/Button";
import ProfileFeed from "../../components/feed/ProfileFeed";
import {StyledContainer} from "../../components/common/Container";
import {StyledH5} from "../../components/common/text";
import { useGetMe } from "../../hooks/useGetMe";
import { useGetUserProfile } from "../../hooks/useGetUserProfile";
import { useFollowUser } from "../../hooks/useFollowUser";
import { Follow } from "../../interfaces/follow.interface";
import { useUnfollowUser } from "../../hooks/useUnfollowUser";

const ProfilePage = () => {
  const [following, setFollowing] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalValues, setModalValues] = useState({
    text: "",
    title: "",
    type: ButtonType.DEFAULT,
    buttonText: "",
  });

  const navigate = useNavigate();
  const id = useParams().id;
  const {t} = useTranslation();

  const {user, userIsLoading} = useGetMe()
  const {profile, profileIsLoading} = useGetUserProfile(id)

  const {mutate: followUser, isPending: followIsPending} = useFollowUser({
    userId: profile?.id,
    onError: () => {
      //toast
      console.log('errorrrrrr')
    },
    onSuccess: () => {
      setFollowing(true)
    }
  })

  const {mutate: unfollowUser, isPending: unfollowIsPending} = useUnfollowUser({
    userId: profile?.id,
    onError: () => {
      //toast
      console.log('errorrrrrr')
    },
    onSuccess: () => {
      setFollowing(false)}
  })

  console.log('profile is', profile)
  console.log('user is', user)

  const handleFollow = (event: any) => {
    event.preventDefault();
    followUser({userId: profile.id})
  }

  //If it's the user's profile, show delete button. If not, show follow button or unfollow button
  const handleButtonType = (): { component: ButtonType; text: string } => {
    if (profile?.id === user?.id)
      return {component: ButtonType.DELETE, text: t("buttons.delete")};
    if (profile.isFollowedByActiveUser)
      return {component: ButtonType.OUTLINED, text: t("buttons.unfollow")};
    else return {component: ButtonType.FOLLOW, text: t("buttons.follow")};
  };

  //If it's the user's profile, deletes the profile and redirects to sign in.
  //If not, unfollows the user and refetches the profile data
  const handleSubmit = async () => {
    if (profile?.id === user?.id) {
      deleteProfile().then(() => {
        localStorage.removeItem("token");
        navigate("/sign-in");
      });
    } else {
      await unfollowUser(profile!.id)
      setFollowing(false);
      setShowModal(false);
    }
  };
  
  const handleButtonAction = async () => {
    if (profile?.id === user?.id) {
      setShowModal(true);
      setModalValues({
        title: t("modal-title.delete-account"),
        text: t("modal-content.delete-account"),
        type: ButtonType.DELETE,
        buttonText: t("buttons.delete"),
      });
    } else {
      if (following) {
        setShowModal(true);
        setModalValues({
          text: t("modal-content.unfollow"),
          title: `${t("modal-title.unfollow")} @${profile?.username}?`,
          type: ButtonType.FOLLOW,
          buttonText: t("buttons.unfollow"),
        });
      } else {
        await followUser({userId: profile.id})
        setFollowing(true);
      }
    }
  };


  return (
      <>
        <StyledContainer
            maxHeight={"100vh"}
            borderRight={"1px solid #ebeef0"}
            maxWidth={'600px'}
        >
          {profile && (
              <>
                <StyledContainer
                    borderBottom={"1px solid #ebeef0"}
                    maxHeight={"212px"}
                    padding={"16px"}
                >
                  <StyledContainer
                      alignItems={"center"}
                      padding={"24px 0 0 0"}
                      flexDirection={"row"}
                  >
                    <ProfileInfo
                        name={profile!.name!}
                        username={profile!.username}
                        profilePicture={profile!.profilePicture}
                    />
                    <Button
                        buttonType={handleButtonType().component}
                        size={"100px"}
                        onClick={handleButtonAction}
                        text={handleButtonType().text}
                    />
                  </StyledContainer>
                </StyledContainer>
                <StyledContainer width={"100%"}>
                  {profile.followers ? (
                      <ProfileFeed/>
                  ) : (
                      /* TODO: revisar por que aca decia Private Account */
                      <StyledH5>No followers</StyledH5>
                  )}
                </StyledContainer>
                <Modal
                    show={showModal}
                    text={modalValues.text}
                    title={modalValues.title}
                    acceptButton={
                      <Button
                          buttonType={modalValues.type}
                          text={modalValues.buttonText}
                          size={"MEDIUM"}
                          onClick={handleSubmit}
                      />
                    }
                    onClose={() => {
                      setShowModal(false);
                    }}
                />
              </>
          )}
        </StyledContainer>
      </>
  );
};

export default ProfilePage;
