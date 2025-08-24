
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { Building2, ChevronDown, Home, LogOut, Menu, Tag, Users } from "lucide-react";
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
    const [showDropdown, setShowDropdown] = React.useState(false);
    return (
        <aside
            className={`fixed z-40 inset-y-0 left-0 w-64 bg-white dark:bg-[var(--color-neutral-900)] border-r border-gray-100 dark:border-[var(--color-neutral-800)] flex flex-col transition-transform duration-200 lg:static lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}
        >
            <div className="flex items-center gap-2 px-6 py-6">
                <Image src="/logo.svg" alt="Logo" width={36} height={36} className="h-20 w-full" />
                {/* <span className="font-bold text-lg tracking-tight text-[var(--color-primary-600)] dark:text-[var(--color-primary-400)]">Domettra</span> */}
            </div>
            <nav className="flex-1 px-2 space-y-1">
                {(Array.isArray(navItems) ? navItems : []).map((item, idx) => (
                    <div key={item.label}>
                        {item.children ? (
                            <>
                                <button
                                    className={`flex items-center w-full px-4 py-2 rounded-lg gap-3 transition-colors font-medium ${pathname.startsWith(item.href) ? "bg-[var(--color-primary-50)] dark:bg-[var(--color-primary-900)] text-[var(--color-primary-700)] dark:text-[var(--color-primary-200)]" : "hover:bg-gray-50 dark:hover:bg-[var(--color-neutral-800)] text-[var(--color-neutral-700)] dark:text-[var(--color-neutral-200)]"}`}
                                    onClick={() => setShowDropdown((v) => !v)}
                                >
                                    {item.icon}
                                    <span className="flex-1 text-left">{item.label}</span>
                                    <ChevronDown size={16} className={`transition-transform ${showDropdown ? "rotate-180" : ""}`} />
                                </button>
                                {showDropdown && (
                                    <div className="ml-8 mt-1 space-y-1">
                                        {item?.children?.map((child) => (
                                            <Link
                                                key={child.label}
                                                href={child.href}
                                                className={`block px-4 py-2 rounded-lg text-sm transition-colors ${pathname === child.href ? "bg-[var(--color-primary-50)] dark:bg-[var(--color-primary-900)] text-[var(--color-primary-700)] dark:text-[var(--color-primary-200)]" : "hover:bg-gray-50 dark:hover:bg-[var(--color-neutral-800)] text-[var(--color-neutral-700)] dark:text-[var(--color-neutral-200)]"}`}
                                                onClick={onClose}
                                            >
                                                {child.label}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </>
                        ) : (
                            <Link
                                href={item.href}
                                className={`flex items-center px-4 py-2 rounded-lg gap-3 transition-colors font-medium border-l-2 ${pathname === item.href
                                    ? 'border-[var(--color-secondary-600)] bg-[var(--color-primary-50)] dark:bg-[var(--color-primary-900)] text-[var(--color-primary-700)] dark:text-[var(--color-primary-200)]'
                                    : 'border-transparent hover:bg-gray-50 dark:hover:bg-[var(--color-neutral-800)] text-[var(--color-neutral-700)] dark:text-[var(--color-neutral-200)]'
                                    }`}
                                onClick={onClose}
                            >
                                {item.icon}
                                <span>{item.label}</span>
                            </Link>
                        )}
                    </div>
                ))}
                <Link
                    href="/logout"
                    className="flex items-center px-4 py-2 rounded-lg gap-3 transition-colors font-medium text-[var(--color-error-600)] hover:bg-gray-50 dark:hover:bg-[var(--color-neutral-800)] mt-8"
                    onClick={onClose}
                >
                    <LogOut size={20} />
                    <span>Logout</span>
                </Link>
            </nav>
        </aside>
    );
}

function DashboardHeader() {
    return (
        <header className="flex items-center justify-between px-8 pt-4 pb-4 flex-wrap ml-16 lg:ml-0">
            <div>
                <h1 className="text-2xl font-semibold text-[var(--color-neutral-900)] dark:text-[var(--color-neutral-50)]">Hello Robert <span className="inline-block">👋</span></h1>
                <p className="text-sm text-[var(--color-neutral-500)] dark:text-[var(--color-neutral-400)]">Good Morning</p>
            </div>
            <div className="flex items-center gap-3 bg-[var(--color-neutral-100)] dark:bg-[var(--color-neutral-800)] px-4 py-2 rounded-lg">
                <Image src="/user-avatar.svg" alt="User" width={40} height={40} className="rounded-full" />
                <div className="text-right">
                    <div className="font-medium text-[var(--color-neutral-900)] dark:text-[var(--color-neutral-50)]">Robert Allen</div>
                    <div className="text-xs text-[var(--color-neutral-500)] dark:text-[var(--color-neutral-400)]">HR Manager</div>
                </div>
            </div>
        </header>
    );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = React.useState(false);
    return (
        <div className="h-screen w-screen flex bg-[var(--background)] text-[var(--foreground)] overflow-hidden">
            {/* Mobile sidebar toggle */}
            <button
                className="fixed top-4 left-4 z-50 p-2 rounded-md bg-white dark:bg-[var(--color-neutral-900)] border border-gray-200 dark:border-[var(--color-neutral-800)] shadow lg:hidden"
                onClick={() => setSidebarOpen(true)}
                aria-label="Open sidebar"
            >
                <Menu size={24} />
            </button>
            {/* Sidebar */}
            <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            {/* Overlay for mobile */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-30 bg-black/40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}
            {/* Main content with fixed header and scrollable body */}
            <div className="flex-1 flex flex-col min-h-0">
                <div className="shrink-0">
                    <DashboardHeader />
                </div>
                <main className="flex-1 min-h-0 overflow-auto p-6 bg-[var(--background)] text-[var(--foreground)]">
                    {children}
                </main>
            </div>
        </div>
    );
}
