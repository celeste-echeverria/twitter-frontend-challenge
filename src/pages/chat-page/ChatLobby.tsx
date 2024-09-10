import React, { useEffect, useState } from 'react';
import { UserView } from '../../interfaces/user.interface';
import { io, Socket } from 'socket.io-client';
import { Avatar, Header, LobbyContainer, UserInfo, UserItem, UserList, UserName, UserUsername } from './components/LobbyComponents';
import { ChatContainer, MessageContainer, MessageInput, SendButton } from './components/ChatComponents'
import icon from "../../assets/icon.jpg";
import { Message, Room } from '../../interfaces/chat.interface';
import { setChat } from '../../redux/user';
import { useGetMe } from '../../hooks/useGetMe';

const ChatLobby: React.FC = () => {
    const [users, setUsers] = useState<UserView[]>([]);
    const [socket, setSocket] = useState<Socket | null>(null);
    const [currentChatRoom, setCurrentChatRoom] = useState<Room | null>(null);
    const [newMessage, setNewMessage] = useState<string>('');
    const [messages, setMessages] = useState<Message[]>([]);


    const handleSendMessage = () => {
        if (newMessage) {
            setNewMessage(''); 
            socket?.emit('sendMessage', { content: newMessage, chatId: currentChatRoom?.id });
        }
    };

    const {data: me} = useGetMe()

    useEffect(() => {
        const url = (process.env.DEPLOYED_API_URL ?? '').replace('http', 'ws');
        const webSocket = io(url, {
        extraHeaders: {
            authorization: localStorage.getItem('token') || '',
        },
        });

        webSocket.on("connect", () => {
            console.log('connected');
            setSocket(webSocket); 
            webSocket.emit('joinChat');
        });

        webSocket.on('joinChat', (availableChats: UserView[]) => {
            console.log('available: received:', availableChats);
            if (availableChats.length === 0) {
                setUsers([]);
            } else {
                setUsers(availableChats);
            }
        });

        webSocket.on("joinRoom", (room: Room) => {
            setCurrentChatRoom(room);
            setMessages(room.messages)
        });

        webSocket.on("sendMessage", (message: Message) => {
            console.log('received:', message);
            setMessages(oldMessages => [...oldMessages, message]);
        })

        return () => {
            webSocket.disconnect(); // Limpiar la conexión del socket al desmontar el componente
        };
    }, []);

    const handleChatWithUser = (userId: string) => {
        console.log('CHATTING WITH:', userId);
        socket?.emit('joinRoom', { otherUserId: userId });
    };

    const getOtherUser = () => {
        const otherUser = currentChatRoom?.users.find((user) => user.id !== me.id);
        return (
          <Header >
            <UserUsername key={otherUser?.id}> @{otherUser?.username}</UserUsername>
          </Header>
        );
    };

    return (
        <LobbyContainer>
        {/* Parte superior: Lobby */}
        <div style={{ flex: 1, borderBottom: '1px solid lightgray' }}>
            <Header>Chat</Header>
            <UserList>
            {users.map(user => (
                <UserItem key={user.id} onClick={() => handleChatWithUser(user.id)}>
                <Avatar src={user.profilePicture as string || icon} />
                <UserInfo>
                    <UserName>{user.name}</UserName>
                    <UserUsername>@{user.username}</UserUsername>
                </UserInfo>
                </UserItem>
            ))}
            </UserList>
        </div>

        {/* Parte inferior: ChatRoom si existe */}
        {currentChatRoom && (
            <ChatContainer>
                <UserList>
                    {getOtherUser()}
                </UserList>

                <div style={{ flex: 1, overflowY: 'auto' }}>
                    {messages.map((msg: Message) => (
                        <MessageContainer isOwnMessage={msg.senderId === me.id}>
                            {msg.content}
                            <span style={{ fontSize: '0.8rem', color: 'gray' }}>{new Date(msg.createdAt).toLocaleTimeString()}</span>
                        </MessageContainer>
                    ))}
                </div>

                <div style={{ display: 'flex', padding: '10px', borderTop: '1px solid lightgray' }}>
                    <MessageInput
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type your message..."
                    />
                        <SendButton onClick={handleSendMessage} disabled={!newMessage.trim()}>
                        Send
                    </SendButton>
                </div>
            </ChatContainer>
        )}
        </LobbyContainer>
    );
};

export default ChatLobby;
