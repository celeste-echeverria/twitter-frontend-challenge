import { useNavigate, useParams } from 'react-router-dom';
import { StyledContainer } from '../../components/common/Container';
import { ChatContainer, ChatHeader, UserDetails, UserName, ChatBody, MessageInputContainer, MessageInput, SendMessageButton, UserUsername } from './ChatComponents';
import { useGetUserProfile } from '../../hooks/useGetUserProfile';
import Loader from '../../components/loader/Loader';
import Icon from "../../assets/icon.jpg";
import Avatar from '../../components/common/avatar/Avatar';
import { useGetChat } from '../../hooks/useGetChat';
import { useState } from 'react';
import { useSendMessage } from '../../hooks/useSendMessage';
import { useQueryClient } from '@tanstack/react-query';

const ChatPage = () => {
    const id = useParams().id;
    const navigate = useNavigate()
    const [message, setMessage] = useState('');
    const queryClient = useQueryClient(); 

    const {chatHistory, chatHistoryIsLoading, chatHistoryIsError, chatHistoryError} = useGetChat({userId: id})
    const {mutate: saveMessage, isError: saveMessageIsError} = useSendMessage({recipientId: id ?? ''})

    const {profile, profileIsLoading} = useGetUserProfile(id);

    const redirectToProfile = () => {
        console.log('navigating to profile');
        navigate(`/profile/${id}`);
    };
    const handleSendMessage = () => {
        saveMessage({ content: message }, {
            onSuccess: () => {
                if (id) {
                    queryClient.invalidateQueries({
                        queryKey: ['chatMessages', id],
                        refetchType: 'active',
                    })
                }
                setMessage(''); 
            },
            onError: () => {
                console.error('Error sending message');
            }
        });

    };

    return (
        <StyledContainer
            maxHeight={"100vh"}
            borderRight={"1px solid #ebeef0"}
            maxWidth={"600px"}
        >
            {profileIsLoading && <Loader/>}
            <ChatContainer>
                {profile &&
                <ChatHeader>
                    <UserDetails>
                    <Avatar
                        src={profile.profilePicture === null ? Icon : profile.profilePicture!}
                        alt={profile.name}
                        onClick={redirectToProfile}
                    />
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                        <UserName>{profile.name}</UserName>
                        <UserUsername>@{profile.username}</UserUsername>
                    </div>

                    </UserDetails>
                    
                </ChatHeader>
                }

                <ChatBody>
                    <StyledContainer>
                        {/* Mostrar mensajes */}
                        {chatHistoryIsLoading && <p>Loading messages...</p>}
                        {chatHistoryIsError && <p>Error loading messages</p>}

                        {chatHistory?.map((message: any) => (
                            <div key={message.id} style={{ marginBottom: '10px' }}>
                                <p><strong>{message.senderId === id ? profile?.name : 'You'}:</strong> {message.content}</p>
                                <small>{new Date(message.createdAt).toLocaleTimeString()}</small>
                            </div>
                        ))}
                    </StyledContainer>
                </ChatBody>

                <MessageInputContainer>
                    <MessageInput placeholder="Type a message..." 
                    onChange={(e) => setMessage(e.target.value)}
                    />
                    <SendMessageButton onClick={handleSendMessage}>
                        Send
                    </SendMessageButton>
                </MessageInputContainer>
            </ChatContainer>
    
        </StyledContainer>
    );
};

export default ChatPage;
