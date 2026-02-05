import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { PostProvider } from './context/PostContext';
import { AppLayout } from './components/layout/AppLayout';
import { Home } from './pages/Home';
import { Explore } from './pages/Explore';
import { Messages } from './pages/Messages';
import { Profile } from './pages/Profile';
import { EditProfile } from './pages/EditProfile';
import { Compose } from './pages/Compose';
import { Login } from './pages/Login';
import { SignUp } from './pages/SignUp';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

function App() {
  return (
    <AuthProvider>
      <PostProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            
            <Route path="/" element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }>
              <Route index element={<Home />} />
              <Route path="explore" element={<Explore />} />
              <Route path="messages" element={<Messages />} />
              <Route path="profile" element={<Profile />} />
            </Route>
            
            <Route path="/profile/edit" element={
              <ProtectedRoute>
                <EditProfile />
              </ProtectedRoute>
            } />
            
            <Route path="/compose" element={
              <ProtectedRoute>
                <Compose />
              </ProtectedRoute>
            } />
          </Routes>
        </BrowserRouter>
      </PostProvider>
    </AuthProvider>
  );
}

export default App;
