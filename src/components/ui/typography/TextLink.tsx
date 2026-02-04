import Link from 'next/link';

import { cn } from '@/lib/utils';

interface TextLinkProps extends React.ComponentProps<typeof Link> {
  href: string;
  underline?: boolean;
  className?: string;
  children: React.ReactNode;
}

const TextLink = ({
  href,
  children,
  underline = true,
  className = '',
  ...props
}: TextLinkProps) => {
  return (
    <Link
      {...props}
      href={href}
      className={cn(
        'text-secondary underline-offset-2 dark:supports-[color:color-mix(in_srgb,red,white)]:text-[color-mix(in_srgb,var(--color-secondary)_70%,white_30%)]',
        underline && 'underline',
        className,
      )}
    >
      {children}
    </Link>
  );
};

export default TextLink;
