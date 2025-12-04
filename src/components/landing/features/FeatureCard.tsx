import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  title: string;
  icon: LucideIcon;
  description: string;
  colspan: 1 | 2;
  variant?: 'primary' | 'secondary';
}

const FeatureCard = ({
  title,
  icon: Icon,
  description,
  colspan = 1,
  variant = 'primary',
}: FeatureCardProps) => {
  return (
    <article
      className={`from-primary/35 via-accent/35 to-secondary/35 dark:from-primary/35 dark:via-accent/35 dark:to-secondary/35 hover:from-primary/60 hover:via-accent/60 hover:to-secondary/60 hover:dark:from-primary/75 hover:dark:via-accent/75 hover:dark:to-secondary/75 group rounded-lg bg-linear-to-tl p-0.5 shadow-xl ${
        colspan === 2 ? 'lg:col-span-2' : 'col-span-1'
      }`}
    >
      <div className="h-full rounded-lg bg-white dark:bg-black">
        <div
          className={`xs:p-6 from-secondary/15 via-accent/2 to-secondary/15 h-full rounded-lg p-5 hover:bg-linear-to-br sm:p-7 ${
            variant === 'secondary' ? 'bg-accent/5' : 'bg-secondary/6'
          }`}
        >
          <Icon className="text-secondary group-hover:bg-accent/20 bg-secondary/20 mb-6 size-14 rounded-lg p-2.5" />
          <h3 className="font-inter mb-3.5 text-2xl font-semibold">{title}</h3>
          <p className="text-foreground">{description}</p>
        </div>
      </div>
    </article>
  );
};

export default FeatureCard;
