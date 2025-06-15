
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useProfile } from '@/contexts/ProfileContext';
import { AdminDashboardHeader } from '@/components/admin/AdminDashboardHeader';
import { AdminOverviewContent } from '@/components/admin/AdminOverviewContent';
import { AdminControlPanel } from '@/components/admin/AdminControlPanel';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const { profileData } = useProfile();
  const [activeView, setActiveView] = useState('overview');
  
  const getTitle = () => {
    if (!profileData?.title) return '';
    return profileData.title;
  };

  const getLastName = () => {
    return profileData?.lastName || '';
  };

  const handleViewChange = (view: string) => {
    setActiveView(view);
  };

  const handleControlPanelClick = () => {
    setActiveView('control');
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <AdminDashboardHeader
        title={getTitle()}
        lastName={getLastName()}
        activeView={activeView}
        onViewChange={handleViewChange}
      />

      {activeView === 'overview' ? (
        <AdminOverviewContent onControlPanelClick={handleControlPanelClick} />
      ) : (
        <AdminControlPanel />
      )}
    </div>
  );
};

export default AdminDashboard;
