import React from 'react';
import { CATEGORIES } from '../types';
import { usePosts } from '../context/PostContext';
import { PostCard } from '../components/feed/PostCard';
import { Search } from 'lucide-react';

export const Explore = () => {
  const { posts } = usePosts();
  const [activeCategory, setActiveCategory] = React.useState('All');

  // Only show Public posts in Explore
  const publicPosts = posts.filter(p => p.type === 'public');

  const filteredPosts = activeCategory === 'All' 
    ? publicPosts 
    : publicPosts.filter(p => p.category === activeCategory);

  return (
    <div>
      <div className="p-4 sticky top-0 bg-white z-10 border-b border-gray-50">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search topics, people..." 
            className="w-full bg-gray-100 border-none rounded-full py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-black/5"
          />
        </div>
        
        {/* Fixed Horizontal Scrolling */}
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
          <button
            onClick={() => setActiveCategory('All')}
            className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium transition-colors flex-shrink-0 ${
              activeCategory === 'All' ? 'bg-black text-white' : 'bg-gray-100 text-gray-600'
            }`}
          >
            All
          </button>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium transition-colors flex-shrink-0 ${
                activeCategory === cat ? 'bg-black text-white' : 'bg-gray-100 text-gray-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div>
        {filteredPosts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};
