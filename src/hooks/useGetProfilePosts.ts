import { useEffect, useState } from "react";
import { updateFeed } from "../redux/user";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import useCustomQuery from "../api/hooks/useCustomQuery";
import { Page, Post, PostData } from "../interfaces/post.interface";
import useInfiniteCustomQuery from "../api/hooks/useInfiniteQuery";
import { LIMIT } from "../util/Constants";


export const useGetProfilePosts = ({ userId }: { userId: string }) => {
  
  return useInfiniteCustomQuery<Page[]>({
    endpoint: `/post/by_user/${userId}`,
    queryKey: ['userPosts', userId],
    params: {
      limit: LIMIT,
    }
  });
  
};
