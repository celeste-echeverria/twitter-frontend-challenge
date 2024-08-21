export interface Reaction {
    id: string;
    type: string;
    createdAt: Date;
    userId: string;
    postId: string;
    updatedAt: Date;
    deletedAt?: Date; 
}
  