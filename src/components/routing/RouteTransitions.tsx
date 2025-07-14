import React from 'react';
import { Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { pageTransitions, routeTransitions } from '@/config/pageTransitions';
import { PublicRoutes } from './PublicRoutes';
import { ProtectedRoutes } from './ProtectedRoutes';

export const RouteTransitions: React.FC = () => {
  const location = useLocation();
  
  // Get transition based on current route for consistent UX
  const getTransitionForRoute = (pathname: string) => {
    const transitionName = routeTransitions[pathname] || routeTransitions.default;
    return pageTransitions[transitionName];
  };
  
  const currentTransition = getTransitionForRoute(location.pathname);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={currentTransition.initial}
        animate={currentTransition.animate}
        exit={currentTransition.exit}
        transition={{
          duration: 0.15,
          ease: "easeOut"
        }}
      >
        <Routes location={location}>
          <PublicRoutes />
          <ProtectedRoutes />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};