import React, { useState } from 'react';
import { Post, User } from '../../types';
import { MessageCircle, Heart, Share2, BadgeCheck, MapPin, Globe, ChevronDown, ChevronUp, Send } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Button } from '../ui/Button';
import { usePosts } from '../../context/PostContext';
import { useAuth } from '../../context/AuthContext';

export const PostCard: React.FC<{ post: Post }> = ({ post }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTranslated, setIsTranslated] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  
  const { addComment } = usePosts();
  const { user } = useAuth();

  const handleTranslate = () => {
    setIsTranslated(!isTranslated);
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim() || !user) return;
    addComment(post.id, commentText, user);
    setCommentText('');
  };

  return (
    <div className="p-3 border-b border-gray-100 hover:bg-gray-50 transition-colors">
      <div className="flex gap-2">
        <div className="flex-shrink-0">
          <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-600 overflow-hidden text-sm">
             {post.user.avatarUrl ? (
                 <img src={post.user.avatarUrl} alt={post.user.name} className="w-full h-full object-cover" />
             ) : (
                 post.user.name[0]
             )}
          </div>
        </div>
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center flex-wrap gap-1 mb-0.5">
            <span className="font-bold text-sm text-gray-900 truncate">{post.user.name}</span>
            {['verified', 'admin'].includes(post.user.role) && (
              <BadgeCheck className="w-3.5 h-3.5 text-blue-500" fill="currentColor" color="white" />
            )}
            <span className="text-gray-400 text-xs ml-0.5 truncate">{post.user.handle}</span>
            <span className="text-gray-300 text-[10px] mx-1">•</span>
            <span className="text-gray-400 text-[10px]">
              {formatDistanceToNow(new Date(post.timestamp), { addSuffix: true })}
            </span>
          </div>
          
          {/* Metadata */}
          <div className="flex items-center gap-2 mb-1.5">
             <span className="text-[9px] font-bold text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded-full uppercase tracking-wide">
                {post.category}
             </span>
             <div className="flex items-center text-gray-400 text-[10px]">
                <MapPin className="w-2.5 h-2.5 mr-0.5" />
                <span>{post.region === 'SA' ? 'Riyadh, SA' : post.region}</span>
             </div>
             {post.type === 'friends' && (
               <span className="text-[9px] text-green-600 bg-green-50 px-1.5 py-0.5 rounded-full">Friends Only</span>
             )}
          </div>

          {/* Content */}
          <div className="relative mb-2">
            <p className={`text-sm leading-snug text-gray-900 whitespace-pre-wrap ${!isExpanded ? 'line-clamp-2' : ''}`}>
              {isTranslated ? `[Translated] ${post.content} (This is a mock translation)` : post.content}
            </p>
            {post.content.length > 100 && (
                <button 
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="text-xs text-blue-500 font-medium mt-0.5 hover:underline"
                >
                    {isExpanded ? 'Show less' : 'Show more'}
                </button>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between text-gray-500 max-w-sm mt-2">
            <button 
                onClick={() => setShowComments(!showComments)}
                className="flex items-center gap-1.5 hover:text-blue-500 transition-colors group p-1 -ml-1"
            >
              <MessageCircle className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
              <span className="text-xs">{post.commentsCount}</span>
            </button>
            <button className="flex items-center gap-1.5 hover:text-red-500 transition-colors group p-1">
              <Heart className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
              <span className="text-xs">{post.likes}</span>
            </button>
            <button onClick={handleTranslate} className="flex items-center gap-1.5 hover:text-purple-500 transition-colors group p-1">
              <Globe className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
              <span className="text-[10px] font-medium">{isTranslated ? 'Original' : 'Translate'}</span>
            </button>
            <button className="flex items-center gap-1.5 hover:text-green-500 transition-colors group p-1">
              <Share2 className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
            </button>
          </div>

          {/* Comments Section */}
          {showComments && (
              <div className="mt-3 bg-gray-50 rounded-lg p-3">
                  {post.comments.length > 0 ? (
                      <div className="space-y-3 mb-3">
                          {post.comments.map(comment => (
                              <CommentItem key={comment.id} comment={comment} />
                          ))}
                      </div>
                  ) : (
                      <p className="text-xs text-gray-400 text-center py-2">No comments yet.</p>
                  )}
                  
                  {user && (
                      <form onSubmit={handleCommentSubmit} className="flex gap-2">
                          <input 
                              type="text" 
                              value={commentText}
                              onChange={(e) => setCommentText(e.target.value)}
                              placeholder="Add a comment..."
                              className="flex-1 text-xs bg-white border border-gray-200 rounded-full px-3 py-1.5 focus:outline-none focus:border-black"
                          />
                          <button type="submit" disabled={!commentText.trim()} className="text-black disabled:text-gray-300">
                              <Send className="w-4 h-4" />
                          </button>
                      </form>
                  )}
              </div>
          )}
        </div>
      </div>
    </div>
  );
};

const CommentItem: React.FC<{ comment: any }> = ({ comment }) => {
    const [translated, setTranslated] = useState(false);
    
    return (
        <div className="flex gap-2">
            <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-[10px] font-bold text-gray-600 flex-shrink-0">
                {comment.userName[0]}
            </div>
            <div className="flex-1">
                <div className="flex items-center gap-2">
                    <span className="text-xs font-bold">{comment.userName}</span>
                    <span className="text-[10px] text-gray-400">{formatDistanceToNow(new Date(comment.timestamp))} ago</span>
                </div>
                <p className="text-xs text-gray-800 mt-0.5">
                    {translated ? `[Translated] ${comment.content}` : comment.content}
                </p>
                <button 
                    onClick={() => setTranslated(!translated)}
                    className="text-[9px] text-gray-400 mt-1 hover:text-black"
                >
                    {translated ? 'Show Original' : 'Translate'}
                </button>
            </div>
        </div>
    );
};
