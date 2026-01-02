import TextLink from '@/components/ui/typography/TextLink';
import AuthCard from '../_components/AuthCard';
import SigninForm from '../_components/SigninForm';
import BrandLogo from '../_components/BrandLogo';

const AuthCardHeader = () => (
  <header>
    <BrandLogo />
    <h4 className="font-montserrat text-foreground/85 mb-1 text-2xl font-bold">Welcome back</h4>
    <p className="font-inter text-muted-foreground mb-6">
      Sign in to continue managing interviews and assessments.
    </p>
  </header>
);

const AuthCardFooter = () => (
  <footer className="font-inter text-sm">
    Don&apos;t have an account? <TextLink href="/signup">Sign up</TextLink>
  </footer>
);

const SigninPage = () => {
  return (
    <main role="main" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <AuthCard header={<AuthCardHeader />} footer={<AuthCardFooter />}>
        <SigninForm />
      </AuthCard>
    </main>
  );
};

export default SigninPage;
