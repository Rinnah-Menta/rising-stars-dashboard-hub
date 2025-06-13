
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProfileProvider } from "@/contexts/ProfileContext";
import { NavigationProvider } from "@/contexts/NavigationContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { Layout } from "@/components/Layout";
import LoginPage from "@/components/LoginPage";
import { Profile } from "@/components/pages/Profile";
import { Calendar } from "@/components/pages/Calendar";
import { Reports } from "@/components/pages/Reports";
import { Students } from "@/components/pages/Students";
import { Teachers } from "@/components/pages/Teachers";
import { Classes } from "@/components/pages/Classes";
import { Finances } from "@/components/pages/Finances";
import { Analytics } from "@/components/pages/Analytics";
import { Settings } from "@/components/pages/Settings";
import { Timetable } from "@/components/pages/Timetable";
import { Assignments } from "@/components/pages/Assignments";
import { Results } from "@/components/pages/Results";
import PupilDashboard from "@/components/dashboards/PupilDashboard";
import TeacherDashboard from "@/components/dashboards/TeacherDashboard";
import NonTeachingDashboard from "@/components/dashboards/NonTeachingDashboard";
import ParentDashboard from "@/components/dashboards/ParentDashboard";
import AdminDashboard from "@/components/dashboards/AdminDashboard";
import About from "./pages/About";
import WhyUs from "./pages/WhyUs";
import Contact from "./pages/Contact";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Disclaimer from "./pages/Disclaimer";
import NotFound from "./pages/NotFound";
import { useAuth } from "./contexts/AuthContext";
import ScrollToTop from "@/components/ScrollToTop";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";

const pageTransitions = [
  {
    name: 'fade',
    variants: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    }
  },
  {
    name: 'slideRight',
    variants: {
      initial: { opacity: 0, x: 50 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -50 },
    }
  },
  {
    name: 'slideLeft',
    variants: {
      initial: { opacity: 0, x: -50 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: 50 },
    }
  },
  {
    name: 'slideBottom',
    variants: {
      initial: { opacity: 0, y: 50 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -50 },
    }
  },
  {
    name: 'slideTop',
    variants: {
      initial: { opacity: 0, y: -50 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: 50 },
    }
  },
  {
    name: 'zoom',
    variants: {
      initial: { opacity: 0, scale: 0.95 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.95 },
    }
  }
];

const queryClient = new QueryClient();

// Protected Route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

// Dashboard component that renders the appropriate dashboard based on user role
const Dashboard = () => {
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

const AppRoutes = () => {
  const location = useLocation();
  const [transition, setTransition] = useState(pageTransitions[0]);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * pageTransitions.length);
    setTransition(pageTransitions[randomIndex]);
  }, [location.pathname]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        variants={transition.variants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.35, ease: "easeInOut" }}
      >
        <Routes location={location}>
          {/* Public routes */}
          <Route path="/login" element={<LoginPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/why-us" element={<WhyUs />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/disclaimer" element={<Disclaimer />} />

          {/* Protected routes */}
          <Route path="/" element={
            <ProtectedRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          } />
          
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          } />

          <Route path="/profile" element={
            <ProtectedRoute>
              <Layout>
                <Profile />
              </Layout>
            </ProtectedRoute>
          } />

          <Route path="/calendar" element={
            <ProtectedRoute>
              <Layout>
                <Calendar />
              </Layout>
            </ProtectedRoute>
          } />

          <Route path="/reports" element={
            <ProtectedRoute>
              <Layout>
                <Reports />
              </Layout>
            </ProtectedRoute>
          } />

          <Route path="/students" element={
            <ProtectedRoute>
              <Layout>
                <Students />
              </Layout>
            </ProtectedRoute>
          } />

          <Route path="/teachers" element={
            <ProtectedRoute>
              <Layout>
                <Teachers />
              </Layout>
            </ProtectedRoute>
          } />

          <Route path="/classes" element={
            <ProtectedRoute>
              <Layout>
                <Classes />
              </Layout>
            </ProtectedRoute>
          } />

          <Route path="/finances" element={
            <ProtectedRoute>
              <Layout>
                <Finances />
              </Layout>
            </ProtectedRoute>
          } />

          <Route path="/analytics" element={
            <ProtectedRoute>
              <Layout>
                <Analytics />
              </Layout>
            </ProtectedRoute>
          } />

          <Route path="/settings" element={
            <ProtectedRoute>
              <Layout>
                <Settings />
              </Layout>
            </ProtectedRoute>
          } />

          <Route path="/timetable" element={
            <ProtectedRoute>
              <Layout>
                <Timetable />
              </Layout>
            </ProtectedRoute>
          } />

          <Route path="/assignments" element={
            <ProtectedRoute>
              <Layout>
                <Assignments />
              </Layout>
            </ProtectedRoute>
          } />

          <Route path="/results" element={
            <ProtectedRoute>
              <Layout>
                <Results />
              </Layout>
            </ProtectedRoute>
          } />

          {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
      </motion.div>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ThemeProvider>
        <Toaster />
        <Sonner />
        <AuthProvider>
          <ProfileProvider>
            <NavigationProvider>
              <BrowserRouter>
                <ScrollToTop />
                <AppRoutes />
        </BrowserRouter>
            </NavigationProvider>
          </ProfileProvider>
      </AuthProvider>
      </ThemeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
