import React, { useState } from 'react';
import { usePosts } from '../context/PostContext';
import { PostCard } from '../components/feed/PostCard';
import { cn } from '../lib/utils';
import { motion } from 'framer-motion';

export const Home = () => {
  const { posts } = usePosts();
  const [feedType, setFeedType] = useState<'global' | 'local' | 'friends'>('global');

  const filteredPosts = posts.filter(post => {
    // Only Public posts in Global/Local
    if (feedType === 'global') return post.type === 'public';
    if (feedType === 'local') return post.type === 'public' && post.region === 'SA';
    
    // Friends feed shows everything from friends (including 'friends' type posts)
    if (feedType === 'friends') return false; // Mock friends logic
    
    return true;
  });

  const tabs = [
    { id: 'global', label: 'Global' },
    { id: 'local', label: 'Local (SA)' },
    { id: 'friends', label: 'Friends' },
  ] as const;

  return (
    <div>
      <header className="sticky top-0 bg-white/90 backdrop-blur-md z-10 border-b border-gray-100">
        <div className="flex justify-between items-center px-4 h-12">
          <div className="flex gap-6 w-full justify-center md:justify-start">
            {tabs.map((tab) => (
                <button 
                  key={tab.id}
                  onClick={() => setFeedType(tab.id)}
                  className={cn(
                    "font-bold text-sm relative py-3 transition-colors",
                    feedType === tab.id ? "text-black" : "text-gray-400 hover:text-gray-600"
                  )}
                >
                  {tab.label}
                  {feedType === tab.id && (
                    <motion.div layoutId="underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-black rounded-t-full" />
                  )}
                </button>
            ))}
          </div>
        </div>
      </header>

      <div className="pb-20">
        {filteredPosts.length > 0 ? (
            filteredPosts.map(post => (
            <PostCard key={post.id} post={post} />
            ))
        ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center px-4">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-2xl">
                    {feedType === 'friends' ? '👥' : '🏙️'}
                </div>
                <h3 className="font-bold text-gray-900 mb-1">No posts yet</h3>
                <p className="text-gray-500 text-sm">
                    {feedType === 'friends' 
                        ? "Connect with people to see their posts here." 
                        : "Be the first to post in your city!"}
                </p>
            </div>
        )}
      </div>
    </div>
  );
};
