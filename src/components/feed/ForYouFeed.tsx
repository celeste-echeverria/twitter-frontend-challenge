import React, { useEffect } from "react";
import Feed from "./Feed";
import { useGetFeed } from "../../hooks/useGetFeed";
import usePageBottom from "../../hooks/useReachBottom";
import Loader from "../loader/Loader";
import { useSelector } from "react-redux";

const ForYouFeed = () => {
  const reachedBottom = usePageBottom();

  const { 
    data, 
    isLoading, 
    fetchNextPage, 
    hasNextPage, 
    isFetchingNextPage 
  } = useGetFeed();

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
              ? <Loader/> : <></>
            } 
          </div>
        </div>
    </>
  );
};

export default ForYouFeed;
