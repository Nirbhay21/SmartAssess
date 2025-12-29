import { Building2, GraduationCap, LucideIcon, Rocket, Users } from 'lucide-react';

interface AudienceItem {
  id: number;
  icon: LucideIcon;
  title: string;
  description: string;
}

const audiences: AudienceItem[] = [
  {
    id: 1,
    icon: Rocket,
    title: 'Startups & Fast-Growing Teams',
    description: 'Scale hiring efficiently without expanding HR resources.',
  },
  {
    id: 2,
    icon: Building2,
    title: 'Enterprises',
    description: 'Manage high-volume hiring with efficiency and consistency.',
  },
  {
    id: 3,
    icon: GraduationCap,
    title: 'Universities',
    description: 'Conduct skill-based evaluations for students and graduates.',
  },
  {
    id: 4,
    icon: Users,
    title: 'Recruiters & Agencies',
    description: 'Automate screening rounds and improve candidate placement rates.',
  },
];

const BuiltForSection = () => {
  return (
    <div>
      <h3 className="font-inter text-foreground mb-7 text-center text-3xl font-semibold capitalize">
        Who We&apos;re Built For
      </h3>
      <div className="xsm:grid-cols-2 grid grid-cols-1 gap-6 lg:grid-cols-4">
        {audiences.map((audience) => (
          <div
            key={audience.id}
            className="group border-border/75 hover:border-secondary/50 dark:bg-card/20 from-secondary/10 via-secondary/2 dark:from-secondary/20 dark:via-secondary/5 flex flex-col rounded-xl border bg-white bg-linear-to-br to-transparent p-6 transition-colors duration-300 hover:shadow-sm"
          >
            <div className="bg-secondary/10 text-secondary group-hover:bg-secondary mb-4 flex size-12 items-center justify-center rounded-lg transition-colors duration-300 group-hover:text-white">
              <audience.icon className="size-7" />
            </div>
            <h4 className="font-poppins mb-2.5 text-lg font-semibold">{audience.title}</h4>
            <p className="text-foreground/70 text-sm leading-relaxed">{audience.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BuiltForSection;
