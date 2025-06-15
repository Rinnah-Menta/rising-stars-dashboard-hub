
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthState } from '@/types/auth';
import { localDatabase } from '@/data/localDatabase';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string; accountStatus?: string }>;
  logout: () => void;
  updateUserStatus: (userId: string, status: 'active' | 'suspended' | 'archived' | 'deleted', data: {
    reason: string;
    suspensionEndDate?: Date;
    nextSteps?: string;
    updatedBy: string;
  }) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: async () => ({ success: false }),
  logout: () => {},
  updateUserStatus: async () => {},
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

  const checkAccountStatus = (user: User) => {
    // If user is suspended, check if suspension has ended
    if (user.accountStatus === 'suspended' && user.suspensionEndDate) {
      const endDate = new Date(user.suspensionEndDate);
      const now = new Date();
      
      if (now >= endDate) {
        // Suspension has ended, reactivate account
        user.accountStatus = 'active';
        user.suspensionEndDate = undefined;
        user.statusReason = undefined;
        user.statusDate = undefined;
        
        // Update in local database
        const userIndex = localDatabase.users.findIndex(u => u.id === user.id);
        if (userIndex !== -1) {
          localDatabase.users[userIndex] = user;
        }
        
        return 'active';
      }
    }
    
    return user.accountStatus || 'active';
  };

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string; accountStatus?: string }> => {
    try {
      const user = localDatabase.users.find(u => u.email === email && u.password === password);
      
      if (user) {
        const accountStatus = checkAccountStatus(user);
        
        // Check if account is restricted
        if (accountStatus !== 'active') {
          return { 
            success: false, 
            error: `Account ${accountStatus}. Please contact administration.`,
            accountStatus: accountStatus
          };
        }
        
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

  const updateUserStatus = async (
    userId: string, 
    status: 'active' | 'suspended' | 'archived' | 'deleted',
    data: {
      reason: string;
      suspensionEndDate?: Date;
      nextSteps?: string;
      updatedBy: string;
    }
  ) => {
    const userIndex = localDatabase.users.findIndex(u => u.id === userId);
    if (userIndex !== -1) {
      localDatabase.users[userIndex] = {
        ...localDatabase.users[userIndex],
        accountStatus: status,
        statusReason: data.reason,
        statusDate: new Date().toISOString(),
        suspensionEndDate: data.suspensionEndDate?.toISOString(),
        statusUpdatedBy: data.updatedBy,
        nextSteps: data.nextSteps
      };
      
      // If the updated user is currently logged in and their status changed, log them out
      if (authState.user?.id === userId && status !== 'active') {
        logout();
      }
    }
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout, updateUserStatus }}>
      {children}
    </AuthContext.Provider>
  );
};
