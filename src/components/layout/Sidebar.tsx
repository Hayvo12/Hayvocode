import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Search, Mail, User, PenTool, LogOut } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../ui/Button';

export const Sidebar = () => {
  const { user, logout } = useAuth();

  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Search, label: 'Explore', path: '/explore' },
    { icon: Mail, label: 'Messages', path: '/messages' },
    { icon: User, label: 'Profile', path: '/profile' },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 h-screen sticky top-0 border-r border-gray-200 p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tighter">TEXTURA.</h1>
      </div>

      <nav className="flex-1 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => cn(
              "flex items-center gap-4 p-3 rounded-xl transition-colors hover:bg-gray-100",
              isActive ? "font-bold bg-gray-100" : "text-gray-600"
            )}
          >
            <item.icon className="w-6 h-6" />
            <span className="text-lg">{item.label}</span>
          </NavLink>
        ))}

        <NavLink to="/compose" className="block mt-6">
          <Button className="w-full py-3 text-lg">
            <PenTool className="w-5 h-5" />
            New Post
          </Button>
        </NavLink>
      </nav>

      {user && (
        <div className="border-t pt-4 mt-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-600">
              {user.name[0]}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold truncate">{user.name}</p>
              <p className="text-sm text-gray-500 truncate">{user.handle}</p>
            </div>
          </div>
          <button onClick={logout} className="flex items-center gap-2 text-red-500 hover:text-red-700 text-sm font-medium">
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      )}
    </aside>
  );
};
