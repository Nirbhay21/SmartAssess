'use client';

import { AnimatePresence, motion, Variants } from 'motion/react';

import BrandLogo from '@/app/(auth)/_components/BrandLogo';
import { Progress } from '@/components/ui/progress';

interface OnboardingHeaderProps {
  step: number;
  totalSteps: number;
  stepTitle: string;
}

const labelVariants: Variants = {
  hidden: { opacity: 0, y: -6 },
  enter: { opacity: 1, y: 0, transition: { duration: 0.18, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: 6, transition: { duration: 0.12, ease: [0.4, 0, 0.2, 1] } },
};

export function OnboardingHeader({ step, totalSteps, stepTitle }: OnboardingHeaderProps) {
  const progressValue = Math.round(((step + 1) / totalSteps) * 100);

  return (
    <>
      <div className="mr-auto">
        <BrandLogo />
      </div>
      <div data-shadcn className="w-full max-w-2xl">
        <div>
          <p className="mb-2 font-semibold">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={step}
                variants={labelVariants}
                initial="hidden"
                animate="enter"
                exit="exit"
                className="inline-flex items-baseline gap-3"
              >
                <span className="tabular-nums dark:text-white">{`Step ${step + 1} of ${totalSteps}:`}</span>
                <span className="font-inter text-slate-700 dark:text-white/80">{stepTitle}</span>
              </motion.span>
            </AnimatePresence>
          </p>

          <Progress
            value={progressValue}
            className="[&>div]:to-primary [&>div]:from-secondary mb-4 h-3 max-w-2xl backdrop-blur-3xl [&>div]:bg-linear-to-r"
          />
        </div>
      </div>
    </>
  );
}
