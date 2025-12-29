import { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import * as motion from 'motion/react-client';
import * as Tooltip from '@radix-ui/react-tooltip';

interface HelpTooltipProps {
  children: React.ReactNode;
  message: string;
}

const HelpTooltip = ({ children, message }: HelpTooltipProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Tooltip.Provider>
      <Tooltip.Root open={isOpen} onOpenChange={(open) => setIsOpen(open)} delayDuration={150}>
        <Tooltip.Trigger asChild>
          <button
            type="button"
            className="group flex cursor-pointer items-center focus-visible:ring focus-visible:outline-none dark:focus-visible:ring-white/70"
            aria-label="Help"
          >
            {children}
          </button>
        </Tooltip.Trigger>

        <AnimatePresence>
          {isOpen && (
            <Tooltip.Portal forceMount>
              <Tooltip.Content asChild side="bottom" align="end" sideOffset={0} alignOffset={-12}>
                <motion.div
                  initial={{ opacity: 0, y: -5, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -5, scale: 0.96 }}
                  transition={{ duration: 0.15, ease: 'easeOut' }}
                  className="shadow-glow-xs bg-tooltip border-border-strong z-50 max-w-70 rounded-sm border px-2.5 py-1.5 shadow-black/12 dark:shadow-black/45"
                >
                  <Tooltip.Arrow asChild>
                    <div className="bg-tooltip border-border-strong h-2.5 w-2.5 -translate-y-1/2 rotate-45 border-r border-b"></div>
                  </Tooltip.Arrow>
                  <p className="font-poppins text-xs leading-snug">{message}</p>
                </motion.div>
              </Tooltip.Content>
            </Tooltip.Portal>
          )}
        </AnimatePresence>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};

export default HelpTooltip;
