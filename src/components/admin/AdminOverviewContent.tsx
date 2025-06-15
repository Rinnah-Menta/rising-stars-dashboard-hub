
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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      <AdminStatsCards />
      <SchoolOverview />
      <RecentActivities />
      <GradeDistribution />
      <AdminQuickActions onControlPanelClick={onControlPanelClick} />
    </div>
  );
};
