/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React from 'react';

import DashboardSidebar from '@/components/shared/DashboardSidebar';
import ClientLayout from '@/app/ClientLayout';
import { Menu } from 'lucide-react';
import { useState, useCallback } from 'react';

export default function UserDashboardLayout({ children }: { children: React.ReactNode }) {
    // In real app, get user from context or API
    const user = {
        name: 'Your name',
        email: 'youname@gmail.com',
        avatarUrl: '/user-avatar.svg',
        role:'user'
    };
    const [sidebarOpen, setSidebarOpen] = useState(false);
    // Callback to close sidebar from child
    const handleSidebarNav = useCallback(() => {
        setSidebarOpen(false);
    }, []);

    return (
        <div className="relative container sm:px-6 lg:px-8 mx-auto py-10 px-4 min-h-[70vh] flex">
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
    );
}
