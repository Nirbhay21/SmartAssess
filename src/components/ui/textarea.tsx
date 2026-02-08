'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';

const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<'textarea'>>(
  ({ className, maxLength, value, defaultValue, onChange, ...props }, ref) => {
    const [internalValue, setInternalValue] = React.useState(value ?? defaultValue ?? '');

    React.useEffect(() => {
      if (value !== undefined) {
        setInternalValue(value);
      }
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setInternalValue(e.target.value);
      onChange?.(e);
    };

    const currentLen = String(internalValue).length;
    const max = maxLength ?? null;
    const remaining = max !== null ? max - currentLen : null;
    const isWarning = remaining !== null && remaining <= 10;

    return (
      <div className="group/textarea relative w-full">
        <textarea
          ref={ref}
          data-slot="textarea"
          maxLength={maxLength}
          value={value}
          defaultValue={defaultValue}
          onChange={handleChange}
          className={cn(
            'border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
            className,
          )}
          {...props}
        />
        {max !== null && (
          <div
            role="status"
            aria-live="polite"
            className={cn(
              'text-muted-foreground pointer-events-none absolute right-3 bottom-2 inline-flex transform items-center gap-0.5 text-[11px] font-medium whitespace-nowrap transition duration-150',
              isWarning
                ? 'text-destructive translate-y-0 opacity-100'
                : 'translate-y-1 opacity-0 group-focus-within/textarea:translate-y-0 group-focus-within/textarea:opacity-90',
            )}
          >
            <span className="sr-only">Character count</span>
            <span className="tabular-nums">{currentLen}</span>
            <span className="text-muted-foreground/60">/</span>
            <span className="tabular-nums opacity-90">{max}</span>
          </div>
        )}
      </div>
    );
  },
);
Textarea.displayName = 'Textarea';

export { Textarea };
