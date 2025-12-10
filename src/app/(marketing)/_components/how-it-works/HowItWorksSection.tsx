import WorkflowContentStateWrapper from './WorkflowContentStateWrapper';

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="px-4 py-12 sm:py-16 2xl:pt-20">
      <div className="mx-auto max-w-7xl">
        <h2 className="font-inter text-primary dark:text-foreground mb-6 text-center text-4xl font-semibold md:text-5xl">
          How It Works
        </h2>
        <p className="font-poppins dark:text-foreground/70 mb-6 text-center text-[1.25rem] font-medium">
          Simple, secure, and efficient workflows for everyone.
        </p>
        <WorkflowContentStateWrapper />
      </div>
    </section>
  );
};

export default HowItWorksSection;
