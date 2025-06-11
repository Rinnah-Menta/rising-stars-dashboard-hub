
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import LoginPage from '@/components/LoginPage';
import DashboardRouter from '@/components/DashboardRouter';

const Index = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <DashboardRouter /> : <LoginPage />;
};

export default Index;
