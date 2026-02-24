'use client';

import dynamic from 'next/dynamic';

import UserDropdown from '@/components/common/UserDropdown';
import { SidebarTrigger } from '@/components/ui/sidebar';

const ThemeMenu = dynamic(() => import('@/components/common/ThemeMenu'), { ssr: false });

const DashboardHeader = () => {
  return (
    <header className="border-b px-4 py-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3.5">
          <SidebarTrigger variant="outline" className="rounded-sm" />
          <h1 className="font-montserrat text-xl font-semibold">Dashboard</h1>
        </div>
        <div className="flex items-center space-x-2">
          <ThemeMenu />
          <UserDropdown />
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
