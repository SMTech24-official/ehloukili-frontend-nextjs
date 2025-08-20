'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { useLoading } from '@/providers/LoadingProvider';

export const usePageTransition = () => {
  const router = useRouter();
  const { setLoading, setLoadingText } = useLoading();

  const navigateWithLoading = React.useCallback((
    url: string, 
    loadingText: string = 'Loading page...'
  ) => {
    setLoadingText(loadingText);
    setLoading(true);
    
    // Simulate minimum loading time for better UX
    setTimeout(() => {
      router.push(url);
      // Loading will be turned off by the new page mount
      setTimeout(() => setLoading(false), 500);
    }, 300);
  }, [router, setLoading, setLoadingText]);

  const prefetchWithLoading = React.useCallback((url: string) => {
    router.prefetch(url);
  }, [router]);

  return {
    navigateWithLoading,
    prefetchWithLoading,
  };
};
