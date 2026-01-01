import GithubIcon from '@/components/ui/icons/GithubIcon';
import GoogleIcon from '@/components/ui/icons/GoogleIcon';
import { cn } from '@/lib/cn';

type GoogleAndGithubProvidersProps =
  | {
      providerFor: 'signin';
      className?: string;
    }
  | {
      providerFor: 'signup';
      userType: UserType;
      className?: string;
    };

const ProviderButton = ({
  children: icon,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) => {
  return (
    <button
      type="button"
      className="bg-input/45 border-border group hover:bg-input/60 active:bg-input/85 active:border-strong flex w-1/2 cursor-pointer items-center justify-center space-x-2 rounded-md border py-2 transition-[color,scale] duration-200 active:scale-98"
    >
      {icon}
      <span className="text-muted-foreground font-poppins group-hover:text-foreground xxs:text-base text-sm font-semibold transition-[color] duration-200">
        {label}
      </span>
    </button>
  );
};

const GoogleAndGithubProviders = (props: GoogleAndGithubProvidersProps) => {
  const { className, providerFor } = props;

  if (providerFor === 'signup') {
    const { userType } = props;
    // You can use userType for any specific logic if needed
  }

  return (
    <div className={cn('xxs:space-x-4 flex space-x-3', className)}>
      <ProviderButton label="Google">
        <GoogleIcon className="h-5 w-5 opacity-85 grayscale transition-[filter,opacity] duration-200 group-hover:opacity-100 group-hover:grayscale-0" />
      </ProviderButton>
      <ProviderButton label="Github">
        <GithubIcon className="h-5 w-5 opacity-60 grayscale transition-[filter,opacity] duration-200 group-hover:opacity-100 group-hover:grayscale-0" />
      </ProviderButton>
    </div>
  );
};

export default GoogleAndGithubProviders;
