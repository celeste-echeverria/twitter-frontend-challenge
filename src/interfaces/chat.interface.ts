import {Author} from './user.interface'

export interface Message {
    content: string;
    createdAt: Date;
    senderId: string;
}
  
export interface ChatDTO {
    id: string;
    users: Author[];
    messages: Message[];
}

export interface ChatHistory {
    messages: Message[]
}