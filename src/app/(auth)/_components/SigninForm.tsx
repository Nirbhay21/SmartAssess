'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { LockIcon, MailIcon } from 'lucide-react';
import { AnimatePresence } from 'motion/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import FormField from '@/components/ui/forms/FormField';
import TextLink from '@/components/ui/typography/TextLink';
import { useGetOnboardingStatusQuery } from '@/features/onboarding/api';
import { authClient, useSession } from '@/lib/auth-client';
import { EmailSigninFormData, EmailSigninSchema } from '@/lib/validation/auth/email-signin.schema';

import AuthDivider from './AuthDivider';
import AuthErrorMessage from './AuthErrorMessage';
import AuthSubmitButton from './AuthSubmitButton';
import GoogleAndGithubProviders from './GoogleAndGithubProviders';

const SigninForm = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const { data: onboarding } = useGetOnboardingStatusQuery(undefined, {
    skip: !session, // Skip the query if there's no session data
    refetchOnReconnect: true, // Refetch the onboarding status when the network reconnects
  });

  useEffect(() => {
    if (
      (onboarding?.status === 'not_started' || onboarding?.status === 'in_progress') &&
      session?.user?.role
    ) {
      router.push(`/${session.user.role}/onboarding`);
    }
  }, [onboarding?.status, session?.user?.role, router]);

  useEffect(() => {
    if (onboarding?.status === 'completed' && session?.user?.role) {
      router.push(`/${session.user.role}/dashboard`);
    }
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    clearErrors,
  } = useForm<EmailSigninFormData>({
    resolver: zodResolver(EmailSigninSchema),
    mode: 'onSubmit',
  });

  const signin = async (data: EmailSigninFormData) => {
    try {
      await authClient.signIn.email(data, {
        onError: (error) => {
          setError('root', {
            type: 'server',
            message: error.error.message || 'An unexpected error occurred. Please try again.',
          });
        },
      });
    } catch (error) {
      setError('root', {
        type: 'server',
        message:
          error instanceof Error
            ? error.message
            : 'An unexpected error occurred. Please try again.',
      });
    }
  };

  return (
    <form className="font-inter flex flex-col space-y-4" onSubmit={handleSubmit(signin)} noValidate>
      <GoogleAndGithubProviders providerFor="signin" className="mb-1.5" />

      <AuthDivider label="or continue with" />

      <div className="mb-4">
        <AnimatePresence mode="wait">
          {errors.root?.message && <AuthErrorMessage message={errors.root.message} />}
        </AnimatePresence>
      </div>

      <div className="space-y-4">
        <FormField
          id="email"
          type="email"
          placeholder="Email address"
          icon={MailIcon}
          autoComplete="email"
          disabled={isSubmitting}
          aria-disabled={isSubmitting}
          error={errors.email?.message}
          {...register('email', { onChange: () => clearErrors('root') })}
        />

        <FormField
          id="password"
          type="password"
          placeholder="Password"
          icon={LockIcon}
          autoComplete="current-password"
          disabled={isSubmitting}
          aria-disabled={isSubmitting}
          error={errors.password?.message}
          {...register('password', { onChange: () => clearErrors('root') })}
        />
      </div>

      <div className="mt-2 mb-4 text-end">
        <TextLink href="/forgot-password">Forgot your password?</TextLink>
      </div>

      <AuthSubmitButton className="w-full" loading={isSubmitting} loadingText="Signing in…">
        Sign In
      </AuthSubmitButton>
    </form>
  );
};

export default SigninForm;
