import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { usePosts } from '../context/PostContext';
import { CATEGORIES, PostType } from '../types';
import { Button } from '../components/ui/Button';
import { ChevronLeft, Globe, Users, Lock } from 'lucide-react';

export const Compose = () => {
  const { user, canPostPublic, updatePublicPostDate } = useAuth();
  const { addPost } = usePosts();
  const navigate = useNavigate();
  
  const [content, setContent] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [showTypeSelector, setShowTypeSelector] = useState(false);

  const handleInitialSubmit = () => {
    if (!content.trim() || !user) return;
    setShowTypeSelector(true);
  };

  const handleFinalSubmit = (type: PostType) => {
    if (!user) return;
    
    addPost(content, category, user, type);
    
    if (type === 'public') {
        updatePublicPostDate();
    }
    
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Type Selector Modal */}
      {showTypeSelector && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end md:items-center justify-center p-4">
            <div className="bg-white rounded-2xl w-full max-w-sm p-6 animate-in slide-in-from-bottom-10 fade-in">
                <h3 className="text-lg font-bold mb-4 text-center">Who can see this?</h3>
                
                <div className="space-y-3">
                    <button 
                        onClick={() => handleFinalSubmit('public')}
                        disabled={!canPostPublic}
                        className="w-full flex items-center gap-4 p-4 rounded-xl border border-gray-200 hover:border-black transition-colors text-left disabled:opacity-50 disabled:bg-gray-50"
                    >
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                            <Globe className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-center">
                                <span className="font-bold">Public Post</span>
                                {!canPostPublic && <span className="text-[10px] text-red-500 font-bold bg-red-50 px-2 py-1 rounded-full">Limit Reached</span>}
                            </div>
                            <p className="text-xs text-gray-500">Visible to everyone in Global & Local feeds.</p>
                            <p className="text-[10px] text-gray-400 mt-1">Limit: 1 per 24 hours</p>
                        </div>
                    </button>

                    <button 
                        onClick={() => handleFinalSubmit('friends')}
                        className="w-full flex items-center gap-4 p-4 rounded-xl border border-gray-200 hover:border-black transition-colors text-left"
                    >
                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                            <Users className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                            <span className="font-bold block">Friends & Profile</span>
                            <p className="text-xs text-gray-500">Visible only to followers and on your profile.</p>
                            <p className="text-[10px] text-gray-400 mt-1">Unlimited posts</p>
                        </div>
                    </button>
                </div>

                <Button variant="ghost" className="w-full mt-4" onClick={() => setShowTypeSelector(false)}>
                    Cancel
                </Button>
            </div>
        </div>
      )}

      <header className="flex items-center justify-between p-4 border-b border-gray-100">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <Button 
          onClick={handleInitialSubmit} 
          disabled={!content.trim() || content.length > 280}
          size="sm"
        >
          Next
        </Button>
      </header>

      <div className="p-4">
        <div className="flex gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-600 flex-shrink-0">
            {user?.name[0]}
          </div>
          <textarea
            autoFocus
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's on your mind?"
            className="w-full h-40 resize-none border-none focus:ring-0 text-lg placeholder:text-gray-400 p-0 mt-2"
          />
        </div>

        <div className="border-t border-gray-100 pt-4">
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Category</label>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors border ${
                  category === cat 
                    ? "bg-black text-white border-black" 
                    : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <span className={`text-xs ${content.length > 280 ? "text-red-500" : "text-gray-400"}`}>
            {content.length}/280
          </span>
        </div>
      </div>
    </div>
  );
};
