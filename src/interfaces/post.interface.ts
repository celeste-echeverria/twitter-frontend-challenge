import {Author} from './user.interface'
import {Reaction} from './reaction.interface'

export interface PostData {
    content: string;
    parentId?: string;
    images?: File[];
}
  
export interface Post {
    id: string;
    content: string;
    parentId?: string;
    images?: string[];
    createdAt: Date;
    authorId: string;
    author: Author;
    reactions: Reaction[];
    comments: Post[];

}

export interface ExtendedPost extends Post {
    qtyComments: number
    qtyLikes: number
    qtyRetweets: number
}
  
export type TPage = {
    hasMore: boolean,
    nextCursor: string | null,
    posts: Post[];
}
export interface Page {
    hasMore: boolean,
    nextCursor: string | null,
    posts: ExtendedPost[];
}