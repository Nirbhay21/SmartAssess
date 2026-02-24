'use client';

import {
  BrainIcon,
  Building2Icon,
  LayoutDashboardIcon,
  SettingsIcon,
  SparklesIcon,
  UsersIcon,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import Logo from '@/components/common/Logo';
import { SidebarUserFooter } from '@/components/common/SidebarUserFooter';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

export function AppSidebar() {
  const { state } = useSidebar();
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="gap-1.5 hover:bg-transparent active:bg-transparent"
            >
              <Link
                href="/recruiter/dashboard"
                className={cn(
                  'flex items-center transition-transform duration-200',
                  state === 'collapsed' ? '-translate-x-1.5' : 'translate-x-0',
                )}
              >
                <Logo className="h-7! w-7.5!" />
                <span className="font-montserrat text-lg font-semibold">SmartAssess</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>General</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname?.startsWith('/recruiter/dashboard')}
                  tooltip="Dashboard"
                >
                  <Link href="/recruiter/dashboard">
                    <LayoutDashboardIcon />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname?.startsWith('/recruiter/assessments')}
                  tooltip="Assessments"
                >
                  <Link href="/recruiter/assessments">
                    <BrainIcon />
                    <span>Assessments</span>
                  </Link>
                </SidebarMenuButton>
                <SidebarMenuBadge>4</SidebarMenuBadge>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname?.startsWith('/recruiter/candidates')}
                  tooltip="Candidates"
                >
                  <Link href="/recruiter/candidates">
                    <UsersIcon className="h-4 w-4" />
                    <span>Candidates</span>
                  </Link>
                </SidebarMenuButton>
                <SidebarMenuBadge>26</SidebarMenuBadge>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname?.startsWith('/recruiter/ai-tools')}
                  tooltip="AI Tools"
                >
                  <Link href="/recruiter/ai-tools">
                    <SparklesIcon />
                    <span>AI Tools</span>
                  </Link>
                </SidebarMenuButton>
                <SidebarMenuBadge>1</SidebarMenuBadge>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>System</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname?.startsWith('/recruiter/organization')}
                  tooltip="Organization"
                >
                  <Link href="/recruiter/organization">
                    <Building2Icon />
                    <span>Organization</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname?.startsWith('/recruiter/settings')}
                  tooltip="Settings"
                >
                  <Link href="/recruiter/settings">
                    <SettingsIcon />
                    <span>Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="mt-auto border-t">
        <SidebarUserFooter />
      </SidebarFooter>
    </Sidebar>
  );
}
