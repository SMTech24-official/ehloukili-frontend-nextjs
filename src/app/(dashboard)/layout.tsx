'use client';
import { DashboardProvider, useDashboard } from "@/providers/DashboardProvider";
import { Building2, Home, LogOut, Menu, Tag, Users, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const navItems = [
    { label: "Dashboard", icon: <Home size={20} />, href: "/agent/dashboard" },
    {
        label: "All Properties",
        icon: <Building2 size={20} />,
        href: "/agent/properties",
        children: [
            { label: "All Properties", href: "/agent/properties" },
            // Add more if needed
        ],
    },
    { label: "All Tenants", icon: <Users size={20} />, href: "/agent/tenants" },
    { label: "Pricing", icon: <Tag size={20} />, href: "/agent/pricing" },
];

function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
    const pathname = usePathname();

    return (
        <>
            {/* Mobile Overlay */}
            {open && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
                    onClick={onClose}
                    aria-hidden="true"
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed z-50 inset-y-0 left-0 w-64 bg-white dark:bg-[var(--color-neutral-900)] border-r border-gray-200 dark:border-[var(--color-neutral-800)] flex flex-col transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 lg:z-auto ${open ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                {/* Logo Section */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-[var(--color-neutral-800)]">
                    <div className="flex items-center gap-2">
                        <Image src="/logo.svg" alt="Logo" width={32} height={32} className="flex-shrink-0" />
                        <span className="font-bold text-lg tracking-tight text-[var(--color-primary-600)] dark:text-[var(--color-primary-400)]">
                            Domettra
                        </span>
                    </div>
                    {/* Close button for mobile */}
                    <button
                        onClick={onClose}
                        className="lg:hidden p-1 rounded-md hover:bg-gray-100 dark:hover:bg-[var(--color-neutral-800)] transition-colors"
                        aria-label="Close sidebar"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
                    {navItems.map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            className={`flex items-center px-3 py-2.5 rounded-lg gap-3 transition-all duration-200 font-medium text-sm group ${pathname === item.href
                                    ? 'bg-[var(--color-primary-50)] dark:bg-[var(--color-primary-900)] text-[var(--color-primary-700)] dark:text-[var(--color-primary-200)] shadow-sm'
                                    : 'text-[var(--color-neutral-700)] dark:text-[var(--color-neutral-200)] hover:bg-gray-50 dark:hover:bg-[var(--color-neutral-800)] hover:text-[var(--color-neutral-900)] dark:hover:text-[var(--color-neutral-50)]'
                                }`}
                            onClick={onClose}
                        >
                            <span className={`transition-colors ${pathname === item.href ? 'text-[var(--color-primary-600)]' : 'text-[var(--color-neutral-500)] group-hover:text-[var(--color-neutral-700)]'}`}>
                                {item.icon}
                            </span>
                            <span className="flex-1">{item.label}</span>
                        </Link>
                    ))}
                </nav>

                {/* Logout Button */}
                <div className="p-3 border-t border-gray-200 dark:border-[var(--color-neutral-800)]">
                    <Link
                        href="/logout"
                        className="flex items-center px-3 py-2.5 rounded-lg gap-3 transition-all duration-200 font-medium text-sm text-[var(--color-error-600)] hover:bg-[var(--color-error-50)] dark:hover:bg-[var(--color-error-900)] hover:text-[var(--color-error-700)] dark:hover:text-[var(--color-error-300)]"
                        onClick={onClose}
                    >
                        <LogOut size={20} />
                        <span>Logout</span>
                    </Link>
                </div>
            </aside>
        </>
    );
}

function DashboardHeader() {
    const { pageTitle, pageSubtitle } = useDashboard();

    return (
        <header className="flex-shrink-0 bg-white dark:bg-[var(--color-neutral-900)] border-b border-gray-200 dark:border-[var(--color-neutral-800)] px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
                {/* Title Section */}
                <div className="min-w-0 flex-1 mr-4">
                    <h1 className="text-xl sm:text-2xl font-semibold text-[var(--color-neutral-900)] dark:text-[var(--color-neutral-50)] truncate">
                        {pageTitle || "Dashboard"}
                    </h1>
                    {pageSubtitle && (
                        <p className="text-sm text-[var(--color-neutral-500)] dark:text-[var(--color-neutral-400)] mt-1 truncate">
                            {pageSubtitle}
                        </p>
                    )}
                </div>

                {/* User Profile */}
                <div className="flex items-center gap-3 bg-[var(--color-neutral-50)] dark:bg-[var(--color-neutral-800)] px-3 py-2 rounded-lg border border-gray-200 dark:border-[var(--color-neutral-700)] flex-shrink-0">
                    <Image
                        src="/user-avatar.svg"
                        alt="User Avatar"
                        width={32}
                        height={32}
                        className="rounded-full flex-shrink-0"
                    />
                    <div className="text-right hidden sm:block">
                        <div className="font-medium text-sm text-[var(--color-neutral-900)] dark:text-[var(--color-neutral-50)]">
                            Robert Allen
                        </div>
                        <div className="text-xs text-[var(--color-neutral-500)] dark:text-[var(--color-neutral-400)]">
                            HR Manager
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

function MobileMenuButton({ onClick }: { onClick: () => void }) {
    return (
        <button
            className="fixed top-4 left-4 z-30 p-2 rounded-lg bg-white dark:bg-[var(--color-neutral-900)] border border-gray-200 dark:border-[var(--color-neutral-800)] shadow-md lg:hidden transition-all duration-200 hover:shadow-lg"
            onClick={onClick}
            aria-label="Open navigation menu"
        >
            <Menu size={20} className="text-[var(--color-neutral-700)] dark:text-[var(--color-neutral-300)]" />
        </button>
    );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <DashboardProvider>
            <DashboardLayoutContent>{children}</DashboardLayoutContent>
        </DashboardProvider>
    );
}

function DashboardLayoutContent({ children }: { children: React.ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = React.useState(false);

    // Close sidebar when clicking outside on mobile
    React.useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setSidebarOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="h-screen w-full flex bg-[var(--background)] text-[var(--foreground)] overflow-hidden">
            {/* Mobile Menu Button */}
            <MobileMenuButton onClick={() => setSidebarOpen(true)} />

            {/* Sidebar */}
            <div className="hidden lg:flex lg:flex-shrink-0">
                <div className="w-64">
                    <Sidebar open={false} onClose={() => { }} />
                </div>
            </div>

            {/* Mobile Sidebar */}
            <div className="lg:hidden">
                <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            </div>

            {/* Main Content Area */}
            <div className="flex flex-col min-w-0 flex-1 overflow-hidden">
                {/* Header */}
                <DashboardHeader />

                {/* Main Content */}
                <main className="flex-1 min-h-0 overflow-auto bg-[var(--background)]">
                    {/* Content Container with proper padding and max-width */}
                    <div className="h-full w-full max-w-none overflow-x-auto">
                        <div className="min-h-full px-4 sm:px-6 lg:px-8 py-6">
                            {children}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}