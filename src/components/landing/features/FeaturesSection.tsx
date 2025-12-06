import { BrainCircuit, FileChartColumn, LucideIcon, ShieldCheck, Workflow } from 'lucide-react';
import FeatureCard from './FeatureCard';

interface Features {
  icon: LucideIcon;
  title: string;
  description: string;
}

const features: Features[] = [
  {
    icon: BrainCircuit,
    title: 'AI-Generated Assessments',
    description:
      'Upload a resume or job description and receive a fully structured assessment automatically — complete with MSQ, coding or subjective questions, difficulty balancing, and role-aligned evaluation criteria.',
  },
  {
    icon: ShieldCheck,
    title: 'Smart Proctoring System',
    description:
      'Ensure authenticity with advanced monitoring that detects multiple faces, mobile phone usage, and tab switching in real time to maintain exam integrity and eliminate cheating.',
  },
  {
    icon: Workflow,
    title: 'Automated AI-Based Evaluation',
    description:
      'Receive instant scoring and qualitative assessment for technical and behavioral responses, helping you shortlist top candidates without spending hours manually reviewing answers.',
  },
  {
    icon: FileChartColumn,
    title: 'Deep Insight & Automated Evaluation',
    description:
      'Get comprehensive candidate insights including strengths, improvement areas, job-role suitability, communication clarity, and overall potential — all backed by powerful AI-driven analysis.',
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="px-4 py-12 sm:py-16 2xl:pt-20">
      <div className="mx-auto max-w-7xl">
        <header className="mb-6 text-center sm:mb-8 lg:mb-10">
          <h2 className="font-inter text-4xl leading-tight md:text-5xl md:leading-14">
            <span className="text-primary dark:text-foreground block font-semibold">
              Everything You Need to
            </span>
            <span className="from-secondary to-accent/80 dark:to-accent bg-linear-to-r bg-clip-text font-semibold text-transparent">
              Hire Smarter
            </span>
          </h2>
          <p className="text-foreground/80 font-inter mx-auto mt-6 max-w-165 text-[1.25rem] font-semibold">
            Powerful features designed to streamline your recruitment process from start to finish.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              variant={index === 0 || index === features.length - 1 ? 'primary' : 'secondary'}
              colspan={index === 0 || index === features.length - 1 ? 2 : 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
