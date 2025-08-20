'use client';

import * as React from 'react';
import { LoadingProvider } from '@/providers/LoadingProvider';
import SplashScreen from '@/components/shared/SplashScreen';
import { ErrorBoundary } from '@/components/shared/ErrorBoundary';

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const [showSplash, setShowSplash] = React.useState(true);
  const [isFirstVisit, setIsFirstVisit] = React.useState(true);

  React.useEffect(() => {
    // Check if user has visited before
    const hasVisited = localStorage.getItem('hasVisited');
    if (hasVisited) {
      setIsFirstVisit(false);
      setShowSplash(false);
    } else {
      localStorage.setItem('hasVisited', 'true');
    }
  }, []);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  if (showSplash && isFirstVisit) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  return (
    <ErrorBoundary>
      <LoadingProvider>
        {children}
      </LoadingProvider>
    </ErrorBoundary>
  );
}
