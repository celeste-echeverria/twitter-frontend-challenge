import React, { useState } from "react";
import ProfileInfo from "./ProfileInfo";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "../../components/modal/Modal";
import { useTranslation } from "react-i18next";
import { ButtonType } from "../../components/button/StyledButton";
import Button from "../../components/button/Button";
import ProfileFeed from "../../components/feed/ProfileFeed";
import { StyledContainer } from "../../components/common/Container";
import { StyledH5 } from "../../components/common/text";
import { useGetMe } from "../../hooks/useGetMe";
import { useGetUserProfile } from "../../hooks/useGetUserProfile";
import { useFollowUser } from "../../hooks/useFollowUser";
import { useUnfollowUser } from "../../hooks/useUnfollowUser";
import { useQueryClient } from "@tanstack/react-query";
import { deleteProfile } from "../../api/services/userService";

const ProfilePage = () => {
  const queryClient = useQueryClient();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalValues, setModalValues] = useState({
    text: "",
    title: "",
    type: ButtonType.DEFAULT,
    buttonText: "",
  });

  const navigate = useNavigate();
  const id = useParams().id;
  const { t } = useTranslation();

  const { user, userIsLoading } = useGetMe();
  const { profile, profileIsLoading, refetch: refetchProfile } = useGetUserProfile(id);

  const { mutate: followUser, isPending: followIsPending } = useFollowUser({
    userId: profile?.id,
    onError: () => {
      console.log('Error al seguir');
    },
    onSuccess: () => {
      // Refetchear el perfil después de seguir
      refetchProfile();
    }
  });

  const { mutate: unfollowUser, isPending: unfollowIsPending } = useUnfollowUser({
    userId: profile?.id,
    onError: () => {
      console.log('Error al dejar de seguir');
    },
    onSuccess: () => {
      // Refetchear el perfil después de dejar de seguir
      refetchProfile();
    }
  });


  const handleFollow = () => {
    followUser({ userId: profile.id });
  };

  const handleUnfollow = () => {
    unfollowUser({ userId: profile.id });
  };

  const handleButtonType = (): { component: ButtonType; text: string } => {
    if (profile?.id === user?.id) {
      return { component: ButtonType.DELETE, text: t("buttons.delete") }
    }
    if (profile.followedByActiveUser) {
      return { component: ButtonType.OUTLINED, text: t("buttons.unfollow") };
    } 
    else {
      return { component: ButtonType.FOLLOW, text: t("buttons.follow") };
    }
  };

  const handleSubmit = async () => {
    if (profile?.id === user?.id) {
      // Eliminar perfil
      deleteProfile().then(() => {
        localStorage.removeItem("token");
        navigate("/sign-in");
      });
    } else {
      handleUnfollow();
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
      if (profile.followedByActiveUser) {
        setShowModal(true);
        setModalValues({
          text: t("modal-content.unfollow"),
          title: `${t("modal-title.unfollow")} @${profile?.username}?`,
          type: ButtonType.FOLLOW,
          buttonText: t("buttons.unfollow"),
        });
      } else {
        handleFollow();
      }
    }
  };

  return (
    <>
      <StyledContainer
        maxHeight={"100vh"}
        borderRight={"1px solid #ebeef0"}
        maxWidth={"600px"}
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
                  disabled={followIsPending || unfollowIsPending}
                  buttonType={handleButtonType().component}
                  size={"100px"}
                  onClick={handleButtonAction}
                  text={handleButtonType().text}
                />
              </StyledContainer>
            </StyledContainer>
            <StyledContainer width={"100%"}>
              {( profile.id === user.id || profile.followedByActiveUser) ? (
                <ProfileFeed userId={profile.id}/>
              ) : (
                <StyledH5>This account is private</StyledH5>
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
