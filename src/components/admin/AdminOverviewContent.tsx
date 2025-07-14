
import React from 'react';
import { AdminStatsCards } from './AdminStatsCards';
import { SchoolOverview } from './SchoolOverview';
import { RecentActivities } from './RecentActivities';
import { GradeDistribution } from './GradeDistribution';
import { AdminQuickActions } from './AdminQuickActions';
import AnimatedInView from '../AnimatedInView';

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
        <AnimatedInView animation="fadeIn" delay={0.4}>
          <SchoolOverview />
        </AnimatedInView>
        <AnimatedInView animation="zoomIn" delay={0.5}>
          <RecentActivities />
        </AnimatedInView>
        <AnimatedInView animation="flipIn" delay={0.6}>
          <GradeDistribution />
        </AnimatedInView>
        <AnimatedInView animation="bounceIn" delay={0.7}>
          <AdminQuickActions onControlPanelClick={onControlPanelClick} />
        </AnimatedInView>
      </div>
    </div>
  );
};
