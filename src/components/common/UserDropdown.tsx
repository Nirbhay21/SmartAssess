'use client';

import { LogOutIcon, SettingsIcon, UserIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetRecruiterProfileQuery } from '@/features/recruiter/profile/api';
import { authClient } from '@/lib/auth-client';
import { formatUserName } from '@/lib/utils';

// dropdown no longer receives props; fetch profile internally
export default function UserDropdown() {
  const { data: profile, isSuccess } = useGetRecruiterProfileQuery();

  const router = useRouter();

  const name = formatUserName(profile?.user?.name);
  const email = profile?.user?.email || '';
  const avatarUrl = profile?.user?.avatarUrl;
  const handleLogout = () => {
    authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push('/signin');
        },
      },
    });
  };

  const isReady = isSuccess && profile?.user;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {/* avatar button trigger */}
        <Button variant="ghost" size="icon" className="rounded-full p-0">
          <Avatar size="sm">
            {avatarUrl && <AvatarImage src={avatarUrl} alt={name} />}
            <AvatarFallback>{name.charAt(0)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        {/* header with user info or skeleton */}
        <div className="flex items-center space-x-2.5 px-1.5 py-2">
          {isReady ? (
            <Avatar className="h-7.5 w-7.5">
              {avatarUrl && <AvatarImage src={avatarUrl} alt={name} />}
              <AvatarFallback>{name.charAt(0)}</AvatarFallback>
            </Avatar>
          ) : (
            <Skeleton className="h-7.5 w-7.5 rounded-full" />
          )}
          <div className="flex flex-1 flex-col space-y-1">
            {isReady ? (
              <>
                <p className="font-inter truncate text-sm leading-none font-medium">{name}</p>
                <p className="text-muted-foreground truncate text-xs">{email}</p>
              </>
            ) : (
              <>
                <Skeleton className="mb-1.5 h-3 w-24" />
                <Skeleton className="h-2 w-36" />
              </>
            )}
          </div>
        </div>

        <DropdownMenuSeparator />

        {/* main menu items */}
        <DropdownMenuItem asChild>
          <Link href="/profile" className="flex items-center">
            <UserIcon className="h-4 w-4" />
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href="/settings" className="flex items-center">
            <SettingsIcon className="h-4 w-4" />
            <span>Settings</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* footer with logout item */}
        <DropdownMenuItem
          className="flex items-center gap-2 hover:bg-white/20"
          data-variant="destructive"
          onSelect={handleLogout}
        >
          <LogOutIcon className="text-danger stroke-danger h-4 w-4" />
          <span className="text-danger">Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
