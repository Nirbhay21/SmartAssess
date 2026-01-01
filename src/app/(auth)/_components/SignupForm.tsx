'use client';

import FormField from '@/components/ui/forms/FormField';
import TextLink from '@/components/ui/typography/TextLink';
import UserTypeToggle from '@/components/ui/UserTypeToggle';
import { Building2Icon, CheckIcon, LockIcon, MailIcon, UserIcon } from 'lucide-react';
import React, { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import * as motion from 'motion/react-client';
import GoogleAndGithubProviders from './GoogleAndGithubProviders';
import { cn } from '@/lib/cn';

type CommonFormFields = 'fullname' | 'email' | 'password';

interface BaseSignupFormData {
  fullname: string;
  email: string;
  password: string;
  termsAccepted: boolean;
}

type SignupFormData =
  | (BaseSignupFormData & { accountType: 'recruiter'; companyName: string })
  | (BaseSignupFormData & { accountType: 'candidate' });

const AnimatedField = React.memo(function AnimatedField({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
});

const SignupForm = () => {
  const initialUserType: UserType = 'recruiter';
  const [activeUserType, setActiveUserType] = useState<UserType>(initialUserType);
  const [formData, setFormData] = useState<SignupFormData>({
    accountType: initialUserType,
    fullname: '',
    email: '',
    companyName: '',
    password: '',
    termsAccepted: false,
  });

  const updateCommonField = (field: CommonFormFields, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const updateCompanyName = (value: string) => {
    setFormData((prev) => {
      if (prev.accountType === 'recruiter') {
        return {
          ...prev,
          companyName: value,
        };
      } else {
        return prev;
      }
    });
  };

  const updateTermsAccepted = (accepted: boolean) => {
    setFormData((prev) => ({
      ...prev,
      termsAccepted: accepted,
    }));
  };

  const onUserTypeChange = (newUserType: UserType) => {
    setActiveUserType(newUserType);
    setFormData((prev) => {
      if (newUserType === 'recruiter') {
        return {
          ...prev,
          accountType: 'recruiter',
          companyName: prev.accountType === 'recruiter' ? prev.companyName : '',
        };
      } else {
        return {
          ...prev,
          accountType: 'candidate',
          companyName: undefined,
        };
      }
    });
  };

  console.log(formData);

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission logic here
  };

  return (
    <form className="font-inter flex flex-col space-y-4" onSubmit={handleFormSubmit}>
      <UserTypeToggle
        activeUserType={activeUserType}
        onChange={onUserTypeChange}
        variant="standard"
      />

      <GoogleAndGithubProviders providerFor="signup" userType={activeUserType} className="mt-2" />

      <div>
        <div className="relative my-2 h-px bg-black/35 dark:bg-white/35">
          <span className="bg-card font-poppins text-muted-foreground xsm:text-sm absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 px-2 text-xs font-semibold capitalize">
            Or Continue With
          </span>
        </div>
      </div>

      <AnimatePresence initial={false} mode="popLayout">
        <AnimatedField key="fullname">
          <FormField
            type="text"
            name="fullname"
            id="fullname"
            placeholder="Full name"
            icon={UserIcon}
            error={null}
            helpText={null}
            value={formData.fullname}
            onChange={(event) => updateCommonField('fullname', event.currentTarget.value)}
          />
        </AnimatedField>

        <AnimatedField key="email">
          <FormField
            type="email"
            name="email"
            id="email"
            placeholder="Email address"
            icon={MailIcon}
            error={null}
            helpText={null}
            value={formData.email}
            onChange={(event) => updateCommonField('email', event.currentTarget.value)}
          />
        </AnimatedField>

        {formData.accountType === 'recruiter' && (
          <AnimatedField key="companyName">
            <FormField
              type="text"
              name="companyName"
              id="companyName"
              placeholder="Company Name"
              icon={Building2Icon}
              error={null}
              helpText={null}
              value={formData.companyName}
              onChange={(event) => updateCompanyName(event.currentTarget.value)}
            />
          </AnimatedField>
        )}

        <AnimatedField key="password">
          <FormField
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            icon={LockIcon}
            error={null}
            helpText={null}
            value={formData.password}
            onChange={(event) => updateCommonField('password', event.currentTarget.value)}
          />
        </AnimatedField>
      </AnimatePresence>

      <label className="mt-1 ml-0.5 flex cursor-pointer items-center space-x-2.5 select-none">
        {/* Native checkbox (accessibility anchor) */}
        <input
          type="checkbox"
          name="terms"
          id="terms"
          required
          className="peer sr-only"
          onChange={(event) => updateTermsAccepted(event.currentTarget.checked)}
        />

        {/* Custom checkbox UI */}
        <CheckIcon
          role="presentation"
          className="border-primary/70 peer-focus-visible:ring-primary/70 peer-checked:bg-secondary peer-checked:border-secondary dark:peer-checked:border-secondary h-4 w-4 rounded border bg-transparent text-transparent transition-[opacity,background-color,border] duration-150 peer-checked:text-white peer-focus-visible:ring dark:border-white/50 dark:peer-focus-visible:ring-white/70"
          strokeWidth={3}
          aria-hidden="true"
        />

        {/* Label content */}
        <span className="text-muted-foreground text-sm">
          I agree to the <TextLink href="/terms">terms</TextLink> and{' '}
          <TextLink href="/privacy">privacy policy</TextLink>.
        </span>
      </label>

      <button
        type="submit"
        disabled={!formData.termsAccepted}
        className={cn(
          'bg-primary font-poppins mt-1.5 cursor-pointer rounded-xl px-4 py-4 font-semibold text-white',
          !formData.termsAccepted && 'cursor-auto opacity-70',
          'hover:bg-primary/90 active:bg-primary/80 transition-[background-color,scale] duration-200 active:scale-98',
        )}
      >
        Create Account
      </button>
    </form>
  );
};

export default SignupForm;
