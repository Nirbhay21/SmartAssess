import type { ReactNode } from 'react';

import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

import { AppSidebar } from '../_components/AppSidebar';
import DashboardHeader from '../_components/DashboardHeader';

export default function OnboardingLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider data-shadcn>
      <AppSidebar />
      <SidebarInset>
        <DashboardHeader />
        <main>{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
