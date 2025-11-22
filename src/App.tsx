import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './context/ThemeContext';
import { SoundProvider } from './context/SoundProvider';
import { ToastProvider } from './context/ToastContext';
import { PerformanceProvider } from './context/PerformanceContext';
import { AchievementProvider } from './context/AchievementContext';
import { useToast } from './context/ToastContext';
import Layout from './components/Layout/Layout';
import LoadingProgress from './components/UI/LoadingProgress';
import PageTransition from './components/VFX/PageTransition';
import ToastContainer from './components/UI/ToastContainer';

// Lazy load pages
const HomePage = lazy(() => import('./pages/HomePage'));
const KnowledgePage = lazy(() => import('./pages/KnowledgePage'));
const SkillsPage = lazy(() => import('./pages/SkillsPage'));
const TechStackPage = lazy(() => import('./pages/TechStackPage'));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'));
const TimelinePage = lazy(() => import('./pages/TimelinePage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));

const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center text-text-muted animate-pulse">
      <div className="text-4xl mb-4">⚡</div>
      <div>Loading Module...</div>
    </div>
  </div>
);

const AnimatedRoutes: React.FC = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <PageTransition>
            <Suspense fallback={<LoadingFallback />}>
              <HomePage />
            </Suspense>
          </PageTransition>
        } />
        <Route path="/knowledge" element={
          <PageTransition>
            <Suspense fallback={<LoadingFallback />}>
              <KnowledgePage />
            </Suspense>
          </PageTransition>
        } />
        <Route path="/skills" element={
          <PageTransition>
            <Suspense fallback={<LoadingFallback />}>
              <SkillsPage />
            </Suspense>
          </PageTransition>
        } />
        <Route path="/tech-stack" element={
          <PageTransition>
            <Suspense fallback={<LoadingFallback />}>
              <TechStackPage />
            </Suspense>
          </PageTransition>
        } />
        <Route path="/projects" element={
          <PageTransition>
            <Suspense fallback={<LoadingFallback />}>
              <ProjectsPage />
            </Suspense>
          </PageTransition>
        } />
        <Route path="/timeline" element={
          <PageTransition>
            <Suspense fallback={<LoadingFallback />}>
              <TimelinePage />
            </Suspense>
          </PageTransition>
        } />
        <Route path="/contact" element={
          <PageTransition>
            <Suspense fallback={<LoadingFallback />}>
              <ContactPage />
            </Suspense>
          </PageTransition>
        } />
      </Routes>
    </AnimatePresence>
  );
};

// Welcome toast component
const WelcomeToast: React.FC = () => {
  const { info } = useToast();

  useEffect(() => {
    // Show welcome toast after a short delay
    const timer = setTimeout(() => {
      const hour = new Date().getHours();
      let greeting = 'Hello';
      if (hour < 12) greeting = 'Good morning';
      else if (hour < 18) greeting = 'Good afternoon';
      else greeting = 'Good evening';

      info(`${greeting}! Welcome to my portfolio 🚀`, 6000);
    }, 1500);

    return () => clearTimeout(timer);
  }, [info]);

  return null;
};

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <LoadingProgress />
      <ThemeProvider>
        <SoundProvider>
          <PerformanceProvider>
            <ToastProvider>
              <AchievementProvider>
                <Router>
                  <Layout>
                    <WelcomeToast />
                    <AnimatedRoutes />
                  </Layout>
                  <ToastContainer />
                </Router>
              </AchievementProvider>
            </ToastProvider>
          </PerformanceProvider>
        </SoundProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
};

export default App;
