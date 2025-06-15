
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { AuthProvider } from '@/contexts/AuthContext';
import { ProfileProvider } from '@/contexts/ProfileContext';
import { NavigationProvider } from '@/contexts/NavigationContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import ScrollToTop from '@/components/ScrollToTop';
import { AppRoutes } from '@/components/routing/AppRoutes';
import './App.css';
import './print.css';

const queryClient = new QueryClient();

const App: React.FC = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ThemeProvider>
        <Toaster />
        <Sonner />
        <AuthProvider>
          <ProfileProvider>
            <BrowserRouter>
              <NavigationProvider>
                <ScrollToTop />
                <AppRoutes />
              </NavigationProvider>
            </BrowserRouter>
          </ProfileProvider>
        </AuthProvider>
      </ThemeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
