import { cn } from '@/lib/cn';
import { Loader2Icon } from 'lucide-react';
import { AnimatePresence, HTMLMotionProps } from 'motion/react';
import * as motion from 'motion/react-client';

type AuthSubmitButtonProps = HTMLMotionProps<'button'> & {
  loading?: boolean;
  loadingText?: string;
};

const Spinner = () => {
  return (
    <motion.span
      className="flex items-center justify-center"
      animate={{ rotate: 360 }}
      transition={{
        repeat: Infinity,
        duration: 0.9,
        ease: 'linear',
      }}
    >
      <Loader2Icon className="text-accent h-6 w-6" strokeWidth={3} />
    </motion.span>
  );
};

const AuthSubmitButton = ({
  children,
  disabled,
  loading = false,
  loadingText,
  className,
  ...props
}: AuthSubmitButtonProps) => {
  const isDisabled = disabled || loading;

  return (
    <motion.button
      type="submit"
      disabled={isDisabled}
      aria-busy={loading}
      whileTap={!isDisabled ? { scale: 0.97 } : undefined}
      className={cn(
        'relative mt-2 flex h-14 w-full items-center justify-center gap-3 overflow-hidden rounded-xl',
        'bg-primary font-poppins font-semibold text-white',
        'transition-colors duration-200',
        isDisabled ? 'cursor-not-allowed opacity-80' : 'hover:bg-primary/90',
        className,
      )}
      {...props}
    >
      <AnimatePresence mode="wait" initial={false}>
        {loading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="flex items-center gap-3"
          >
            <Spinner />
            <span className="text-accent text-sm font-semibold">{loadingText}</span>
          </motion.div>
        ) : (
          <motion.span
            key="label"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            {children}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

export default AuthSubmitButton;
