import React, { useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';
import { Settings, MapPin, Calendar, BadgeCheck, Camera, Link as LinkIcon, Twitter, Instagram, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { usePosts } from '../context/PostContext';
import { PostCard } from '../components/feed/PostCard';

export const Profile = () => {
  const { user, login, updateProfileImage } = useAuth();
  const { posts } = usePosts();
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!user) return null;

  const userPosts = posts.filter(p => p.userId === user.id);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      updateProfileImage(imageUrl);
    }
  };

  return (
    <div>
      <div className="p-4 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10">
        <h1 className="font-bold text-lg">{user.name}</h1>
        <Button variant="ghost" size="sm" className="px-2">
          <Settings className="w-5 h-5" />
        </Button>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-4">
          <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
            <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border-4 border-white shadow-sm">
              {user.avatarUrl ? (
                <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
              ) : (
                <span className="text-2xl font-bold text-gray-400">{user.name[0]}</span>
              )}
            </div>
            <div className="absolute inset-0 bg-black/20 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Camera className="w-6 h-6 text-white" />
            </div>
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>

          <Link to="/profile/edit">
            <Button variant="outline" size="sm">Edit Profile</Button>
          </Link>
        </div>

        <div className="mb-3">
          <h2 className="text-xl font-bold flex items-center gap-1">
            {user.name}
            {['verified', 'admin'].includes(user.role) && (
              <BadgeCheck className="w-5 h-5 text-blue-500" fill="currentColor" color="white" />
            )}
          </h2>
          <p className="text-gray-500 text-sm">{user.handle}</p>
        </div>

        {user.bio && (
            <p className="text-sm text-gray-800 mb-4 leading-relaxed">
                {user.bio}
            </p>
        )}

        <div className="flex flex-wrap gap-4 text-xs text-gray-500 mb-4">
          <div className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5" />
            <span>{user.region === 'SA' ? 'Riyadh, Saudi Arabia' : user.region}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            <span>Joined Jan 2025</span>
          </div>
          {user.socialLinks?.twitter && (
              <a href={`https://twitter.com/${user.socialLinks.twitter}`} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-blue-400 hover:underline">
                  <Twitter className="w-3.5 h-3.5" />
                  <span>{user.socialLinks.twitter}</span>
              </a>
          )}
           {user.socialLinks?.instagram && (
              <a href={`https://instagram.com/${user.socialLinks.instagram}`} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-pink-500 hover:underline">
                  <Instagram className="w-3.5 h-3.5" />
                  <span>{user.socialLinks.instagram}</span>
              </a>
          )}
        </div>

        <div className="flex gap-6 mb-6 border-b border-gray-100 pb-4">
          <div><span className="font-bold text-black">142</span> <span className="text-gray-500 text-xs">Following</span></div>
          <div><span className="font-bold text-black">3.4k</span> <span className="text-gray-500 text-xs">Followers</span></div>
        </div>

        <div className="bg-gray-50 p-3 rounded-xl mb-6">
          <p className="text-[10px] font-bold text-gray-500 uppercase mb-2">Dev Tools: Switch Role</p>
          <div className="flex flex-wrap gap-2">
            <Button size="sm" variant="outline" onClick={() => login('standard')} className={user.role === 'standard' ? 'bg-black text-white' : ''}>Standard</Button>
            <Button size="sm" variant="outline" onClick={() => login('verified')} className={user.role === 'verified' ? 'bg-black text-white' : ''}>Verified</Button>
          </div>
        </div>
      </div>

      <div>
          <h3 className="px-4 font-bold text-sm mb-2">Posts</h3>
          {userPosts.map(post => (
              <PostCard key={post.id} post={post} />
          ))}
      </div>
    </div>
  );
};
