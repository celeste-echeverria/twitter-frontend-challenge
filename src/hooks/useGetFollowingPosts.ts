import { useEffect, useState } from "react";
import { setLength, updateFeed } from "../redux/user";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import useCustomQuery from "../api/hooks/useCustomQuery";
import { Page, Post } from "../interfaces/post.interface";
import useInfiniteCustomQuery from "../api/hooks/useInfiniteQuery";
import { LIMIT } from "../util/Constants";

export const useGetFollowingPosts = () => {
  return useInfiniteCustomQuery<Page[]>({
    endpoint: `/post/following`,
    queryKey: ['FollowingPosts'],
    params: {
      limit: LIMIT,
    }
  });
};
