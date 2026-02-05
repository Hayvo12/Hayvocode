import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Loader2 } from 'lucide-react';

export const SignUp = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      login('standard'); // Mock signup/login
      setIsLoading(false);
      navigate('/');
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-white">
      <div className="w-full max-w-sm space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tighter mb-2">TEXTURA.</h1>
          <p className="text-gray-500">Create your account.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Full Name"
            placeholder="Ahmed Al-Saud"
            required
          />
           <Input
            label="Handle"
            placeholder="@ahmed"
            required
          />
          <Input
            label="Email"
            type="email"
            placeholder="name@example.com"
            required
          />
          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            required
          />
          
          <Button 
            type="submit" 
            className="w-full py-6 text-lg" 
            disabled={isLoading}
          >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Create Account'}
          </Button>
        </form>

        <div className="text-center text-sm">
          <span className="text-gray-500">Already have an account? </span>
          <Link to="/login" className="font-bold hover:underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};
