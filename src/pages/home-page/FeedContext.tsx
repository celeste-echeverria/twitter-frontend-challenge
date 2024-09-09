import React, { createContext, useContext, useState, ReactNode } from 'react';

type FeedContextType = {
  selectedFeed: 'forYou' | 'following';
  setSelectedFeed: (feed: 'forYou' | 'following') => void;
};

const FeedContext = createContext<FeedContextType | undefined>(undefined);

export const useFeedContext = () => {
  const context = useContext(FeedContext);
  if (!context) {
    throw new Error('useFeedContext must be used within a FeedProvider');
  }
  return context;
};

export const FeedProvider = ({ children }: { children: ReactNode }) => {
  const [selectedFeed, setSelectedFeed] = useState<'forYou' | 'following'>('forYou');

  return (
    <FeedContext.Provider value={{ selectedFeed, setSelectedFeed }}>
      {children}
    </FeedContext.Provider>
  );
};
