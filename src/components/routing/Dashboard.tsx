
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import PupilDashboard from '@/components/dashboards/PupilDashboard';
import TeacherDashboard from '@/components/dashboards/TeacherDashboard';
import NonTeachingDashboard from '@/components/dashboards/NonTeachingDashboard';
import ParentDashboard from '@/components/dashboards/ParentDashboard';
import AdminDashboard from '@/components/dashboards/AdminDashboard';

export const Dashboard: React.FC = () => {
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
