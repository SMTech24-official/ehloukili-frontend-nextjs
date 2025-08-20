import * as React from 'react';
import Image from 'next/image';

export default function Loading() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Image
            src="/logo.svg"
            alt="Dometerra"
            width={180}
            height={45}
            priority
            className="h-12 w-auto animate-pulse"
          />
        </div>

        {/* Loading Animation */}
        <div className="relative mb-6">
          {/* Main Spinner */}
          <div className="w-16 h-16 border-4 border-gray-200 border-t-[var(--color-primary-600)] rounded-full animate-spin mx-auto"></div>
          
          {/* Outer Ring */}
          <div className="absolute inset-0 w-20 h-20 border-2 border-gray-100 rounded-full animate-pulse mx-auto -mt-2 -ml-2"></div>
        </div>

        {/* Loading Text */}
        <div className="space-y-2">
          <p className="text-lg font-semibold text-gray-800">Preparing your experience</p>
          <p className="text-sm text-gray-600">Just a moment while we load everything for you</p>
        </div>

        {/* Progress Dots */}
        <div className="flex justify-center space-x-2 mt-6">
          <div className="w-2 h-2 bg-[var(--color-primary-600)] rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-[var(--color-primary-600)] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-[var(--color-primary-600)] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  );
}
