import {Author} from './user.interface'

export interface MessageDTO {
    id: string;
    content: string;
    createdAt: Date;
    chatId: string;
    senderId: string;
    sender: Author;
}
  
export interface ChatDTO {
    id: string;
    users: Author[];
    messages: MessageDTO[];
}