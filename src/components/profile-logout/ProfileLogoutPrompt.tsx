import LogoutPrompt from "../navbar/logout-prompt/LogoutPrompt";
import {
    StyledLogoutPrompt,
    StyledProfileLogoutPromptContainer
} from "./StyledProfileLogoutPromptContainer";
import React, {useEffect, useState} from "react";
import icon from "../../assets/icon.jpg";
import {StyledP} from "../common/text";
import {StyledContainer} from "../common/Container";
import {useMe} from "../../api/services/userService";
import {User} from "../../interfaces/user.interface";


interface ProfileLogoutPromptProps {
    margin: string
    direction: string
}

const ProfileLogoutPrompt = ({margin, direction}: ProfileLogoutPromptProps) => {
    const [logoutOpen, setLogoutOpen] = useState(false);

    const {data: user, isPending, isError, error} = useMe()

    const handleLogout = () => {
        setLogoutOpen(!logoutOpen);
    };

    const handleButtonClick = (event: React.MouseEvent) => {
        event.stopPropagation();
    };

    if (isPending) {
        return <span>Loading...</span>
    }

    if (isError) {
        return <span>Error: {error.message}</span>
    }

    return (
        <StyledContainer
            maxHeight={"48px"}
            flexDirection={"row"}
            className={'profile-info'}
            alignItems={'center'}
            gap={'8px'}
            onClick={handleLogout}
            cursor={'pointer'}
        >
            <StyledProfileLogoutPromptContainer direction={direction}>
                <img src={user?.profilePicture ?? icon} className="icon" alt="Icon"/>
                {logoutOpen &&
                    <StyledLogoutPrompt margin={margin} onClick={(event) => handleButtonClick(event)}>
                        <LogoutPrompt show={logoutOpen}/>
                    </StyledLogoutPrompt>
                }
            </StyledProfileLogoutPromptContainer>
            <StyledContainer padding={"4px 0"} gap={"4px"} className={'user-info'}>
                <StyledP primary>{user?.name}</StyledP>
                <StyledP primary={false}>{`@${user?.username}`}</StyledP>
            </StyledContainer>
        </StyledContainer>
    )
}

export default ProfileLogoutPrompt