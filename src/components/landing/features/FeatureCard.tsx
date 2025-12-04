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
      className={`shadow-xl rounded-lg bg-linear-to-tl from-primary/35 via-accent/35 to-secondary/35 dark:from-primary/35 dark:via-accent/35 dark:to-secondary/35 hover:from-primary/60 hover:via-accent/60 hover:to-secondary/60 hover:dark:from-primary/75 hover:dark:via-accent/75 hover:dark:to-secondary/75 p-0.5 group ${
        colspan === 2 ? 'lg:col-span-2' : 'col-span-1'
      }`}
    >
      <div className="bg-white dark:bg-black rounded-lg h-full">
        <div
          className={`p-5 xs:p-6 sm:p-7 hover:bg-linear-to-br from-secondary/15 via-accent/2 to-secondary/15 h-full rounded-lg ${
            variant === 'secondary' ? 'bg-accent/5' : 'bg-secondary/6'
          }`}
        >
          <Icon className="text-secondary group-hover:bg-accent/20 bg-secondary/20 p-2.5 rounded-lg size-14 mb-6" />
          <h3 className="font-semibold font-inter text-2xl mb-3.5">{title}</h3>
          <p className="text-foreground">{description}</p>
        </div>
      </div>
    </article>
  );
};

export default FeatureCard;
