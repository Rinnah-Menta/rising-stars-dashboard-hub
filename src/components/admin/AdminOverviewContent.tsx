
import React from 'react';
import { AdminStatsCards } from './AdminStatsCards';
import { SchoolOverview } from './SchoolOverview';
import { RecentActivities } from './RecentActivities';
import { GradeDistribution } from './GradeDistribution';
import { AdminQuickActions } from './AdminQuickActions';

interface AdminOverviewContentProps {
  onControlPanelClick: () => void;
}

export const AdminOverviewContent: React.FC<AdminOverviewContentProps> = ({ onControlPanelClick }) => {
  return (
    <div className="space-y-6">
      {/* Stats Cards - Always full width, responsive grid internally */}
      <AdminStatsCards />
      
      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SchoolOverview />
        <RecentActivities />
        <GradeDistribution />
        <AdminQuickActions onControlPanelClick={onControlPanelClick} />
      </div>
    </div>
  );
};
