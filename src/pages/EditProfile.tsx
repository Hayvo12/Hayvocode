import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { ChevronLeft } from 'lucide-react';

export const EditProfile = () => {
  const { user, updateProfile } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState(user?.name || '');
  const [handle, setHandle] = useState(user?.handle || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [twitter, setTwitter] = useState(user?.socialLinks?.twitter || '');
  const [instagram, setInstagram] = useState(user?.socialLinks?.instagram || '');
  const [website, setWebsite] = useState(user?.socialLinks?.website || '');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name,
      handle,
      bio,
      socialLinks: { twitter, instagram, website }
    });
    navigate('/profile');
  };

  return (
    <div className="min-h-screen bg-white pb-20">
      <header className="flex items-center justify-between p-4 border-b border-gray-100 sticky top-0 bg-white z-10">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="font-bold text-lg">Edit Profile</h1>
        <Button onClick={handleSave} size="sm">Save</Button>
      </header>

      <div className="p-6 space-y-6">
        <Input label="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <Input label="Handle" value={handle} onChange={(e) => setHandle(e.target.value)} />
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Bio</label>
          <textarea 
            className="w-full rounded-xl border border-gray-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-black"
            rows={4}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Tell us about yourself..."
          />
        </div>

        <div className="border-t border-gray-100 pt-6">
          <h3 className="font-bold text-sm mb-4">Social Links</h3>
          <div className="space-y-4">
            <Input label="Twitter (X)" placeholder="username" value={twitter} onChange={(e) => setTwitter(e.target.value)} />
            <Input label="Instagram" placeholder="username" value={instagram} onChange={(e) => setInstagram(e.target.value)} />
            <Input label="Website" placeholder="https://..." value={website} onChange={(e) => setWebsite(e.target.value)} />
          </div>
        </div>
      </div>
    </div>
  );
};
