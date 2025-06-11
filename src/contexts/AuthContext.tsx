
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthState } from '@/types/auth';
import { localDatabase } from '@/data/localDatabase';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
  });

  // Load authentication state from localStorage on component mount
  useEffect(() => {
    const savedUser = localStorage.getItem('springingstars_user');
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        setAuthState({
          user,
          isAuthenticated: true,
        });
      } catch (error) {
        console.error('Error parsing saved user data:', error);
        localStorage.removeItem('springingstars_user');
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    const user = localDatabase.users.find(u => u.email === email && u.password === password);
    
    if (user) {
      setAuthState({
        user,
        isAuthenticated: true,
      });
      // Save user data to localStorage
      localStorage.setItem('springingstars_user', JSON.stringify(user));
      return { success: true };
    }
    
    return { success: false, error: 'Invalid email or password' };
  };

  const logout = () => {
    setAuthState({
      user: null,
      isAuthenticated: false,
    });
    // Remove user data from localStorage
    localStorage.removeItem('springingstars_user');
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
