import Logo from '@/components/common/Logo';
import TextLink from '@/components/ui/typography/TextLink';
import SignupForm from '../_components/SignupForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Signup',
};

const SignupPage = () => {
  return (
    <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <section className="shadow-glow-sm bg-card before:from-primary before:to-accent before:via-secondary border-border relative overflow-hidden rounded-xl border shadow-black/15 before:absolute before:top-0 before:left-0 before:block before:h-1.5 before:w-full before:bg-linear-to-r">
        <div className="xxs:p-8 p-6 sm:p-12">
          <header className="mb-8 text-center">
            <div className="mb-4 flex items-center justify-center space-x-1.5">
              <Logo className="w-12" />
              <h1 className="font-montserrat text-foreground text-2xl font-bold">SmartAssess</h1>
            </div>
            <h2 className="font-montserrat text-foreground/85 mb-1 text-2xl font-bold">
              Hire the Best
            </h2>
            <p className="font-inter text-muted-foreground mb-6">
              Start your journey with <span className="font-semibold">SmartAssess.</span>
            </p>
          </header>
          <SignupForm />
        </div>

        <footer className="border-border bg-input/40 border-t p-5 text-center dark:bg-white/4">
          <p className="font-inter text-sm">
            Already have an account? <TextLink href="/signin">Signin</TextLink>
          </p>
        </footer>
      </section>
    </main>
  );
};

export default SignupPage;
