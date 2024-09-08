import React, { useEffect } from 'react';
import useInfiniteQuery from './../../api/hooks/useInfiniteQuery';
import useInfiniteCustomQuery from './../../api/hooks/useInfiniteQuery';
import Feed from './Feed';
import { InfiniteData } from '@tanstack/react-query'
import { Page, Post } from "../../interfaces/post.interface";
import { useGetProfilePosts } from '../../hooks/useGetProfilePosts';
import { useInView } from 'react-intersection-observer';
import Loader from '../loader/Loader';
import usePageBottom from '../../hooks/useReachBottom';

const ProfileFeed = ({ userId }: { userId: string }) => {
  const reachedBottom = usePageBottom();

  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetProfilePosts({ userId });

  
  useEffect (() => {
    if(hasNextPage) fetchNextPage();
  }, [reachedBottom]);


  return (
    <>
      <div style={{overflowY: 'auto'}}>
        {data?.pages.map((group, index: any) => {
          return <Feed posts={group.posts} loading={isLoading} key={index}/>
        })}
        <div > 
          {isFetchingNextPage 
            ? <Loader/> 
            : hasNextPage
              ? 'Load More'
              : 'Nothing more to load'
          } 
        </div>
      </div>
    </>
  );
 
};



export default ProfileFeed;
