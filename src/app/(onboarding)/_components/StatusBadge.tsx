'use client';

import { CheckCircle2 } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Spinner } from '@/components/ui/spinner';
import { cn } from '@/lib/utils';

export type FormStatus = 'idle' | 'loading' | 'saving' | 'saved' | 'error';

interface StatusBadgeProps {
  status: FormStatus;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const statusConfig = {
    idle: {
      label: '',
      variant: 'outline' as const,
      icon: null,
      show: false,
      shimmer: false,
    },
    loading: {
      label: 'Loading data...',
      variant: 'outline' as const,
      icon: <Spinner className="size-3" />,
      show: true,
      shimmer: true,
    },
    saving: {
      label: 'Saving...',
      variant: 'secondary' as const,
      icon: <Spinner className="size-3" />,
      show: true,
      shimmer: true,
    },
    saved: {
      label: 'Auto-saved',
      variant: 'outline' as const,
      icon: <CheckCircle2 className="text-success size-3" />,
      show: true,
      shimmer: false,
    },
    error: {
      label: 'Failed to save',
      variant: 'destructive' as const,
      icon: null,
      show: true,
      shimmer: false,
    },
  };

  const config = statusConfig[status];

  if (!config.show) return null;

  return (
    <Badge
      variant={config.variant}
      className={cn(
        'h-fit gap-1.5 px-3 py-1 text-xs font-medium',
        status === 'saved' &&
          'border-success/20 bg-success/10 text-success dark:border-success/30 dark:bg-success/15',
        className,
      )}
    >
      <div className={cn(status === 'saving' && 'text-card')}>{config.icon}</div>
      {config.shimmer ? (
        <span
          className={cn(
            'animate-shimmer from-foreground via-primary to-foreground font-poppins inline-block bg-linear-to-r bg-size-[200%_100%] bg-clip-text font-medium text-transparent',
            status === 'saving' && 'from-muted via-primary/50 to-muted bg-muted',
          )}
        >
          {config.label}
        </span>
      ) : (
        config.label
      )}
    </Badge>
  );
}
