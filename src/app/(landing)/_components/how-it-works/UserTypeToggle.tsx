import { cn } from '@/lib/cn';
import { motion } from 'motion/react';

interface UserTypeToggleButtonProps {
  activeUserType: UserType;
  onChange: (type: UserType) => void;
}

const UserTypeToggle = ({ activeUserType, onChange }: UserTypeToggleButtonProps) => {
  const userTypes: UserType[] = ['recruiter', 'candidate'];

  return (
    <div
      role="tablist"
      aria-label="User Type Toggle"
      className="xs:text-base bg-secondary/20 dark:bg-secondary/35 border-border xs:rounded-lg font-poppins relative mx-auto flex w-fit rounded-md border text-sm"
    >
      <div className="absolute inset-1 -z-1">
        <motion.div
          transition={{ duration: 0.2, type: 'spring', stiffness: 800, damping: 60 }}
          className="bg-secondary dark:bg-accent xs:rounded-lg absolute inset-0 w-1/2 rounded-md"
          animate={{ x: activeUserType === 'recruiter' ? 0 : '100%' }}
        ></motion.div>
      </div>

      {userTypes.map((type) => (
        <button
          key={type}
          role="tab"
          aria-selected={activeUserType === type}
          className={cn(
            'rounded-md px-4 py-2 font-medium capitalize',
            'xxs:py-2.5 xs:px-8 xs:py-3 xs:rounded-lg',
            activeUserType === type
              ? 'text-white'
              : 'dark:text-foreground/60 cursor-pointer text-black transition-[color] duration-200',
          )}
          onClick={() => onChange(type)}
        >
          <span>For {type}</span>
        </button>
      ))}
    </div>
  );
};

export default UserTypeToggle;
