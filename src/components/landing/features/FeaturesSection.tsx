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
    <section id="features" className="py-12 sm:py-16 2xl:py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-6 sm:mb-8 lg:mb-10">
          <h2 className="font-inter text-4xl md:text-5xl leading-14">
            <span className="block text-primary font-semibold dark:text-foreground">
              Everything You Need to
            </span>
            <span className="bg-linear-to-r from-secondary to-accent/80 dark:to-accent bg-clip-text text-transparent font-semibold">
              Hire Smarter
            </span>
          </h2>
          <p className="text-foreground/80 font-semibold text-[1.25rem] max-w-165 mx-auto mt-6 font-inter">
            Powerful features designed to streamline your recruitment process from start to finish.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
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
