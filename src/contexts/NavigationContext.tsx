
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

type NavigationContextType = {
  currentPage: string;
  setCurrentPage: (page: string) => void;
};

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};

export const NavigationProvider = ({ children }: { children: ReactNode }) => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const location = useLocation();

  // Sync currentPage with current route
  useEffect(() => {
    const path = location.pathname;
    if (path === '/' || path === '/dashboard') {
      setCurrentPage('dashboard');
    } else {
      setCurrentPage(path.slice(1)); // Remove leading slash
    }
  }, [location.pathname]);

  return (
    <NavigationContext.Provider value={{ currentPage, setCurrentPage }}>
      {children}
    </NavigationContext.Provider>
  );
};
