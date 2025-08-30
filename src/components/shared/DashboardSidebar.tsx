/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { User, LogOut, Heart, ChevronRight, TrendingUp } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import { useLogoutModal } from '@/hooks/useLogout';
import LogoutModal from './LogoutModal';
export interface DashboardSidebarProps {
  user: { name: string; email: string; avatarUrl?: string; role?: 'user' | 'agent' };
  onNav?: () => void;
}

const navItems = [
  { key: 'profile', label: 'My Profile', icon: <User size={18} />, href: '/user-dashboard/profile' },
  { key: 'saved', label: 'Save Property', icon: <Heart size={18} />, href: '/user-dashboard/saved-properties' },
  { key: 'market_trends', label: 'Market Trends', icon: <TrendingUp size={18} />, href: '/user-dashboard/market-trends' },
  { key: 'dashboard', label: 'Dashboard', icon: <Heart size={18} />, href: '/agent/dashboard' },
];
// const NAV_ITEMS_AGENT = [
//   { key: 'profile', label: 'My Profile', icon: <User size={18} />, href: '/user-dashboard/profile' },
//   { key: 'dashboard', label: 'Dashboard', icon: <Heart size={18} />, href: '/user-dashboard/agent-dashboard' },
// ];

export default function DashboardSidebar({ user, onNav }: DashboardSidebarProps) {
  let pathname = usePathname();
  const { open: isLogoutModal, showModal, hideModal, handleLogout, isLoading } = useLogoutModal();
  // Normalize pathname to remove trailing slash for matching
  if (pathname && pathname.length > 1 && pathname.endsWith('/')) {
    pathname = pathname.slice(0, -1);
  }
  const handleNav = (href: string) => {
    if (onNav) onNav();
  };
  // const navItems = user.role === 'agent' ? NAV_ITEMS_AGENT : NAV_ITEMS_USER;
  return (
    <aside className="bg-white rounded-xl shadow-md p-6 w-full max-w-xs flex flex-col items-center gap-6 min-h-[400px]">
      <Image
        src={user.avatarUrl || '/images/avatar-placeholder.png'}
        alt={user.name}
        width={64}
        height={64}
        className="w-16 h-16 rounded-full object-cover border-2 border-primary-100 hover:scale-105 transition-transform duration-200"
      />
      <div className="text-center">
        <div className="font-semibold text-lg">{user.name}</div>
        <div className="text-gray-500 text-sm">{user.email}</div>
      </div>
      <nav className="w-full flex-1">
        <ul className="flex flex-col gap-2">
          {navItems.map(item => (
            <li key={item.key}>
              <Link
                href={item.href}
                className={`flex items-center w-full px-4 py-2 rounded-lg text-left gap-2 group transition-colors ${pathname === item.href ? 'bg-primary-50 text-primary-700 font-semibold' : 'hover:bg-gray-50'}`}
                onClick={() => handleNav(item.href)}
                scroll={false}
              >
                {item.icon}
                <span className="flex-1">{item.label}</span>
                <ChevronRight size={16} className="ml-auto text-gray-400 group-hover:text-primary-500" />
              </Link>
            </li>
          ))}
          <li>
            <button onClick={showModal} className="flex items-center w-full px-4 py-2 rounded-lg text-left gap-2 text-red-500 hover:bg-red-50 transition-colors">
              <LogOut size={18} />
              <span className="flex-1">Log Out</span>
            </button>
          </li>
        </ul>
      </nav>
      <LogoutModal
        open={isLogoutModal}
        loading={isLoading}
        onConfirm={handleLogout}
        onCancel={hideModal}
      />
    </aside>
  );
}
