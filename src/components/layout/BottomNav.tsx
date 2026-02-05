import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Search, Mail, User, Plus } from 'lucide-react';
import { cn } from '../../lib/utils';

export const BottomNav = () => {
  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Search, label: 'Explore', path: '/explore' },
    { icon: null, label: 'Post', path: '/compose', isAction: true }, // Placeholder for center button
    { icon: Mail, label: 'DMs', path: '/messages' },
    { icon: User, label: 'Profile', path: '/profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 pb-safe pt-1 px-4 z-50 md:hidden">
      <div className="flex justify-between items-end max-w-md mx-auto h-16 pb-2">
        {navItems.map((item) => {
          if (item.isAction) {
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className="flex flex-col items-center justify-center -mt-8"
              >
                <div className="w-14 h-14 bg-black rounded-full text-white flex items-center justify-center shadow-lg active:scale-95 transition-transform border-4 border-white">
                  <Plus className="w-8 h-8" strokeWidth={2.5} />
                </div>
                <span className="text-[10px] mt-1 font-medium text-gray-500">{item.label}</span>
              </NavLink>
            );
          }

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => cn(
                "flex flex-col items-center justify-center w-12 h-12 transition-colors",
                isActive ? "text-black" : "text-gray-400"
              )}
            >
              {item.icon && <item.icon className={cn("w-6 h-6", item.label === 'Profile' && "rounded-full")} strokeWidth={2} />}
              <span className="text-[10px] mt-1 font-medium">{item.label}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};
