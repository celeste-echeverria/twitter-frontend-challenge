import { useNavigate, useParams } from 'react-router-dom';
import { StyledContainer } from '../../components/common/Container';
import { ChatContainer, ChatHeader, UserDetails, UserName, ChatBody, MessageInputContainer, MessageInput, SendMessageButton, UserUsername } from './components/ChatComponents';
import { useGetUserProfile } from '../../hooks/useGetUserProfile';
import Loader from '../../components/loader/Loader';
import Icon from "../../assets/icon.jpg";
import Avatar from '../../components/common/avatar/Avatar';
import { useGetChat } from '../../hooks/useGetChat';
import { useEffect, useRef, useState } from 'react';
import { useSendMessage } from '../../hooks/useSendMessage';
import { useQueryClient } from '@tanstack/react-query';
import { Socket, io } from "socket.io-client";
import { Icon as IconObj, IconType } from '../../components/icon/Icon';


const ChatPage = () => {
    const id = useParams().id;
    const navigate = useNavigate()
    const [message, setMessage] = useState('');
    const queryClient = useQueryClient(); 
    const messageEndRef = useRef<HTMLDivElement | null>(null);

    const {chatHistory, chatHistoryIsLoading, chatHistoryIsError, chatHistoryError} = useGetChat({userId: id})
    const {mutate: saveMessage, isError: saveMessageIsError} = useSendMessage({recipientId: id ?? ''})

    const {profile, profileIsLoading} = useGetUserProfile(id);

    const scrollToBottom = () => {
        if (messageEndRef.current) {
            messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

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
                scrollToBottom(); 
            },
            onError: () => {
                console.error('Error sending message');
            }
        });

    };
    const goBack = () => {
        navigate('/chat'); // Redirige a /chat
    };

    useEffect(() => {
        scrollToBottom(); 
    }, [chatHistory]);


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
                 <button onClick={goBack} style={{ marginRight: '10px', background: 'none', border: 'none', cursor: 'pointer' }}>
                    <svg
                        fill="currentColor"
                        viewBox="0 0 16 16"
                        height="1em"
                        width="1em"
                    >
                        <path
                            fillRule="evenodd"
                            d="M1.146 4.854a.5.5 0 010-.708l4-4a.5.5 0 11.708.708L2.707 4H12.5A2.5 2.5 0 0115 6.5v8a.5.5 0 01-1 0v-8A1.5 1.5 0 0012.5 5H2.707l3.147 3.146a.5.5 0 11-.708.708l-4-4z"
                        />
                    </svg>
                 </button>
                 <Avatar
                   src={profile.profilePicture === null ? Icon : profile.profilePicture!}
                   alt={profile.name}
                   onClick={redirectToProfile}
                 />
                 <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}> {/* Reducir gap */}
                   <UserName>{profile.name}</UserName>
                   <UserUsername>@{profile.username}</UserUsername>
                 </div>
               </UserDetails>
             </ChatHeader>
                }

                <ChatBody>
                    <StyledContainer>
                        {chatHistoryIsLoading && <p>Loading messages...</p>}
                        {chatHistoryIsError && <p>Error loading messages</p>}

                        {chatHistory?.map((message: any) => (
                            <div 
                                key={message.id} 
                                style={{ 
                                    marginBottom: '10px', 
                                    display: 'flex', 
                                    justifyContent: message.senderId === id ? 'flex-start' : 'flex-end' 
                                }}
                            >
                                <div 
                                    style={{ 
                                        display: 'flex', 
                                        flexDirection: 'column', 
                                        alignItems: message.senderId === id ? 'flex-start' : 'flex-end', 
                                        maxWidth: '80%'
                                    }}
                                >
                                    <p 
                                        style={{ 
                                            textAlign: message.senderId === id ? 'right' : 'left', 
                                            wordBreak: 'break-word', 
                                            overflowWrap: 'break-word', 
                                            wordWrap: 'break-word' 
                                        }}
                                    >
                                        <strong>{message.senderId === id ? profile.name : 'You'}:</strong> {message.content}
                                    </p>
                                    <small style={{ textAlign: message.senderId === id ? 'right' : 'left' }}>
                                        {new Date(message.createdAt).toLocaleString("default", {dateStyle: "short", timeStyle: "short"})}
                                    </small>
                                </div>
                            </div>
                        ))}

                        <div ref={messageEndRef} />
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
