'use client';

import * as React from 'react';
import Image from 'next/image';

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = React.useState(true);
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => {
            setIsVisible(false);
            setTimeout(onComplete, 300); // Wait for fade out animation
          }, 500);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 100);

    return () => clearInterval(progressInterval);
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-[var(--color-primary-600)] to-[var(--color-primary-700)] flex items-center justify-center transition-opacity duration-300">
      <div className="text-center text-white">
        {/* Logo Animation */}
        <div className="mb-8 animate-pulse">
          <Image
            src="/logo.svg"
            alt="Dometerra"
            width={200}
            height={50}
            priority
            className="h-14 w-auto filter brightness-0 invert mx-auto"
          />
        </div>

        {/* Welcome Text */}
        <div className="mb-8 space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold animate-fade-in">
            Welcome to Dometerra
          </h1>
          <p className="text-lg opacity-90 animate-fade-in-delay">
            Discover your perfect home
          </p>
        </div>

        {/* Loading Progress */}
        <div className="w-64 mx-auto">
          <div className="bg-white/20 rounded-full h-2 mb-2">
            <div 
              className="bg-white rounded-full h-2 transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm opacity-75">
            Setting up your experience... {Math.round(progress)}%
          </p>
        </div>

        {/* Animated Dots */}
        <div className="flex justify-center space-x-2 mt-8">
          <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        
        .animate-fade-in-delay {
          animation: fade-in 1s ease-out 0.3s both;
        }
      `}</style>
    </div>
  );
};

export default SplashScreen;
