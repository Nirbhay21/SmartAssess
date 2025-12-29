import {
  BrainCircuit,
  Cpu,
  Lightbulb,
  Link,
  LucideIcon,
  ScanFace,
  ScanText,
  Sparkles,
  Zap,
} from 'lucide-react';

interface FeatureItem {
  id: number;
  icon: LucideIcon;
  description: string;
}

const features: FeatureItem[] = [
  {
    id: 1,
    icon: BrainCircuit,
    description: 'Automated AI-generated interviews tailored to each candidate',
  },
  {
    id: 2,
    icon: ScanFace,
    description: 'Advanced proctoring with face, phone, and tab-switch detection',
  },
  {
    id: 3,
    icon: Cpu,
    description: 'Instant scoring with deep behavioral and technical insights',
  },
  {
    id: 4,
    icon: ScanText,
    description: 'Fair, unbiased evaluation powered by modern AI',
  },
  {
    id: 5,
    icon: Link,
    description: 'Shareable assessment links with secure access keys',
  },
];

const AboutInfoSection = () => {
  return (
    <div className="mb-16 flex flex-col space-y-8 lg:flex-row lg:space-y-0 lg:space-x-8">
      <div className="space-y-6 lg:w-1/2 lg:space-y-8">
        <article className="border-secondary/50 hover:border-secondary dark:bg-card/30 from-secondary/12 via-secondary/3 rounded-xl border bg-white bg-linear-to-br to-transparent p-6 transition-[border,shadow-box] duration-300 hover:shadow-sm">
          <div className="mb-4 flex items-center space-x-3">
            <Lightbulb className="bg-secondary size-12 rounded-md p-2 text-white" />
            <h4 className="font-poppins text-2xl font-semibold">Why We Built SmartAssess</h4>
          </div>
          <p className="font-inter text-foreground/75 mb-3 leading-relaxed">
            Hiring shouldn&apos;t feel like a burden. Companies struggle to evaluate large candidate
            pools efficiently, and great talent is often overlooked due to time constraints, human
            bias, or inconsistent assessment processes.
          </p>
          <p className="before:bg-secondary font-inter text-foreground/60 from-secondary/15 to-secondary/5 relative my-1 bg-linear-to-r py-1.5 pl-4 before:absolute before:top-0 before:left-0 before:h-full before:w-0.75">
            SmartAssess was created to eliminate these bottlenecks and bring fairness, accuracy, and
            speed to hiring.
          </p>
        </article>

        <article className="border-accent/50 hover:border-accent/75 dark:border-accent/30 from-accent/9 via-accent/2 dark:bg-card/30 dark:from-accent/8 dark:via-accent/1.5 rounded-xl border bg-white bg-linear-to-br to-transparent p-6 transition-[border,shadow-box] duration-300 hover:shadow-sm">
          <div className="mb-4 flex items-center space-x-3">
            <Zap className="bg-accent dark:bg-accent/80 size-12 rounded-md p-2 text-white" />
            <h4 className="font-poppins text-2xl font-semibold">What SmartAssess Does</h4>
          </div>
          <p className="font-inter text-foreground/75 mb-3 leading-relaxed">
            SmartAssess automatically generates personalized interviews from resumes and job
            descriptions, conducts remotely proctored assessments with real-time integrity
            monitoring, and evaluates answers instantly using AI-driven scoring.
          </p>
          <p className="before:bg-accent dark:before:bg-accent/80 font-inter text-foreground/60 from-accent/12 to-accent/5 relative my-1 bg-linear-to-r py-1.5 pl-4 before:absolute before:top-0 before:left-0 before:h-full before:w-0.75">
            shortlisting the right candidates in minutes instead of weeks.
          </p>
        </article>
      </div>

      <article className="border-border dark:bg-card/30 from-secondary/50 to-accent/30 hover:from-secondary hover:to-accent/75 rounded-xl bg-white bg-linear-to-br p-px transition-[border,box-shadow] duration-300 hover:shadow-sm lg:w-1/2">
        <div className="h-full rounded-xl bg-white dark:bg-black">
          <div className="dark:bg-card/20 from-accent/10 via-accent/3 h-full bg-linear-to-tl to-transparent p-6">
            <div className="mb-6 flex items-center space-x-3">
              <Sparkles className="from-secondary to-accent size-12 rounded-md bg-linear-to-br p-2 text-white" />
              <h4 className="font-poppins text-2xl font-semibold">What SmartAssess Does</h4>
            </div>
            <div className="text-foreground/70 space-y-4">
              {features.map((feature) => (
                <div
                  key={feature.id}
                  className="border-border/50 hover:border-secondary/50 dark:bg-card/30 flex items-center space-x-3 rounded-lg border bg-white/60 p-3.5"
                >
                  <feature.icon className="from-secondary/30 to-accent/30 size-11 shrink-0 rounded-md bg-linear-to-br p-2" />
                  <p className="text-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default AboutInfoSection;
