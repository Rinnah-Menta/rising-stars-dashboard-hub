import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthState } from '@/types/auth';
import { localDatabase } from '@/data/localDatabase';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: async () => ({ success: false }),
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>(() => {
    // Initialize state from localStorage
    const savedUser = localStorage.getItem('springingstars_user');
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        return {
          user,
          isAuthenticated: true,
        };
      } catch (error) {
        console.error('Error parsing saved user data:', error);
        localStorage.removeItem('springingstars_user');
      }
    }
    return {
      user: null,
      isAuthenticated: false,
    };
  });

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
    const user = localDatabase.users.find(u => u.email === email && u.password === password);
    
    if (user) {
        // Save user data to localStorage before updating state
        localStorage.setItem('springingstars_user', JSON.stringify(user));
        
      setAuthState({
        user,
        isAuthenticated: true,
      });
        
      return { success: true };
    }
    
    return { success: false, error: 'Invalid email or password' };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'An unexpected error occurred' };
    }
  };

  const logout = () => {
    // Remove user data from localStorage before updating state
    localStorage.removeItem('springingstars_user');
    
    setAuthState({
      user: null,
      isAuthenticated: false,
    });
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
