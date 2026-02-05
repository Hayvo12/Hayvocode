import React, { createContext, useContext, useState } from 'react';
import { Post, User, PostType, Comment } from '../types';
import { formatISO } from 'date-fns';

interface PostContextType {
  posts: Post[];
  addPost: (content: string, category: string, user: User, type: PostType) => void;
  addComment: (postId: string, content: string, user: User) => void;
  getPost: (id: string) => Post | undefined;
}

const PostContext = createContext<PostContextType | undefined>(undefined);

// Dummy Data
const INITIAL_POSTS: Post[] = [
  {
    id: '101',
    userId: '2',
    user: { id: '2', name: 'Sarah Connor', handle: '@sarah_c', role: 'verified', region: 'US' },
    content: 'The minimalist approach to UI design is not just about removing elements, it is about emphasizing the content that matters. #Design',
    category: 'Design',
    timestamp: formatISO(new Date(Date.now() - 3600000)),
    likes: 45,
    commentsCount: 2,
    comments: [
        { id: 'c1', userId: '3', userName: 'Faisal', content: 'Totally agree!', timestamp: formatISO(new Date(Date.now() - 100000)) }
    ],
    region: 'US',
    type: 'public'
  },
  {
    id: '102',
    userId: '3',
    user: { id: '3', name: 'Faisal', handle: '@faisal_lit', role: 'standard', region: 'SA' },
    content: 'Reading old Arabic poetry reminds me of how language can be both a sword and a shield. The depth of expression is unmatched. 📚',
    category: 'Literature',
    timestamp: formatISO(new Date(Date.now() - 7200000)),
    likes: 120,
    commentsCount: 0,
    comments: [],
    region: 'SA',
    type: 'public'
  },
  {
    id: '103',
    userId: '4',
    user: { id: '4', name: 'Tech Daily', handle: '@tech_daily', role: 'standard', region: 'SA' },
    content: 'Just deployed my first React Native app! The bridge between web and mobile is getting thinner every day. #Programming',
    category: 'Programming',
    timestamp: formatISO(new Date(Date.now() - 10800000)),
    likes: 89,
    commentsCount: 0,
    comments: [],
    region: 'SA',
    type: 'public'
  }
];

export const PostProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);

  const addPost = (content: string, category: string, user: User, type: PostType) => {
    const newPost: Post = {
      id: Date.now().toString(),
      userId: user.id,
      user: user,
      content,
      category,
      timestamp: new Date().toISOString(),
      likes: 0,
      commentsCount: 0,
      comments: [],
      region: user.region,
      type
    };
    setPosts([newPost, ...posts]);
  };

  const addComment = (postId: string, content: string, user: User) => {
    setPosts(prevPosts => prevPosts.map(post => {
        if (post.id === postId) {
            const newComment: Comment = {
                id: Date.now().toString(),
                userId: user.id,
                userName: user.name,
                userAvatar: user.avatarUrl,
                content,
                timestamp: new Date().toISOString()
            };
            return {
                ...post,
                comments: [...post.comments, newComment],
                commentsCount: post.commentsCount + 1
            };
        }
        return post;
    }));
  };

  const getPost = (id: string) => posts.find(p => p.id === id);

  return (
    <PostContext.Provider value={{ posts, addPost, addComment, getPost }}>
      {children}
    </PostContext.Provider>
  );
};

export const usePosts = () => {
  const context = useContext(PostContext);
  if (context === undefined) {
    throw new Error('usePosts must be used within a PostProvider');
  }
  return context;
};
