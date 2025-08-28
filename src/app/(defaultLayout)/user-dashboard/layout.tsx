/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React from 'react';
import { Star } from 'lucide-react';

import ClientLayout from '@/app/ClientLayout';
import DashboardSidebar from '@/components/shared/DashboardSidebar';
import { Menu } from 'lucide-react';
import { useCallback, useState } from 'react';
import { useGetMeQuery } from '@/redux/api/authApi';

export default function UserDashboardLayout({ children }: { children: React.ReactNode }) {
    // In real app, get user from context or API
    const { data: userData } = useGetMeQuery();
    const user = {
        name: userData?.profile?.first_name + ' ' + userData?.profile?.last_name || 'Your name',
        email: userData?.profile?.email || 'youname@gmail.com',
        avatarUrl: userData?.profile?.image_url || '/user-avatar.svg',
        role: userData?.profile?.role || 'user'
    };
    const [sidebarOpen, setSidebarOpen] = useState(false);
    // Callback to close sidebar from child
    const handleSidebarNav = useCallback(() => {
        setSidebarOpen(false);
    }, []);
// To list more than one property, please subscribe to our premium plan
    return (
       <>
            <div className="flex justify-center mt-4">
                <div className="flex items-center gap-3 bg-gradient-to-r from-primary-50 to-primary-100 border border-primary-200 rounded-lg px-6 py-3 shadow-sm">
                    <Star className="text-primary-500 w-6 h-6 shrink-0" />
                    <span className="text-gray-800 text-sm md:text-base">
                        To list more than one property, please subscribe to our{' '}
                        <a
                            href="/pricing"
                            className="text-primary-600 font-semibold underline hover:text-primary-700 transition-colors"
                        >
                            premium plan
                        </a>
                        .
                    </span>
                </div>
            </div>
        <div className="relative container max-w-7xl min-[100rem]:max-w-[96rem] mx-auto px-4 sm:px-6 lg:px-8 min-h-[70vh] flex py-12">
            {/* Mobile sidebar toggle button */}
            <button
                className="lg:hidden fixed top-20 left-4 z-40 bg-white border border-gray-200 rounded-full p-2 shadow-md focus:outline-none"
                aria-label="Open sidebar"
                onClick={() => setSidebarOpen(true)}
            >
                <Menu size={24} />
            </button>

            {/* Sidebar fixed on the left for desktop */}
            <div className="hidden lg:block lg:w-1/4 w-full flex-shrink-0">
                <div className="sticky top-24">
                    <DashboardSidebar user={user as any} />
                </div>
            </div>

            {/* Mobile sidebar drawer */}
            {/* Mobile sidebar drawer with transition */}
            <div className={`fixed inset-0 z-50 flex pointer-events-none ${sidebarOpen ? '' : 'invisible'}`} aria-hidden={!sidebarOpen}>
                {/* Overlay */}
                <div
                    className={`fixed inset-0 bg-black/30 transition-opacity duration-300 ${sidebarOpen ? 'opacity-100' : 'opacity-0'}`}
                    onClick={() => setSidebarOpen(false)}
                    aria-label="Close sidebar overlay"
                    style={{ pointerEvents: sidebarOpen ? 'auto' : 'none' }}
                />
                {/* Sidebar panel */}
                <div
                    className={`relative w-72 max-w-full bg-transparent shadow-xl h-full p-0 transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
                    style={{ pointerEvents: sidebarOpen ? 'auto' : 'none' }}
                >
                    <button
                        className="absolute top-3 right-3 z-10 bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center focus:outline-none"
                        aria-label="Close sidebar"
                        onClick={() => setSidebarOpen(false)}
                    >
                        <span className="text-xl">×</span>
                    </button>
                    <DashboardSidebar user={user as any} onNav={handleSidebarNav} />
                </div>
            </div>

            {/* Main content */}
            <div className="lg:w-3/4 w-full lg:pl-10">
                <ClientLayout>
                    {children}
                </ClientLayout>
            </div>
        </div>
       </>
    );
}
