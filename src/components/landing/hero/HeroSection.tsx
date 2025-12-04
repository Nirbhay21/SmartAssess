import { Stars } from 'lucide-react';
import CandidateTestMockup from './CandidateTestMockup';

const HeroSection = () => {
  return (
    <section className="px-4 py-12 sm:py-16 2xl:py-24 bg-linear-to-br from-primary/8 via-accent/5 to-secondary/8 dark:from-primary/40 dark:via-accent/10 dark:to-secondary/40">
      <div className="mx-auto max-w-7xl flex flex-col lg:flex-row space-y-18 xs:space-y-20 lg:space-y-0">
        {/* Left text content */}
        <div className="space-y-6 flex flex-col text-center lg:text-left lg:items-start lg:w-1/2">
          <div className="inline-flex border border-border text-sm self-center lg:self-start space-x-2 px-3 py-1.5 rounded-full bg-card">
            <Stars size={20} className="text-secondary" />
            <span>Supports Custom API Keys</span>
          </div>
          <h1 className="font-montserrat font-bold text-5xl text-primary dark:text-foreground xl:text-[4.5rem] leading-13 xl:leading-20 max-w-165 mx-auto lg:mx-0">
            <span className="bg-clip-text bg-linear-to-r from-secondary via-accent to-primary dark:to-foreground text-transparent">
              AI-Powered{' '}
            </span>
            Assessment & Screening Platform
          </h1>
          <p className="text-[1.25rem] text-foreground/80 font-medium font-inter leading-relaxed max-w-200 mx-auto lg:mx-0">
            Automate first-round interviews with AI-generated questions, advanced proctoring, and
            anti-cheating controls—so you hire faster and smarter.
          </p>
          <div className="flex flex-col space-y-5 xsm:flex-row xsm:space-x-6 xsm:space-y-0 xsm:justify-center lg:justify-stretch">
            <button className="bg-primary text-white font-semibold font-inter px-8 py-3 rounded-lg cursor-pointer hover:scale-102 active:scale-100 transition-[transform,background-color] active:bg-primary/75 hover:bg-primary/90 duration-150">
              Sign Up for Free
            </button>
            <button className="bg-white text-primary border border-border/70 hover:border-border font-semibold font-poppins px-8 py-3 rounded-lg cursor-pointer dark:text-background hover:scale-102 transition-[transform] duration-150 active:scale-100">
              View Documentation
            </button>
          </div>
        </div>

        {/* Right mockup (Mockup UI) */}
        <div className="lg:w-1/2 lg:flex lg:items-center">
          <CandidateTestMockup />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
