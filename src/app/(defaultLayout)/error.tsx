'use client';

import * as React from 'react';
import Link from 'next/link';
import { AlertTriangle, Home, RefreshCw } from 'lucide-react';
import Button from '@/components/ui/Button';
import { notFound } from 'next/navigation';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function DefaultLayoutError({ error, reset }: ErrorProps) {
  React.useEffect(() => {
    console.error('Page error:', error);
    
    // If it's a not found error, redirect to not-found page
    if (error.message?.includes('NEXT_NOT_FOUND') || 
        error.message?.includes('404') ||
        error.message?.includes('not found')) {
      notFound();
    }
  }, [error]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        {/* Error Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>
        </div>

        {/* Error Content */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Oops! Something went wrong
          </h2>
          <p className="text-gray-600 mb-4">
            We encountered an unexpected error while loading this page. Our team has been notified and is working on a fix.
          </p>
          
          {/* Error Details (only in development) */}
          {process.env.NODE_ENV === 'development' && (
            <details className="mt-4 p-3 bg-gray-100 rounded text-left text-sm">
              <summary className="cursor-pointer font-medium text-gray-700 mb-2">
                Technical Details
              </summary>
              <pre className="text-gray-600 overflow-auto whitespace-pre-wrap">
                {error.message}
                {error.digest && `\nError ID: ${error.digest}`}
              </pre>
            </details>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <Button 
            onClick={reset}
            className="bg-[var(--color-primary-600)] hover:bg-[var(--color-primary-700)] text-white flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </Button>
          
          <Link href="/">
            <Button 
              color="outline"
              className="flex items-center gap-2"
            >
              <Home className="w-4 h-4" />
              Go Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
