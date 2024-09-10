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
import { ToastType } from "../../components/toast/Toast";
import ToastPortal from "../../components/toast/ToastPortal";

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

  const { data: user, isLoading: userIsLoading } = useGetMe();
  const { profile, profileIsLoading } = useGetUserProfile(id);

  const { 
    mutate: followUser, 
    isPending: followIsPending, 
    isError: followIsError, error: 
    followError, 
    isSuccess: followIsSuccess 
  } = useFollowUser({
    userId: profile?.id,
    onError: () => {
      console.log('Error al seguir');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['userProfile', profile.id],
        refetchType: 'active',
    })
    }
  });

  const { 
    mutate: unfollowUser, 
    isPending: unfollowIsPending,
    isError: unfollowIsError,
    error: unfollowError,
    isSuccess: unfollowIsSuccess 
  } = useUnfollowUser({
    userId: profile?.id,
    onError: () => {
      console.log('Error al dejar de seguir');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['userProfile', profile.id],
        refetchType: 'active',
    })
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

  const handleSendMessage = () => {
    navigate(`/chat/${profile?.id}`);
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
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <Button
                    disabled={followIsPending || unfollowIsPending}
                    buttonType={handleButtonType().component}
                    size={"100px"}
                    onClick={handleButtonAction}
                    text={handleButtonType().text}
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={(profile.id === user.id) || (profile.privacy && !profile.followedByActiveUser)}
                    buttonType={ButtonType.SEND_MESSAGE}
                    text={ "Chat"}
                    size={"100px"}
                  />
                </div>
              </StyledContainer>
            </StyledContainer>
            <StyledContainer width={"100%"} style={{ textAlign: 'center' }}>
              {( profile.id === user.id || profile.followedByActiveUser || !profile.privacy) ? (
                <ProfileFeed userId={profile.id}/>
              ) : (
                <div style={{ marginTop: '10px' }}>This account is private</div>
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
      {followIsError && <ToastPortal message={followError.message} type={ToastType.ERROR} />}
      {followIsSuccess && <ToastPortal message={`Followed ${profile?.name}`} type={ToastType.SUCCESS} />} 
      {unfollowIsError && <ToastPortal message={unfollowError.message} type={ToastType.ERROR} />}
      {unfollowIsSuccess && <ToastPortal message={`Unfollowed ${profile?.name}`} type={ToastType.SUCCESS} />} 
    </>
  );
};

export default ProfilePage;
