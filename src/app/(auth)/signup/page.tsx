import Logo from '@/components/common/Logo';
import TextLink from '@/components/ui/typography/TextLink';
import SignupForm from '../_components/SignupForm';
import { Metadata } from 'next';
import BrandLogo from '../_components/BrandLogo';
import AuthCard from '../_components/AuthCard';

export const metadata: Metadata = {
  title: 'Signup',
};

const AuthCardHeader = () => (
  <>
    <BrandLogo />
    <h2 className="font-montserrat text-foreground/85 mb-1 text-2xl font-bold">Hire the Best</h2>
    <p className="font-inter text-muted-foreground mb-6">
      Start your journey with <span className="font-semibold">SmartAssess.</span>
    </p>
  </>
);

const AuthCardFooter = () => (
  <p className="font-inter text-sm">
    Already have an account? <TextLink href="/signin">Signin</TextLink>
  </p>
);

const SignupPage = () => {
  return (
    <main role="main" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <AuthCard header={<AuthCardHeader />} footer={<AuthCardFooter />}>
        <SignupForm />
      </AuthCard>
    </main>
  );
};

export default SignupPage;
