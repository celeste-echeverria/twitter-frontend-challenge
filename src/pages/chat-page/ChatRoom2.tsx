import React, { useEffect, useState } from 'react';
import { UserView } from '../../interfaces/user.interface';

interface Message {
  id: string;
  chatId: string;
  senderId: string;
  content: string;
  createdAt: Date;
}
interface RoomDTO {
    id: string;
    users: UserView[]
    messages: Message[]
    createdAt: Date;
}
interface ChatRoomProps {
  roomId?: string;
  currentUser?: { id: string };
  otherUser?: { id: string };
}

const ChatRoom: React.FC<ChatRoomProps> = ({ roomId, currentUser, otherUser }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    //socket.emit('joinRoom', { otherUserId: otherUser?.id });

    // socket.on('joinRoom', (room: RoomDTO) => {
    //   console.log('Unido a la sala:', room);
    // });

    // socket.on('sendMessage', (message: Message) => {
    //   setMessages((prevMessages) => [...prevMessages, message]);
    // });

    // return () => {
    //   socket.off('sendMessage');
    //   socket.off('joinRoom');
    // };
  }, [roomId, otherUser?.id]);

  const sendMessage = () => {
    if (newMessage.trim() === '') return;

    const messageData = {
      chatId: roomId,
      content: newMessage,
    };

    // socket.emit('sendMessage', messageData);
    setNewMessage('');
  };

  return (
    <div>
      <div className="chat-window">
        {messages.map((message) => (
          <div
            key={message.id}
            className={message.senderId === currentUser?.id ? 'my-message' : 'other-message'}
          >
            <p>{message.content}</p>
          </div>
        ))}
      </div>

      <div className="message-input">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Escribe un mensaje..."
        />
        <button onClick={sendMessage}>Enviar</button>
      </div>
    </div>
  );
};

export default ChatRoom;
