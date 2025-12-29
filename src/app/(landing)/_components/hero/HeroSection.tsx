import { Stars } from 'lucide-react';
import CandidateTestMockup from './CandidateTestMockup';
import Link from 'next/link';

const HeroSection = () => {
  return (
    <section
      id="hero"
      className="from-primary/8 via-accent/5 to-secondary/8 dark:from-primary/40 dark:via-accent/10 dark:to-secondary/40 bg-linear-to-br px-4 py-12 sm:py-16 2xl:py-24"
    >
      <div className="xs:space-y-20 mx-auto flex max-w-7xl flex-col space-y-18 lg:flex-row lg:space-y-0">
        {/* Left text content */}
        <div className="flex flex-col space-y-6 text-center lg:w-1/2 lg:items-start lg:text-left">
          <div className="border-border bg-card inline-flex space-x-2 self-center rounded-full border px-3 py-1.5 text-sm lg:self-start">
            <Stars size={20} className="text-secondary" />
            <span>Supports Custom API Keys</span>
          </div>
          <h1 className="font-montserrat text-primary dark:text-foreground mx-auto max-w-165 text-5xl leading-13 font-bold lg:mx-0 xl:text-[4.5rem] xl:leading-20">
            <span className="from-secondary via-accent to-primary dark:to-foreground bg-linear-to-r bg-clip-text text-transparent">
              AI-Powered{' '}
            </span>
            Assessment & Screening Platform
          </h1>
          <p className="text-foreground/80 font-inter mx-auto max-w-200 text-[1.25rem] leading-relaxed font-medium lg:mx-0">
            Automate first-round interviews with AI-generated questions, advanced proctoring, and
            anti-cheating controls—so you hire faster and smarter.
          </p>
          <div className="xsm:flex-row xsm:space-x-6 xsm:space-y-0 xsm:justify-center flex flex-col space-y-5 lg:justify-stretch">
            <Link
              href="/signup"
              className="bg-primary font-inter active:bg-primary/75 hover:bg-primary/90 cursor-pointer rounded-lg px-8 py-3 font-semibold text-white transition-[transform,background-color] duration-150 hover:scale-102 active:scale-100"
            >
              Sign Up for Free
            </Link>
            <button className="text-primary border-border/70 hover:border-border font-poppins dark:text-background cursor-pointer rounded-lg border bg-white px-8 py-3 font-semibold transition-[transform] duration-150 hover:scale-102 active:scale-100">
              View Documentation
            </button>
          </div>
        </div>

        {/* Right mockup (Mockup UI) */}
        <div className="lg:flex lg:w-1/2 lg:items-center">
          <CandidateTestMockup />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
