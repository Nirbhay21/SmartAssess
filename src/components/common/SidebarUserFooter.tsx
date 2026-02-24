'use client';

import { ChevronDownIcon, LogOutIcon, SettingsIcon, UserIcon } from 'lucide-react';
import Link from 'next/link';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useSidebar } from '@/components/ui/sidebar';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetRecruiterProfileQuery } from '@/features/recruiter/profile/api';
import { authClient } from '@/lib/auth-client';
import { cn, formatUserName } from '@/lib/utils';

export type SidebarUser = {
  name: string;
  email: string;
  avatarUrl?: string;
};

export function SidebarUserFooter() {
  const { state } = useSidebar();
  const { data: profile, isSuccess } = useGetRecruiterProfileQuery();

  const isReady = isSuccess && profile?.user;
  const handleLogout = () => authClient.signOut();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            'flex w-full items-center justify-between rounded-md p-2 transition-colors',
            'hover:bg-accent/10',
          )}
        >
          <div
            className={cn(
              'flex items-center gap-2 transition-transform duration-200',
              state === 'collapsed' && '-translate-x-2',
            )}
          >
            {isReady ? (
              <Avatar className="h-8 w-8 rounded-xs">
                {profile?.user?.avatarUrl && (
                  <AvatarImage src={profile.user.avatarUrl} alt={profile.user.name} />
                )}
                <AvatarFallback className="font-inter rounded-sm">
                  {profile?.user?.name?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            ) : (
              <Skeleton className="h-8 w-8 rounded-sm" />
            )}
            {state === 'expanded' && (
              <div className="flex flex-col text-start">
                {isReady ? (
                  <>
                    <span className="font-inter truncate text-sm font-medium capitalize">
                      {formatUserName(profile?.user?.name)}
                    </span>
                    <span className="text-muted-foreground truncate text-xs">
                      {profile?.user?.email}
                    </span>
                  </>
                ) : (
                  <>
                    <Skeleton className="mb-1.5 h-3 w-24" />
                    <Skeleton className="h-2 w-38" />
                  </>
                )}
              </div>
            )}
          </div>
          {state === 'expanded' && <ChevronDownIcon className="h-4 w-4" />}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" side="right" className="w-48">
        <DropdownMenuItem asChild>
          <Link href="/recruiter/profile" className="flex items-center">
            <UserIcon className="h-4 w-4" />
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/recruiter/settings" className="flex items-center">
            <SettingsIcon className="h-4 w-4" />
            <span>Settings</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <button className="flex w-full items-center space-x-2" onClick={handleLogout}>
            <LogOutIcon className="h-4 w-4" />
            <span>Logout</span>
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
