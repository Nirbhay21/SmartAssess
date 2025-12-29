import { Sparkles, Target } from 'lucide-react';

const VisionAndMission = () => {
  return (
    <div className="mb-10 flex flex-col space-y-6 md:mb-12 md:flex-row md:space-y-0 md:space-x-8 lg:px-16">
      <article className="dark:bg-card/25 hover:from-secondary/24 hover:via-secondary/12 hover:border-secondary/50 from-secondary/12 via-secondary/6 border-secondary/30 dark:border-secondary/50 dark:hover:border-secondary/80 flex grow-0 flex-col space-y-4 rounded-md border bg-white bg-linear-to-br to-transparent p-5 shadow-xs transition-colors duration-300 hover:bg-linear-to-br hover:to-transparent md:w-1/2 md:rounded-xl md:p-8">
        <Sparkles className="bg-secondary/15 text-secondary size-12 rounded-md p-3" />
        <h4 className="font-montserrat text-2xl font-semibold">Our Vision</h4>
        <p className="font-poppins text-foreground/70 text-lg">
          We envision a future where every candidate is evaluated based on skill, not luck, bias, or
          availability, and where hiring decisions are data-driven, transparent, and globally
          accessible.
        </p>
      </article>
      <article className="dark:bg-card/25 hover:border-accent/50 from-accent/6 via-accent/3 border-accent/35 hover:from-accent/12 hover:via-accent/6 flex grow-0 flex-col space-y-4 rounded-md border bg-white bg-linear-to-br to-transparent p-5 shadow-xs transition-colors duration-300 hover:bg-linear-to-br hover:to-transparent md:w-1/2 md:rounded-xl md:p-8">
        <Target className="bg-accent/15 text-accent size-12 rounded-md p-3" />
        <h4 className="font-montserrat text-2xl font-semibold">Our Mission</h4>
        <p className="font-poppins text-foreground/70 text-lg">
          To democratize opportunities and empower organizations to discover real talent faster. We
          believe in leveling the playing field for everyone.
        </p>
      </article>
    </div>
  );
};

export default VisionAndMission;
