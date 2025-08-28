'use client';

import Button from '@/components/ui/Button';
import { useGetMeQuery } from '@/redux/api/authApi';
import { ChevronDown, Heart, Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as React from 'react';

const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const pathname = usePathname();


  const { data: user } = useGetMeQuery();

  // Helper function to determine if a link is active
  const isActiveLink = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  // Helper function to get link classes
  const getLinkClasses = (href: string) => {
    const baseClasses = "font-medium transition-colors";
    const activeClasses = "text-[var(--color-secondary-600)]";
    const inactiveClasses = "text-[var(--color-neutral-700)] hover:text-[var(--color-secondary-600)]";

    return `${baseClasses} ${isActiveLink(href) ? activeClasses : inactiveClasses}`;
  };

  return (
    <header className="bg-gradient-to-r from-[#E4EDF7] to-[#F6F6F9] border-b border-gray-200 sticky top-0 z-50">
      <div className="container max-w-7xl min-[100rem]:max-w-[96rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link href="/" className={getLinkClasses('/')}>
              Home
            </Link>
            {/* <Link href="/sale" className={getLinkClasses('/sale')}>
              Sale
            </Link> */}
            <Link href="/property" className={getLinkClasses('/property')}>
              Property
            </Link>
            {/* <Link href="/rent" className={getLinkClasses('/rent')}>
              Rent
            </Link> */}
            <Link href="/submit-property" className={getLinkClasses('/submit-property')}>
              Submit Your Property
            </Link>
            <Link href="/pricing" className={getLinkClasses('/pricing')}>
              Pricing
            </Link>
          </nav>

          {/* Center - Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.svg"
                alt="Dometerra"
                width={150}
                height={40}
                priority
                className="h-18 w-auto"
              />
            </Link>
          </div>

          {/* Right side - Auth and Language */}
          <div className="hidden lg:flex items-center space-x-6">
            {/* Favorites */}
            <button className="relative p-2 text-[var(--color-neutral-700)] hover:text-[var(--color-secondary-600)] transition-colors">
              <Heart className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-[var(--color-secondary-600)] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </button>

            {/* Auth buttons */}
            {
              user?.profile?.role === 'user' || user?.profile?.role === 'agent' ? (
                <Button asChild size="sm" color='outline'>
                  <Link href="/user-dashboard/profile">Profile</Link>
                </Button>
              ) : null
            }
            {
              user?.profile?.role === 'admin' ? (
                <Button asChild size="sm" color='outline'>
                  <Link href="/admin/dashboard">Dashboard</Link>
                </Button>
              ) : null
            }
            {
              !user?.profile && (
                <>
                  <Link href="/auth/login" className="text-[var(--color-neutral-700)] hover:text-[var(--color-secondary-600)] font-medium transition-colors">
                    Sign In
                  </Link>
                  <Button asChild size="sm" color='outline'>
                    <Link href="/auth/signup">Sign Up</Link>
                  </Button>
                </>
              )
            }

            {/* Language Dropdown */}
            <button className="flex items-center space-x-1 text-[var(--color-neutral-700)] hover:text-[var(--color-secondary-600)] transition-colors">
              <span className="text-sm font-medium">English</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 text-[var(--color-neutral-700)]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 py-4">
            <nav className="flex flex-col space-y-4">
              <Link href="/" className={getLinkClasses('/')}>
                Home
              </Link>
              <Link href="/property" className={getLinkClasses('/property')}>
                Property
              </Link>
              {/* <Link href="/rent" className={getLinkClasses('/rent')}>
                Rent
              </Link> */}
              <Link href="/submit-property" className={getLinkClasses('/submit-property')}>
                Submit Your Property
              </Link>
              <Link href="/pricing" className={getLinkClasses('/pricing')}>
                Pricing
              </Link>
              <div className="pt-4 border-t border-gray-200 flex flex-col space-y-3">
                <Link href="/auth/login" className="text-[var(--color-neutral-700)] hover:text-[var(--color-secondary-600)] font-medium transition-colors">
                  Sign In
                </Link>
                <Button asChild size="sm" color='outline' >
                  <Link href="/auth/signup">Sign Up</Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
