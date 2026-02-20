'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { useSession } from '@/lib/auth-client';

export default function DashboardRedirect() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  useEffect(() => {
    if (isPending) return;
    if (!session?.user?.role) {
      router.replace('/signin');
      return;
    }

    router.replace(`/${session.user.role}/dashboard`);
  }, [session, isPending, router]);

  return null;
}
