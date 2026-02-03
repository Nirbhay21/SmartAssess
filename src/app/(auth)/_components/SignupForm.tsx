'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { CheckIcon, LockIcon, MailIcon, UserIcon } from 'lucide-react';
import { AnimatePresence } from 'motion/react';
import * as motion from 'motion/react-client';
import React from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';

import FormField from '@/components/ui/forms/FormField';
import TextLink from '@/components/ui/typography/TextLink';
import UserTypeToggle from '@/components/ui/UserTypeToggle';
import { SIGNUP_FORM_HELPER } from '@/constants/form-helpers';
import { authClient } from '@/lib/auth-client';
import { EmailSignupFormData, EmailSignupSchema } from '@/lib/validation/auth/email-signup.schema';

import AuthDivider from './AuthDivider';
import AuthErrorMessage from './AuthErrorMessage';
import AuthSubmitButton from './AuthSubmitButton';
import GoogleAndGithubProviders from './GoogleAndGithubProviders';

const SignupForm = () => {
  const initialUserType: UserType = 'recruiter';
  const [termsErrorSignal, triggerTermsError] = React.useReducer((x) => x + 1, 0);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
    setError,
    clearErrors,
    setFocus,
    trigger,
  } = useForm<EmailSignupFormData>({
    resolver: zodResolver(EmailSignupSchema),
    mode: 'onChange',
    defaultValues: {
      role: initialUserType,
      termsAccepted: false,
    },
  });

  const watchedAccountType = useWatch({ control, name: 'role' });
  const watchTermsAccepted = useWatch({ control, name: 'termsAccepted' });
  const watchConfirmPassword = useWatch({ control, name: 'confirmPassword' });

  const signup = async (data: EmailSignupFormData) => {
    try {
      await authClient.signUp.email(data, {
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
    <form className="font-inter flex flex-col space-y-4" onSubmit={handleSubmit(signup)} noValidate>
      <Controller
        name="role"
        control={control}
        render={({ field }) => (
          <UserTypeToggle
            activeUserType={field.value}
            onChange={(value) => {
              field.onChange(value);
              clearErrors();
            }}
            variant="standard"
          />
        )}
      />

      <GoogleAndGithubProviders
        providerFor="signup"
        termsAccepted={watchTermsAccepted}
        userType={watchedAccountType}
        className="mt-1.5"
        requestTermsAcceptance={() => {
          // Clear all previous errors
          clearErrors();

          // Set termsAccepted error
          setError('termsAccepted', {
            message: 'Please accept the terms and privacy policy to continue.',
          });

          // Guide focus to the checkbox
          setFocus('termsAccepted', { shouldSelect: true });
          triggerTermsError();

          document
            .getElementById('termsAccepted')
            ?.closest('label')
            ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }}
      />

      <AuthDivider label="or continue with" />

      <div className="mb-4">
        <AnimatePresence mode="wait">
          {errors.root?.message && <AuthErrorMessage message={errors.root.message} />}
        </AnimatePresence>
      </div>

      <div className="flex flex-col space-y-4">
        {/* Full name */}
        <FormField
          type="text"
          id="fullname"
          placeholder="Full name"
          icon={UserIcon}
          autoComplete="name"
          disabled={isSubmitting}
          aria-disabled={isSubmitting}
          error={errors.name?.message}
          helpText={errors.name ? SIGNUP_FORM_HELPER.name : null}
          {...register('name', {
            onChange: () => clearErrors('root'),
          })}
        />

        {/* Email */}
        <FormField
          type="email"
          id="email"
          placeholder="Email address"
          icon={MailIcon}
          autoComplete="email"
          disabled={isSubmitting}
          aria-disabled={isSubmitting}
          error={errors.email?.message}
          helpText={errors.email ? SIGNUP_FORM_HELPER.email : null}
          {...register('email', {
            onChange: () => clearErrors('root'),
          })}
        />

        {/* Password */}
        <FormField
          type="password"
          id="password"
          placeholder="Password"
          icon={LockIcon}
          autoComplete="new-password"
          disabled={isSubmitting}
          aria-disabled={isSubmitting}
          error={errors.password?.message}
          helpText={errors.password ? SIGNUP_FORM_HELPER.password : null}
          {...register('password', {
            onChange: () => {
              clearErrors('root');
              if (watchConfirmPassword) {
                trigger('confirmPassword');
              }
            },
          })}
        />

        {/* Confirm Password */}
        <FormField
          type="password"
          id="confirmPassword"
          placeholder="Confirm password"
          icon={LockIcon}
          autoComplete="new-password"
          disabled={isSubmitting}
          aria-disabled={isSubmitting}
          error={errors.confirmPassword?.message}
          helpText={errors.confirmPassword ? SIGNUP_FORM_HELPER.confirmPassword : null}
          {...register('confirmPassword', {
            onChange: () => clearErrors('root'),
          })}
        />
      </div>

      <label className="mt-1 ml-0.5 flex cursor-pointer items-center space-x-2.5 select-none">
        {/* Native checkbox (accessibility anchor) */}
        <input
          type="checkbox"
          id="termsAccepted"
          className="peer sr-only"
          disabled={isSubmitting}
          aria-disabled={isSubmitting}
          {...register('termsAccepted')}
        />

        {/* Custom checkbox UI */}
        <CheckIcon
          role="presentation"
          className="border-primary/70 peer-checked:bg-secondary peer-checked:border-secondary peer-focus-visible:ring-primary peer-focus-visible:ring-offset-background peer-focus:ring-offset-background h-4 w-4 rounded border bg-transparent text-transparent transition-all duration-200 peer-checked:text-white peer-focus:ring-1 peer-focus:ring-black peer-focus-visible:ring-1 dark:border-white/50 peer-focus:dark:ring-white dark:peer-focus-visible:ring-white/70"
          strokeWidth={3}
          aria-hidden="true"
        />

        {/* Label content */}
        <span className="text-muted-foreground text-sm">
          I agree to the <TextLink href="/terms">terms</TextLink> and{' '}
          <TextLink href="/privacy">privacy policy</TextLink>.
        </span>
      </label>

      <AnimatePresence mode="wait" initial={false}>
        {errors.termsAccepted && (
          <motion.p
            role="alert"
            key={termsErrorSignal}
            initial={{ opacity: 0, y: -1.5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -1.5 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="text-danger -mt-3 text-xs"
          >
            {errors.termsAccepted.message}
          </motion.p>
        )}
      </AnimatePresence>

      <AuthSubmitButton className="w-full" loading={isSubmitting} loadingText="Signing up…">
        Sign Up
      </AuthSubmitButton>
    </form>
  );
};

export default SignupForm;
