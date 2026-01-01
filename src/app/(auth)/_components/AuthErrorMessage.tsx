import { AlertTriangle } from 'lucide-react';
import * as motion from 'motion/react-client';

interface AuthErrorMessageProps {
  message: string;
}

const AuthErrorMessage = ({ message }: AuthErrorMessageProps) => {
  return (
    <motion.div
      role="alert"
      aria-live="assertive"
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.26, ease: 'easeOut' }}
      className="bg-danger/10 border-danger/35 text-danger flex items-start overflow-hidden rounded-lg border px-4 py-2.5 text-sm font-medium"
    >
      <div className="mt-0.5 flex shrink-0 items-center space-x-3">
        <AlertTriangle />
        <span className="font-semibold">{message}</span>
      </div>
    </motion.div>
  );
};

export default AuthErrorMessage;
