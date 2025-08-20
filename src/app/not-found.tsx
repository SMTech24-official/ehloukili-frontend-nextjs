import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Home, Search, ArrowLeft } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function NotFound() {
  return (
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

        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="text-8xl md:text-9xl font-bold text-[var(--color-primary-600)] mb-4">
            404
          </div>
          <div className="w-32 h-1 bg-[var(--color-secondary-600)] mx-auto mb-6"></div>
        </div>

        {/* Content */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Page Not Found
          </h1>
          <p className="text-lg text-gray-600 mb-6 max-w-md mx-auto">
            The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get you back on track.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <Link href="/">
            <Button className="bg-[var(--color-primary-600)] hover:bg-[var(--color-primary-700)] text-white flex items-center gap-2">
              <Home className="w-4 h-4" />
              Go Home
            </Button>
          </Link>
          
          <Link href="/rent">
            <Button 
              color="outline"
              className="flex items-center gap-2"
            >
              <Search className="w-4 h-4" />
              Browse Properties
            </Button>
          </Link>
          
          <button 
            onClick={() => window.history.back()}
            className="text-[var(--color-primary-600)] hover:text-[var(--color-primary-700)] flex items-center gap-2 font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
        </div>

        {/* Popular Links */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Popular Pages</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <Link href="/" className="text-[var(--color-primary-600)] hover:text-[var(--color-primary-700)] hover:underline">
              Home
            </Link>
            <Link href="/sale" className="text-[var(--color-primary-600)] hover:text-[var(--color-primary-700)] hover:underline">
              For Sale
            </Link>
            <Link href="/rent" className="text-[var(--color-primary-600)] hover:text-[var(--color-primary-700)] hover:underline">
              For Rent
            </Link>
            <Link href="/contact" className="text-[var(--color-primary-600)] hover:text-[var(--color-primary-700)] hover:underline">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
