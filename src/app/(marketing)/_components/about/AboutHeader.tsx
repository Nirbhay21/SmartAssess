const AboutHeader = () => {
  return (
    <header>
      <h2 className="font-inter mb-6 text-center text-4xl font-semibold md:text-5xl">
        Hire{' '}
        <span className="from-primary to-secondary dark:from-secondary bg-linear-to-r bg-clip-text text-transparent dark:to-white">
          Smarter,
        </span>{' '}
        <span className="from-primary to-accent dark:to-accent bg-linear-to-r bg-clip-text text-transparent dark:from-white">
          Faster
        </span>
        , and{' '}
        <span className="to-accent dark:to-secondary bg-linear-to-r from-black bg-clip-text text-transparent dark:from-white">
          more Fairly.
        </span>
      </h2>

      <p className="text-foreground/70 mx-auto mb-10 max-w-195 text-center text-[1.25rem]">
        SmartAssess is an AI-powered interview and candidate evaluation platform built to help
        organizations hire smarter, faster, and more fairly. Traditional recruitment is slow,
        repetitive, and often biased — we&apos;re here to change that.
      </p>
    </header>
  );
};

export default AboutHeader;
