import {Post} from './post.interface'

export interface Author {
    id: string;
    name?: string;
    username: string;
    profilePicture?: string;
    private: boolean;
    createdAt: Date;
    followers: Author[];
    following: Author[];
    posts: Post[];
}
  
export interface UserView {
    id: string
    name: string | null
    username: string
    profilePicture: string | null
}