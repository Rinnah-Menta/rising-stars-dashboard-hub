
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { EmailInput } from '@/components/ui/email-input';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { LogIn } from 'lucide-react';
import { localDatabase } from '@/data/localDatabase';

interface LoginFormProps {
  onRestrictedUser: (user: any) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onRestrictedUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await login(email, password);
      
      if (result.success) {
        toast({
          title: "Login Successful",
          description: "Welcome to Springing Stars Junior School!",
        });
        // Navigate to dashboard after successful login
        navigate('/');
      } else {
        // Check if the login failed due to account status
        if (result.accountStatus && result.accountStatus !== 'active') {
          const user = localDatabase.users.find(u => u.email === email && u.password === password);
          if (user) {
            onRestrictedUser(user);
            return;
          }
        }
        
        toast({
          title: "Login Failed",
          description: result.error,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email Address</Label>
        <EmailInput
          value={email}
          onChange={setEmail}
          placeholder="Start typing your email..."
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <Button 
        type="submit" 
        className="w-full bg-blue-600 hover:bg-blue-700 text-white"
        disabled={isLoading}
      >
        {isLoading ? (
          <div className="flex items-center space-x-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            <span>Signing in...</span>
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <LogIn className="h-4 w-4" />
            <span>Sign In</span>
          </div>
        )}
      </Button>
    </form>
  );
};
