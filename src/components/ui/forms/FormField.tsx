import { cn } from '@/lib/cn';
import { EyeIcon, EyeOffIcon, LucideIcon, MessageCircleWarningIcon } from 'lucide-react';
import { InputHTMLAttributes, useState } from 'react';
import HelpTooltip from '../tooltip/HelpTooltip';
import { AnimatePresence } from 'motion/react';
import * as motion from 'motion/react-client';

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  icon: LucideIcon;
  error: string | null;
  helpText: string | null;
}

const FormField = ({
  icon: Icon,
  id: inputId,
  error,
  helpText,
  className,
  ...props
}: FormFieldProps) => {
  const errorId = error ? `${inputId}-error` : undefined;
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const isPassword = props.type === 'password';
  const inputType = isPassword && isPasswordVisible ? 'text' : props.type;

  return (
    <div className="space-y-1.5">
      <div className="relative rounded-lg">
        <input
          {...props}
          id={inputId}
          type={inputType}
          aria-label={props['aria-label'] ?? props.placeholder}
          aria-invalid={error ? true : false}
          aria-describedby={errorId}
          className={cn(
            'peer xxs:text-base border-border bg-input/35 focus:border-primary/70 focus:ring-primary/25 placeholder:text-muted-foreground w-full rounded-lg border py-2 pr-4 pl-10 text-sm text-black/75 outline-none focus:text-black focus:ring dark:text-white/65 dark:focus:border-white/80 dark:focus:text-white dark:focus:ring-white/40',
            className,
          )}
        />
        <Icon className="peer-focus:text-foreground peer-placeholder-shown:text-muted-foreground absolute top-1/2 left-2 -translate-y-1/2 text-black/80 dark:text-white/65" />

        <div className="absolute top-1/2 right-3 flex -translate-y-1/2 items-center space-x-3">
          {isPassword && (
            <button
              type="button"
              className="text-muted-foreground hover:text-foreground cursor-pointer rounded-full bg-black/7 p-1 hover:bg-black/10 focus:outline-none focus-visible:ring active:bg-black/20 dark:bg-white/10 dark:hover:bg-white/15 dark:focus-visible:ring-white/70 dark:active:bg-white/25"
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            >
              {isPasswordVisible ? (
                <EyeIcon className="h-5 w-5" />
              ) : (
                <EyeOffIcon className="h-5 w-5" />
              )}
            </button>
          )}

          {helpText && (
            <HelpTooltip message={helpText}>
              <MessageCircleWarningIcon className="text-muted-foreground group-data-[state=delayed-open]:text-foreground group-data-[state=instant-open]:text-foreground h-5 w-5 transition-[color] duration-200"></MessageCircleWarningIcon>
            </HelpTooltip>
          )}
        </div>
      </div>

      <AnimatePresence initial={false}>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -2 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -2 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="text-danger pl-1 text-xs"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FormField;
