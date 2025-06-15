
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { LogIn, Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { AccountStatusPage } from './AccountStatusPage';
import { localDatabase } from '@/data/localDatabase';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [restrictedUser, setRestrictedUser] = useState<any>(null);
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
            setRestrictedUser(user);
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

  // Show account status page if user is restricted
  if (restrictedUser) {
    return <AccountStatusPage user={restrictedUser} />;
  }

  const getDemoCredentials = () => {
    const credentials = {
      pupil: { email: 'john.mukasa@pupil.springingstars.ac.ug', password: 'pupil123' },
      teacher: { email: 'sarah.nambi@teacher.springingstars.ac.ug', password: 'teacher123' },
      'non-teaching': { email: 'david.kato@staff.springingstars.ac.ug', password: 'staff123' },
      parent: { email: 'grace.nalongo@parent.springingstars.ac.ug', password: 'parent123' },
      admin: { email: 'admin@springingstars.ac.ug', password: 'admin123' }
    };
    return credentials[userType as keyof typeof credentials];
  };

  const fillDemoCredentials = () => {
    const creds = getDemoCredentials();
    if (creds) {
      setEmail(creds.email);
      setPassword(creds.password);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-orange-50 to-blue-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* School Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-2">
            <div className="relative">
              <img 
                src="https://springingstars.ac.ug/wp-content/uploads/2023/04/logo.png" 
                alt="Springing Stars Logo" 
                className="h-16 w-16 object-contain"
              />
              <Star className="h-6 w-6 text-orange-500 absolute -top-1 -right-1" />
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-blue-900">Springing Stars</h1>
            <p className="text-xl text-blue-700">Junior School</p>
            <p className="text-sm text-gray-600 mt-2">School Management System - Uganda</p>
          </div>
        </div>

        {/* Login Card */}
        <Card className="shadow-lg border-0 bg-white/95 backdrop-blur">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-semibold text-gray-800">Welcome Back</CardTitle>
            <CardDescription className="text-gray-600">
              Sign in to access your school portal
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="userType">I am a:</Label>
                <Select value={userType} onValueChange={setUserType}>
                  <SelectTrigger id="userType">
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pupil">Pupil</SelectItem>
                    <SelectItem value="teacher">Teaching Staff</SelectItem>
                    <SelectItem value="non-teaching">Non-Teaching Staff</SelectItem>
                    <SelectItem value="parent">Parent</SelectItem>
                    <SelectItem value="admin">Administrator</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
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

              {userType && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={fillDemoCredentials}
                  className="w-full text-sm"
                >
                  Use Demo Credentials for {userType.replace('-', ' ')}
                </Button>
              )}

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

            {/* Demo Credentials Info */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-900 mb-2">Demo Credentials:</h4>
              <div className="text-xs text-blue-700 space-y-1">
                <p><strong>Pupil:</strong> john.mukasa@pupil.springingstars.ac.ug / pupil123</p>
                <p><strong>Teacher:</strong> sarah.nambi@teacher.springingstars.ac.ug / teacher123</p>
                <p><strong>Staff:</strong> david.kato@staff.springingstars.ac.ug / staff123</p>
                <p><strong>Parent:</strong> grace.nalongo@parent.springingstars.ac.ug / parent123</p>
                <p><strong>Admin:</strong> admin@springingstars.ac.ug / admin123</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
