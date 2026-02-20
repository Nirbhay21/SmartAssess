import { ClientFetchOption, SocialProvider } from 'better-auth';
import { AnimatePresence } from 'motion/react';
import * as motion from 'motion/react-client';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import { store } from '@/app/store';
import GithubIcon from '@/components/ui/icons/GithubIcon';
import GoogleIcon from '@/components/ui/icons/GoogleIcon';
import { authApi } from '@/features/auth/api';
import { authClient } from '@/lib/auth-client';
import { cn } from '@/lib/utils';

import AuthErrorMessage from './AuthErrorMessage';

type AllowedProviders = Extract<SocialProvider, 'google' | 'github'>;
type SocialSignInPayload =
  | {
      provider: AllowedProviders;
    }
  | {
      provider: AllowedProviders;
      additionalData: {
        role: UserType;
        termsAccepted: boolean;
      };
    };

type GoogleAndGithubProvidersProps =
  | {
      providerFor: 'signin';
      className?: string;
      requestTermsAcceptance?: () => void;
      termsAccepted?: boolean;
    }
  | {
      providerFor: 'signup';
      userType: UserType;
      className?: string;
      requestTermsAcceptance: () => void;
      termsAccepted: boolean;
    };

type ProviderButtonProps = {
  children: React.ReactNode;
  label: string;
  onClick?: () => void;
  isLoading?: boolean;
  isDisabled?: boolean;
  isSoftDisabled?: boolean;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick' | 'disabled'>;

const ProviderButton = ({
  children: icon,
  label,
  onClick,
  isLoading,
  isDisabled,
  isSoftDisabled,
  ...props
}: ProviderButtonProps) => {
  return (
    <button
      {...props}
      onClick={onClick}
      type="button"
      disabled={isLoading || isDisabled}
      className={cn(
        'bg-input/45 border-border group hover:bg-input/60 active:bg-input/85 active:border-strong flex w-1/2 cursor-pointer items-center justify-center space-x-2 rounded-md border py-2 transition-[color,scale] duration-200 active:scale-98',
        isSoftDisabled && 'cursor-help opacity-80',
        (isLoading || isDisabled) && 'cursor-not-allowed opacity-70',
      )}
    >
      {isLoading ? (
        <>
          <span className="border-muted-foreground h-4 w-4 animate-spin rounded-full border-2 border-t-transparent" />
          <span className="text-muted-foreground text-sm font-semibold">Redirecting...</span>
        </>
      ) : (
        <>
          {icon}
          <span className="text-muted-foreground font-poppins group-hover:text-foreground xxs:text-base text-sm font-semibold transition-[color] duration-200">
            {label}
          </span>
        </>
      )}
    </button>
  );
};

const GoogleAndGithubProviders = (props: GoogleAndGithubProvidersProps) => {
  const { className, providerFor } = props;
  const [loadingProvider, setLoadingProvider] = useState<AllowedProviders | null>(null);
  const [providerError, setProviderError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!providerError) return;

    const clearError = () => {
      setProviderError(null);
    };

    document.addEventListener('focusin', clearError);
    document.addEventListener('pointerdown', clearError);
    document.addEventListener('keydown', clearError);

    return () => {
      document.removeEventListener('focusin', clearError);
      document.removeEventListener('pointerdown', clearError);
      document.removeEventListener('keydown', clearError);
    };
  }, [providerError]);

  const handleSocialAuth = async (provider: AllowedProviders) => {
    if (!props.termsAccepted && providerFor === 'signup') {
      props.requestTermsAcceptance?.();
      return;
    }

    // Build payload (signup includes additional data)
    const payload: SocialSignInPayload =
      providerFor === 'signup' && 'userType' in props
        ? {
            provider,
            additionalData: {
              role: props.userType,
              termsAccepted: props.termsAccepted,
            },
          }
        : { provider };

    const hooks: ClientFetchOption = {
      onRequest: () => {
        setProviderError(null);
        setLoadingProvider(provider);
      },
      onError: (error: unknown) => {
        setLoadingProvider(null);
        const message = error instanceof Error ? error.message : null;
        setProviderError(message || 'An unexpected error occurred. Please try again.');
      },
      onSuccess: async () => {
        // Ensure backend sets `app_meta` so middleware can make routing decisions.
        try {
          store.dispatch(authApi.endpoints.getMe.initiate());
        } catch {
          /* best-effort */
        }

        // defer final redirect to middleware (app_meta)
        router.replace('/signin');
      },
    } as const;

    try {
      await authClient.signIn.social(payload, hooks);
    } catch (error: unknown) {
      setLoadingProvider(null);
      setProviderError(
        error instanceof Error ? error.message : 'An unexpected error occurred. Please try again.',
      );
    }
  };

  const getTitleForProvider = (provider: AllowedProviders) => {
    if (!props.termsAccepted && providerFor === 'signup') {
      return 'Please accept terms to continue';
    }
    return `Continue with ${provider.charAt(0).toUpperCase() + provider.slice(1)}`;
  };

  const isSoftDisabled = !props.termsAccepted && providerFor === 'signup';

  return (
    <>
      <div className={cn('xxs:space-x-4 flex space-x-3', className)}>
        <ProviderButton
          label="Google"
          title={getTitleForProvider('google')}
          onClick={() => handleSocialAuth('google')}
          isLoading={loadingProvider === 'google'}
          isSoftDisabled={isSoftDisabled}
          isDisabled={loadingProvider !== null}
        >
          <GoogleIcon className="h-5 w-5 opacity-85 grayscale transition-[filter,opacity] duration-200 group-hover:opacity-100 group-hover:grayscale-0" />
        </ProviderButton>
        <ProviderButton
          label="Github"
          title={getTitleForProvider('github')}
          onClick={() => handleSocialAuth('github')}
          isLoading={loadingProvider === 'github'}
          isSoftDisabled={isSoftDisabled}
          isDisabled={loadingProvider !== null}
        >
          <GithubIcon className="h-5 w-5 opacity-60 grayscale transition-[filter,opacity] duration-200 group-hover:opacity-100 group-hover:grayscale-0" />
        </ProviderButton>
      </div>

      <AnimatePresence>
        {providerError && (
          <motion.div
            role="alert"
            aria-live="assertive"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.26, ease: 'easeOut' }}
            className="w-full"
          >
            <AuthErrorMessage message={providerError} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default GoogleAndGithubProviders;
