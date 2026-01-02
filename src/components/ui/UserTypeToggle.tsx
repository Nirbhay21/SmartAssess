import { cn } from '@/lib/cn';
import { Briefcase, User } from 'lucide-react';
import * as motion from 'motion/react-client';

interface UserTypeToggleButtonProps {
  activeUserType: UserType;
  onChange: (type: UserType) => void;
  variant?: 'standard' | 'highlighted';
}

const USER_TYPES = [
  {
    value: 'recruiter',
    label: 'Recruiter',
    icon: Briefcase,
  },
  {
    value: 'candidate',
    label: 'Candidate',
    icon: User,
  },
] as const;

const UserTypeToggle = ({
  activeUserType,
  onChange,
  variant = 'highlighted',
}: UserTypeToggleButtonProps) => {
  return (
    <div
      role="tablist"
      aria-label="User Type Toggle"
      className={cn(
        'xs:text-base border-border xs:rounded-lg font-poppins relative mx-auto flex w-full justify-between rounded-md border text-sm',
        variant === 'highlighted' && 'bg-secondary/20 dark:bg-secondary/35',
        variant === 'standard' && 'bg-input/25 dark:bg-white/5',
      )}
    >
      <div className="xxs:inset-1 absolute -inset-px">
        <motion.div
          transition={{ duration: 0.2, type: 'spring', stiffness: 800, damping: 60 }}
          className={cn(
            'xs:rounded-lg absolute inset-0 w-1/2 rounded-md',
            variant === 'highlighted' && 'bg-secondary dark:bg-accent',
            variant === 'standard' && 'border-border dark:bg-card/75 border bg-white',
          )}
          animate={{ x: activeUserType === 'recruiter' ? 0 : '100%' }}
        ></motion.div>
      </div>

      {USER_TYPES.map((user) => (
        <button
          key={user.value}
          role="tab"
          type="button"
          aria-selected={activeUserType === user.value}
          tabIndex={activeUserType === user.value ? 1 : 0}
          className={cn(
            'z-1 flex items-center space-x-2 rounded-md px-3.5 py-3 font-semibold capitalize',
            'xxs:px-5 xs:py-3 xsm:px-8 xs:rounded-lg sm:px-8',
            activeUserType !== user.value && 'cursor-pointer transition-[color] duration-200',
            activeUserType === user.value
              ? variant === 'highlighted'
                ? 'text-white'
                : 'text-black dark:text-white'
              : variant === 'highlighted'
                ? 'dark:text-foreground/60 text-black'
                : 'text-muted-foreground',
          )}
          onClick={() => onChange(user.value)}
        >
          <user.icon className="xsm:h-6 xsm:w-6 h-5 w-5"></user.icon>
          <span className="text-sm whitespace-nowrap">
            <span className="xs:inline hidden">For</span> {user.label}
          </span>
        </button>
      ))}
    </div>
  );
};

export default UserTypeToggle;
