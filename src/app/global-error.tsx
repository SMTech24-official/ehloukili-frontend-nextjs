'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AlertTriangle, Home, RefreshCw, Mail } from 'lucide-react';
import Button from '@/components/ui/Button';

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  React.useEffect(() => {
    // Log error to monitoring service
    console.error('Global error:', error);
  }, [error]);

  const handleReset = () => {
    // Clear any stored state that might be causing issues
    if (typeof window !== 'undefined') {
      localStorage.clear();
      sessionStorage.clear();
    }
    reset();
  };

  return (
    <html>
      <body>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
          <div className="max-w-2xl w-full text-center">
            {/* Logo */}
            <div className="flex justify-center mb-8">
              <Image
                src="/logo.svg"
                alt="Dometerra"
                width={180}
                height={45}
                priority
                className="h-12 w-auto"
              />
            </div>

            {/* Error Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-12 h-12 text-red-600" />
              </div>
            </div>

            {/* Error Content */}
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Oops! Something went wrong
              </h1>
              <p className="text-lg text-gray-600 mb-6 max-w-md mx-auto">
                We apologize for the inconvenience. Our team has been notified and is working to fix this issue.
              </p>
              
              {/* Error Details (only in development) */}
              {process.env.NODE_ENV === 'development' && (
                <details className="mt-4 p-4 bg-gray-100 rounded-lg text-left">
                  <summary className="cursor-pointer font-medium text-gray-700 mb-2">
                    Technical Details
                  </summary>
                  <pre className="text-sm text-gray-600 overflow-auto">
                    {error.message}
                    {error.digest && `\nError ID: ${error.digest}`}
                  </pre>
                </details>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                onClick={handleReset}
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
              
              <Link href="mailto:support@dometerra.com">
                <Button 
                  color="outline"
                  className="flex items-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  Contact Support
                </Button>
              </Link>
            </div>

            {/* Additional Help */}
            <div className="mt-12 p-6 bg-white rounded-lg shadow-sm border">
              <h3 className="font-semibold text-gray-900 mb-3">Need immediate help?</h3>
              <div className="text-sm text-gray-600 space-y-2">
                <p>📧 Email: support@dometerra.com</p>
                <p>📞 Phone: +(088) 123 456 789</p>
                <p>💬 Live chat available 24/7</p>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
