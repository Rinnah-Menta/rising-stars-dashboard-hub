
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { NavigationProvider } from '@/contexts/NavigationContext';
import { Layout } from '@/components/Layout';
import { PageRenderer } from '@/components/PageRenderer';

const DashboardRouter = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <NavigationProvider>
      <Layout>
        <PageRenderer />
      </Layout>
    </NavigationProvider>
  );
};

export default DashboardRouter;
