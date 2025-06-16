
import React from 'react';
import { useNavigation } from '@/contexts/NavigationContext';
import { useAuth } from '@/contexts/AuthContext';

// Import dashboard components
import PupilDashboard from './dashboards/PupilDashboard';
import TeacherDashboard from './dashboards/TeacherDashboard';
import NonTeachingDashboard from './dashboards/NonTeachingDashboard';
import ParentDashboard from './dashboards/ParentDashboard';
import AdminDashboard from './dashboards/AdminDashboard';

// Import page components
import { Profile } from './pages/Profile';
import { Calendar } from './pages/Calendar';
import { Reports } from './pages/Reports';
import { Students } from './pages/Students';
import { Staff } from './pages/Staff';
import { Classes } from './pages/Classes';
import { Finances } from './pages/Finances';
import { Analytics } from './pages/Analytics';
import { Settings } from './pages/Settings';
import { Timetable } from './pages/Timetable';
import { Assignments } from './pages/Assignments';
import { Results } from './pages/Results';
import { Notifications } from './pages/Notifications';

export const PageRenderer = () => {
  const { currentPage } = useNavigation();
  const { user } = useAuth();

  if (!user) return null;

  // Render dashboard based on user role when currentPage is 'dashboard'
  if (currentPage === 'dashboard') {
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
  }

  // Render specific pages based on currentPage
  switch (currentPage) {
    case 'profile':
      return <Profile />;
    case 'calendar':
      return <Calendar />;
    case 'reports':
      return <Reports />;
    case 'students':
      return <Students />;
    case 'staff':
      return <Staff />;
    case 'classes':
      return <Classes />;
    case 'finances':
      return <Finances />;
    case 'analytics':
      return <Analytics />;
    case 'settings':
      return <Settings />;
    case 'timetable':
      return <Timetable />;
    case 'assignments':
      return <Assignments />;
    case 'results':
      return <Results />;
    case 'notifications':
      return <Notifications />;
    default:
      return <div>Page not found</div>;
  }
};
