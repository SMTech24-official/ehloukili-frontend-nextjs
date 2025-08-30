import type { ReactNode } from 'react';
import '../globals.css';
import Image from 'next/image';
import Logo from '@/components/shared/Logo';

export default function AuthLayout({ children }: { children: ReactNode }) {
    return (
        <>
            <div className="h-screen flex flex-col md:flex-row font-roboto bg-white overflow-hidden container mx-auto">
                {/* Left: Logo and Form */}
                <div className="flex flex-col w-full lg:w-1/2 min-h-screen">
                    {/* Logo top left */}
                    <div className="flex items-center gap-2 px-6 pt-6 md:pt-10 md:px-12">
                       <Logo />
                    </div>
                    {/* Form center left */}
                    <div className="flex-1 flex items-center justify-center px-4 md:px-0">
                        <div className="w-full max-w-md">
                            {children}
                        </div>
                    </div>
                </div>
                {/* Right: Illustration */}
                <div className="hidden lg:flex w-1/2 min-h-screen items-center justify-center bg-[#F8F8F8]">
                    <Image
                        src="/signupRight.svg"
                        alt="Sign up visual"
                        width={600}
                        height={800}
                        className="object-cover h-full w-full"
                        priority
                    />
                </div>
            </div>
        </>
    );
}
