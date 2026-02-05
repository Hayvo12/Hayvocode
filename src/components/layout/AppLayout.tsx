import React from 'react';
import { Outlet } from 'react-router-dom';
import { BottomNav } from './BottomNav';
import { Sidebar } from './Sidebar';

export const AppLayout = () => {
  return (
    <div className="flex min-h-screen bg-white text-gray-900 font-sans">
      <Sidebar />
      <main className="flex-1 w-full max-w-2xl mx-auto border-x border-gray-100 min-h-screen pb-20 md:pb-0">
        <Outlet />
      </main>
      <div className="hidden lg:block w-80 p-6 sticky top-0 h-screen">
        {/* Right Sidebar Placeholder for Trending/Suggestions */}
        <div className="bg-gray-50 rounded-2xl p-4 h-full">
          <h3 className="font-bold text-gray-500 mb-4 text-sm uppercase tracking-wider">Trending in Saudi Arabia</h3>
          <div className="space-y-4">
            {['#RiyadhSeason', '#Tech_Vision', '#Arabic_Poetry', '#Startups'].map(tag => (
              <div key={tag} className="cursor-pointer hover:bg-gray-100 p-2 rounded block">
                <p className="font-bold text-sm">{tag}</p>
                <p className="text-xs text-gray-400">2.4k posts</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  );
};
