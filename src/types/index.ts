export type UserRole = 'standard' | 'verified' | 'admin'; // Removed premium

export interface SocialLinks {
  twitter?: string;
  instagram?: string;
  website?: string;
}

export interface User {
  id: string;
  name: string;
  handle: string;
  role: UserRole;
  region: string;
  avatarUrl?: string;
  bio?: string;
  socialLinks?: SocialLinks;
  lastPublicPostDate?: string; // ISO Date string for the 24h limit
}

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  content: string;
  timestamp: string;
}

export type PostType = 'public' | 'friends';

export interface Post {
  id: string;
  userId: string;
  user: User;
  content: string;
  category: string;
  timestamp: string;
  likes: number;
  commentsCount: number;
  comments: Comment[];
  region: string;
  type: PostType; // New field to distinguish public vs friends posts
}

export const CATEGORIES = ['General', 'Literature', 'Cinema', 'Design', 'Programming', 'Science'];
