'use client';

import { AnimatePresence, motion, Variants } from 'motion/react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Field, FieldGroup } from '@/components/ui/field';

import { FormStatus, StatusBadge } from './StatusBadge';

interface OnboardingCardProps {
  step: number;
  totalSteps: number;
  title: string;
  description: string;
  children: React.ReactNode;
  onPrev: () => void;
  onNext: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isSubmitting?: boolean;
  status?: FormStatus;
}

const stepVariants: Variants = {
  hidden: { opacity: 0, x: 24 },
  enter: { opacity: 1, x: 0, transition: { duration: 0.24, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, x: -12, transition: { duration: 0.16, ease: [0.4, 0, 0.2, 1] } },
};

export function OnboardingCard({
  step,
  totalSteps,
  title,
  description,
  children,
  onPrev,
  onNext,
  isSubmitting,
  status = 'idle',
}: OnboardingCardProps) {
  return (
    <Card className="mt-8 w-full max-w-2xl overflow-hidden rounded-4xl py-10 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.5)] shadow-black/8">
      <CardHeader className="px-10">
        <div className="flex justify-between">
          <CardTitle
            id="onboarding-form-title"
            className="font-montserrat text-2xl dark:text-white"
          >
            {title}
          </CardTitle>
          <StatusBadge status={status} />
        </div>
        <CardDescription className="text-base dark:text-white/90">{description}</CardDescription>
      </CardHeader>

      <CardContent className="px-10">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={step}
            variants={stepVariants}
            initial="hidden"
            animate="enter"
            exit="exit"
            className="w-full"
          >
            <FieldGroup>{children}</FieldGroup>
          </motion.div>
        </AnimatePresence>
      </CardContent>

      <CardFooter className="px-10">
        <Field orientation="horizontal">
          <div className="flex w-full justify-between pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onPrev}
              disabled={step <= 0 || isSubmitting}
              className={'font-inter px-8 font-semibold'}
            >
              Back
            </Button>
            {step < totalSteps - 1 ? (
              <Button
                type="button"
                onClick={onNext}
                className="font-inter px-8 font-semibold text-white"
              >
                Next
              </Button>
            ) : (
              <Button
                type="submit"
                className="font-inter px-8 font-semibold text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </Button>
            )}
          </div>
        </Field>
      </CardFooter>
    </Card>
  );
}
