import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole, SocialLinks } from '../types';

interface AuthContextType {
  user: User | null;
  login: (role: UserRole) => void;
  logout: () => void;
  updatePublicPostDate: () => void;
  updateProfile: (data: Partial<User>) => void;
  updateProfileImage: (url: string) => void;
  canPostPublic: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('textura_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const saveUser = (userData: User | null) => {
    setUser(userData);
    if (userData) {
      localStorage.setItem('textura_user', JSON.stringify(userData));
    } else {
      localStorage.removeItem('textura_user');
    }
  };

  const login = (role: UserRole) => {
    const newUser: User = {
      id: '1',
      name: 'Ahmed Al-Saud',
      handle: '@ahmed_dev',
      role: role,
      region: 'SA',
      bio: 'Software Engineer & Coffee enthusiast. Building things for the web.',
      socialLinks: { twitter: 'ahmed_dev' },
      lastPublicPostDate: undefined,
      avatarUrl: undefined
    };
    saveUser(newUser);
  };

  const logout = () => {
    saveUser(null);
  };

  const updatePublicPostDate = () => {
    if (user) {
      const now = new Date().toISOString();
      const updatedUser = { ...user, lastPublicPostDate: now };
      saveUser(updatedUser);
    }
  };

  const updateProfile = (data: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...data };
      saveUser(updatedUser);
    }
  };

  const updateProfileImage = (url: string) => {
    if (user) {
      const updatedUser = { ...user, avatarUrl: url };
      saveUser(updatedUser);
    }
  };

  const canPostPublic = React.useMemo(() => {
    if (!user) return false;
    if (user.role === 'admin' || user.role === 'verified') return true;
    
    if (!user.lastPublicPostDate) return true;

    const lastPost = new Date(user.lastPublicPostDate);
    const now = new Date();
    
    // Check if 24 hours have passed
    const diffInHours = (now.getTime() - lastPost.getTime()) / (1000 * 60 * 60);
    return diffInHours >= 24;
  }, [user]);

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      updatePublicPostDate, 
      updateProfile,
      updateProfileImage,
      canPostPublic,
      isAuthenticated: !!user 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
