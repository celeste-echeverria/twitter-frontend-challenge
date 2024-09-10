import React, { useEffect } from "react";
import Feed from "./Feed";
import { useGetFeed } from "../../hooks/useGetFeed";
import usePageBottom from "../../hooks/useReachBottom";
import Loader from "../loader/Loader";
import { useSelector } from "react-redux";
import { useGetFollowingPosts } from "../../hooks/useGetFollowingPosts";
import { ExtendedPost } from "../../interfaces/post.interface";

const FollowingFeed = () => {
    
    const reachedBottom = usePageBottom();

    const {
        data,
        isLoading,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useGetFollowingPosts();

    useEffect (() => {
        if(hasNextPage) fetchNextPage();
    }, [reachedBottom]);

    return (
        <>
            <div style={{overflowY: 'auto'}}>
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

}

export default FollowingFeed