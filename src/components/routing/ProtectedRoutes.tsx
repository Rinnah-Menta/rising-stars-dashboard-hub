import React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Profile } from '@/components/pages/Profile';
import { Calendar } from '@/components/pages/Calendar';
import { Reports } from '@/components/pages/Reports';
import { Students } from '@/components/pages/Students';
import { Staff } from '@/components/pages/Staff';
import { Classes } from '@/components/pages/Classes';
import { Finances } from '@/components/pages/Finances';
import { Analytics } from '@/components/pages/Analytics';
import { Settings } from '@/components/pages/Settings';
import { Timetable } from '@/components/pages/Timetable';
import { Assignments } from '@/components/pages/Assignments';
import { Results } from '@/components/pages/Results';
import { Notifications } from '@/components/pages/Notifications';
import { Attendance } from '@/components/pages/Attendance';
import { Facilities } from '@/components/pages/Facilities';
import { Communication } from '@/components/pages/Communication';
import { Help } from '@/components/pages/Help';
import { Library } from '@/components/pages/Library';
import { ProtectedRoute } from './ProtectedRoute';
import { Dashboard } from './Dashboard';
import { routePaths } from '@/config/routes';

// Helper component to wrap pages with Layout and ProtectedRoute
const ProtectedPage: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ProtectedRoute>
    <Layout>
      {children}
    </Layout>
  </ProtectedRoute>
);

export const ProtectedRoutes: React.FC = () => {
  return (
    <>
      <Route path={routePaths.home} element={
        <ProtectedPage>
          <Dashboard />
        </ProtectedPage>
      } />
      
      <Route path={routePaths.dashboard} element={
        <ProtectedPage>
          <Dashboard />
        </ProtectedPage>
      } />

      <Route path={routePaths.profile} element={
        <ProtectedPage>
          <Profile />
        </ProtectedPage>
      } />

      <Route path={routePaths.calendar} element={
        <ProtectedPage>
          <Calendar />
        </ProtectedPage>
      } />

      <Route path={routePaths.reports} element={
        <ProtectedPage>
          <Reports />
        </ProtectedPage>
      } />

      <Route path={routePaths.students} element={
        <ProtectedPage>
          <Students />
        </ProtectedPage>
      } />

      <Route path={routePaths.staff} element={
        <ProtectedPage>
          <Staff />
        </ProtectedPage>
      } />

      <Route path={routePaths.classes} element={
        <ProtectedPage>
          <Classes />
        </ProtectedPage>
      } />

      <Route path={routePaths.finances} element={
        <ProtectedPage>
          <Finances />
        </ProtectedPage>
      } />

      <Route path={routePaths.analytics} element={
        <ProtectedPage>
          <Analytics />
        </ProtectedPage>
      } />

      <Route path={routePaths.settings} element={
        <ProtectedPage>
          <Settings />
        </ProtectedPage>
      } />

      <Route path={routePaths.timetable} element={
        <ProtectedPage>
          <Timetable />
        </ProtectedPage>
      } />

      <Route path={routePaths.assignments} element={
        <ProtectedPage>
          <Assignments />
        </ProtectedPage>
      } />

      <Route path={routePaths.results} element={
        <ProtectedPage>
          <Results />
        </ProtectedPage>
      } />

      <Route path={routePaths.notifications} element={
        <ProtectedPage>
          <Notifications />
        </ProtectedPage>
      } />

      <Route path={routePaths.attendance} element={
        <ProtectedPage>
          <Attendance />
        </ProtectedPage>
      } />

      <Route path={routePaths.facilities} element={
        <ProtectedPage>
          <Facilities />
        </ProtectedPage>
      } />

      <Route path={routePaths.communication} element={
        <ProtectedPage>
          <Communication />
        </ProtectedPage>
      } />

      <Route path={routePaths.library} element={
        <ProtectedPage>
          <Library />
        </ProtectedPage>
      } />

      <Route path={routePaths.help} element={
        <ProtectedPage>
          <Help />
        </ProtectedPage>
      } />
    </>
  );
};