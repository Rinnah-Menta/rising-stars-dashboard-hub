
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import PupilDashboard from './dashboards/PupilDashboard';
import TeacherDashboard from './dashboards/TeacherDashboard';
import NonTeachingDashboard from './dashboards/NonTeachingDashboard';
import ParentDashboard from './dashboards/ParentDashboard';
import AdminDashboard from './dashboards/AdminDashboard';

const DashboardRouter = () => {
  const { user } = useAuth();

  if (!user) return null;

  switch (user.role) {
    case 'pupil':
      return <PupilDashboard />;
    case 'teacher':
      return <TeacherDashboard />;
    case 'non-teaching':
      return <NonTeachingDashboard />;
    case 'parent':
      return <ParentDashboard />;
    case 'admin':
      return <AdminDashboard />;
    default:
      return <div>Invalid user role</div>;
  }
};

export default DashboardRouter;
