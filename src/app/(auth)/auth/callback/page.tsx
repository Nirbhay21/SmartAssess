'use client';

import { motion } from 'motion/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { Spinner } from '@/components/ui/spinner';
import { authApi } from '@/features/auth/api';
import { useAppDispatch } from '@/hooks/useAppDispatch';

import AuthCard from '../../_components/AuthCard';
import BrandLogo from '../../_components/BrandLogo';

const AuthCardHeader = () => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, ease: 'easeOut' }}
    className="space-y-3 text-center"
  >
    <BrandLogo />

    <h4 className="font-montserrat text-foreground text-[1.30rem] font-semibold tracking-tight">
      Completing your sign in
    </h4>

    <p className="font-inter text-muted-foreground mx-auto max-w-sm text-sm leading-relaxed">
      We&apos;re securely preparing your workspace and syncing your account details. This will only
      take a moment.
    </p>
  </motion.div>
);

export default function AuthCallbackPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(authApi.endpoints.getMe.initiate())
      .unwrap()
      .catch(() => {
        router.replace('/signin');
      })
      .finally(() => router.replace('/signin'));
  }, [dispatch, router]);

  return (
    <AuthCard header={<AuthCardHeader />}>
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.35, ease: 'easeOut', delay: 0.1 }}
        className="flex flex-col items-center justify-center space-y-6"
      >
        <div className="relative">
          <Spinner className="text-primary size-10" />
          <div className="bg-primary/10 absolute inset-0 animate-pulse rounded-full blur-xl" />
        </div>

        <div className="space-y-1 text-center">
          <p className="font-inter text-foreground text-sm font-medium">
            Establishing secure session
          </p>
          <p className="font-inter text-muted-foreground text-xs">
            Please don’t close this window.
          </p>
        </div>
      </motion.div>
    </AuthCard>
  );
}
