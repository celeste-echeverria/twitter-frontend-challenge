import { useEffect, useState } from "react";
import { setLength, updateFeed } from "../redux/user";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import useCustomQuery from "../api/hooks/useCustomQuery";
import { Page, Post } from "../interfaces/post.interface";
import useInfiniteCustomQuery from "../api/hooks/useInfiniteQuery";
import { LIMIT } from "../util/Constants";

export const useGetFeed = () => {
  return useInfiniteCustomQuery<Page[]>({
    endpoint: `/post`,
    queryKey: ['FeedPosts'],
    params: {
      limit: LIMIT,
    },
  });
};
