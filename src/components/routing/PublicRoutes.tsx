import React from 'react';
import { Route } from 'react-router-dom';
import LoginPage from '@/components/LoginPage';
import About from '@/pages/About';
import WhyUs from '@/pages/WhyUs';
import Contact from '@/pages/Contact';
import Terms from '@/pages/Terms';
import Privacy from '@/pages/Privacy';
import Disclaimer from '@/pages/Disclaimer';
import NotFound from '@/pages/NotFound';
import { routePaths } from '@/config/routes';

export const PublicRoutes: React.FC = () => {
  return (
    <>
      <Route path={routePaths.login} element={<LoginPage />} />
      <Route path={routePaths.about} element={<About />} />
      <Route path={routePaths.whyUs} element={<WhyUs />} />
      <Route path={routePaths.contact} element={<Contact />} />
      <Route path={routePaths.terms} element={<Terms />} />
      <Route path={routePaths.privacy} element={<Privacy />} />
      <Route path={routePaths.disclaimer} element={<Disclaimer />} />
      
      {/* Catch-all route */}
      <Route path="*" element={<NotFound />} />
    </>
  );
};