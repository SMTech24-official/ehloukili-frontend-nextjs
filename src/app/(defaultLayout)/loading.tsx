import * as React from 'react';

export default function DefaultLayoutLoading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        {/* Loading Animation */}
        <div className="relative mb-6">
          <div className="w-12 h-12 border-3 border-gray-200 border-t-[var(--color-primary-600)] rounded-full animate-spin mx-auto"></div>
        </div>

        {/* Loading Text */}
        <div className="space-y-2">
          <p className="text-base font-semibold text-gray-800">Loading content...</p>
          <div className="flex justify-center space-x-1 mt-4">
            <div className="w-1.5 h-1.5 bg-[var(--color-primary-600)] rounded-full animate-bounce"></div>
            <div className="w-1.5 h-1.5 bg-[var(--color-primary-600)] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-1.5 h-1.5 bg-[var(--color-primary-600)] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
