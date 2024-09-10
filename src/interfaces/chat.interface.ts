import {Author, UserView} from './user.interface'

export interface Message {
    content: string;
    createdAt: Date;
    senderId: string;
}
  
export interface Room {
    id: string;
    users: UserView[];
    messages: Message[];
    createdAt: Date;
}

export interface ChatHistory {
    messages: Message[]
}