import React, { useEffect } from 'react';
import useInfiniteQuery from './../../api/hooks/useInfiniteQuery';
import useInfiniteCustomQuery from './../../api/hooks/useInfiniteQuery';
import Feed from './Feed';
import { InfiniteData } from '@tanstack/react-query'
import { useGetProfilePosts } from '../../hooks/useGetProfilePosts';
import { useInView } from 'react-intersection-observer';
import Loader from '../loader/Loader';
import usePageBottom from '../../hooks/useReachBottom';
import { ExtendedPost } from '../../interfaces/post.interface';

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
        {data?.pages[0].posts.length == 0 && <div style={{ marginTop: '10px' }}>No posts</div>}
        {data?.pages.map((group, index: any) => {
          const posts = group.posts as ExtendedPost[];
          return <Feed posts={posts} loading={isLoading} key={index}/>
        })}
        <div > 
          {isFetchingNextPage 
            ? <Loader/> : <></>
          } 
        </div>
      </div>
    </>
  );
 
};



export default ProfileFeed;
