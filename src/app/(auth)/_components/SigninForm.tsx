'use client';

import FormField from '@/components/ui/forms/FormField';
import AuthDivider from './AuthDivider';
import GoogleAndGithubProviders from './GoogleAndGithubProviders';
import { LockIcon, UserIcon } from 'lucide-react';
import TextLink from '@/components/ui/typography/TextLink';
import AuthSubmitButton from './AuthSubmitButton';
import { useState } from 'react';
import AuthErrorMessage from './AuthErrorMessage';
import { AnimatePresence } from 'motion/react';

type SigninField = 'email' | 'password';
interface SigninFormData {
  email: string;
  password: string;
}

const SigninForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const signin = async (data: SigninFormData) => {
    // Simulate an API call
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        reject(new Error('Invalid email or password'));
      }, 800);
    });
  };

  const handleOnChange = (value: string, field: SigninField) => {
    setError(null);
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleOnSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Signin Form Data:', formData);
    // Handle form submission logic here

    if (isSubmitting) return;

    try {
      setIsSubmitting(true);
      const data = { email: formData.email, password: formData.password };
      await signin(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <GoogleAndGithubProviders providerFor="signin" />
      <AuthDivider label="or continue with" />
      <div className="mb-4">
        <AnimatePresence mode="wait">
          {error && <AuthErrorMessage message={error} key={error} />}
        </AnimatePresence>
      </div>
      <div className="space-y-4">
        <FormField
          id="email"
          type="email"
          icon={UserIcon}
          placeholder="Email"
          error={null}
          helpText={null}
          value={formData.email}
          disabled={isSubmitting}
          autoComplete="email"
          onChange={(e) => handleOnChange(e.target.value, 'email')}
        />
        <FormField
          id="password"
          type="password"
          icon={LockIcon}
          placeholder="Password"
          error={null}
          helpText={null}
          value={formData.password}
          disabled={isSubmitting}
          autoComplete="current-password"
          onChange={(e) => handleOnChange(e.target.value, 'password')}
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
