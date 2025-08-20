'use client';

import * as React from 'react';

interface LoadingContextType {
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
  loadingText: string;
  setLoadingText: (text: string) => void;
}

const LoadingContext = React.createContext<LoadingContextType | undefined>(undefined);

export const useLoading = () => {
  const context = React.useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};

interface LoadingProviderProps {
  children: React.ReactNode;
}

export const LoadingProvider: React.FC<LoadingProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [loadingText, setLoadingText] = React.useState('Loading...');

  const setLoading = (loading: boolean) => {
    setIsLoading(loading);
  };

  return (
    <LoadingContext.Provider value={{ isLoading, setLoading, loadingText, setLoadingText }}>
      {children}
      {isLoading && <GlobalLoadingOverlay text={loadingText} />}
    </LoadingContext.Provider>
  );
};

interface GlobalLoadingOverlayProps {
  text: string;
}

const GlobalLoadingOverlay: React.FC<GlobalLoadingOverlayProps> = ({ text }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white rounded-lg p-8 shadow-2xl max-w-sm w-full mx-4 text-center">
        {/* Loading Spinner */}
        <div className="relative mb-4">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-[var(--color-primary-600)] rounded-full animate-spin mx-auto"></div>
        </div>

        {/* Loading Text */}
        <p className="text-gray-700 font-semibold mb-2">{text}</p>
        <p className="text-sm text-gray-500">This won&apos;t take long...</p>

        {/* Progress Dots */}
        <div className="flex justify-center space-x-1 mt-4">
          <div className="w-1.5 h-1.5 bg-[var(--color-primary-600)] rounded-full animate-bounce"></div>
          <div className="w-1.5 h-1.5 bg-[var(--color-primary-600)] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-1.5 h-1.5 bg-[var(--color-primary-600)] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  );
};
