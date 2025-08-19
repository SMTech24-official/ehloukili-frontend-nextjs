import React from 'react';
import SignInForm from '@/features/auth/SignInForm';
import Image from 'next/image';

const SignInPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row font-roboto bg-white">
      {/* Left: Logo and Form */}
      <div className="flex flex-col w-full md:w-1/2 min-h-screen">
        {/* Logo top left */}
        <div className="flex items-center gap-2 px-6 pt-6 md:pt-10 md:px-12">
          <Image src="/logo.svg" alt="Logo" width={40} height={40} priority />
          <span className="text-lg md:text-xl font-bold text-[#1A1A1A] tracking-tight">Domettra</span>
        </div>
        {/* Form center left */}
        <div className="flex-1 flex items-center justify-center px-4 md:px-0">
          <div className="w-full max-w-md">
            <SignInForm />
          </div>
        </div>
      </div>
      {/* Right: Illustration */}
      <div className="hidden md:flex w-1/2 min-h-screen items-center justify-center bg-[#F8F8F8]">
        <Image
          src="/signupRight.svg"
          alt="Sign in visual"
          width={600}
          height={800}
          className="object-contain h-full w-full"
          priority
        />
      </div>
    </div>
  );
};

export default SignInPage;
