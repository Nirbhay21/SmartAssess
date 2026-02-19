'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { useMemo } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface OnboardingSuccessProps {
  role: 'candidate' | 'recruiter';
  title?: string;
  description?: string;
  primaryButtonText?: string;
  primaryButtonHref?: string;
  petalCount?: number;
}

const PETAL_POOL = [
  { left: '2%', delay: 0.1, duration: 2.8, color: '#ec4899' },
  { left: '8%', delay: 0.4, duration: 3.2, color: '#f59e0b' },
  { left: '15%', delay: 0, duration: 3.0, color: '#22c55e' },
  { left: '22%', delay: 0.6, duration: 2.7, color: '#6366f1' },
  { left: '28%', delay: 0.2, duration: 3.1, color: '#06b6d4' },
  { left: '35%', delay: 0.8, duration: 2.9, color: '#ec4899' },
  { left: '42%', delay: 0.3, duration: 3.3, color: '#f59e0b' },
  { left: '48%', delay: 0.5, duration: 2.6, color: '#22c55e' },
  { left: '55%', delay: 0.1, duration: 3.4, color: '#6366f1' },
  { left: '62%', delay: 0.7, duration: 2.8, color: '#06b6d4' },
  { left: '68%', delay: 0.2, duration: 3.1, color: '#ec4899' },
  { left: '75%', delay: 0.9, duration: 2.7, color: '#f59e0b' },
  { left: '82%', delay: 0.4, duration: 3.2, color: '#22c55e' },
  { left: '88%', delay: 0, duration: 2.9, color: '#6366f1' },
  { left: '95%', delay: 0.6, duration: 3.0, color: '#06b6d4' },
  { left: '5%', delay: 1.1, duration: 3.5, color: '#ec4899' },
  { left: '12%', delay: 1.3, duration: 2.8, color: '#f59e0b' },
  { left: '25%', delay: 1.0, duration: 3.1, color: '#22c55e' },
  { left: '40%', delay: 1.5, duration: 2.9, color: '#6366f1' },
  { left: '50%', delay: 1.2, duration: 3.3, color: '#06b6d4' },
  { left: '60%', delay: 0.9, duration: 2.7, color: '#ec4899' },
  { left: '72%', delay: 1.4, duration: 3.2, color: '#f59e0b' },
  { left: '85%', delay: 1.1, duration: 2.8, color: '#22c55e' },
  { left: '92%', delay: 1.6, duration: 3.4, color: '#6366f1' },
  { left: '3%', delay: 0.5, duration: 3.0, color: '#06b6d4' },
  { left: '18%', delay: 0.2, duration: 2.6, color: '#ec4899' },
  { left: '32%', delay: 0.7, duration: 3.1, color: '#f59e0b' },
  { left: '45%', delay: 0.4, duration: 2.9, color: '#22c55e' },
  { left: '58%', delay: 0.8, duration: 3.3, color: '#6366f1' },
  { left: '78%', delay: 0.3, duration: 2.7, color: '#06b6d4' },
];

export function OnboardingSuccess({
  role,
  title,
  description,
  primaryButtonText = 'Enter Dashboard',
  primaryButtonHref = '/',
  petalCount = 20,
}: OnboardingSuccessProps) {
  const petals = useMemo(() => PETAL_POOL.slice(0, petalCount), [petalCount]);

  const defaultTitle =
    role === 'candidate' ? 'Profile Setup Complete' : 'Organization Successfully Registered';

  const defaultDescription =
    role === 'candidate'
      ? 'Your profile has been successfully created. Start exploring opportunities tailored to your expertise.'
      : 'Your organization is fully configured. You can now create assessments and evaluate talent efficiently.';

  const finalTitle = title || defaultTitle;
  const finalDescription = description || defaultDescription;

  return (
    <div className="relative flex items-center justify-center px-4">
      {/* 🌸 Falling Petals */}
      <div className="pointer-events-none fixed inset-0 z-1 overflow-hidden">
        {petals.map((petal, i) => (
          <motion.div
            key={i}
            initial={{ y: '-10vh', x: 0, rotate: 0, opacity: 1 }}
            animate={{
              y: '110vh',
              x: [0, 20, -20, 10, 0], // gentle sway
              rotate: 360,
              opacity: [1, 1, 0, 0], // fade out
            }}
            transition={{
              duration: petal.duration,
              delay: petal.delay,
              ease: 'easeInOut',
              times: [0, 0.6, 0.9, 1],
            }}
            className="absolute top-0 h-4 w-2 rounded-full"
            style={{
              left: petal.left,
              backgroundColor: petal.color,
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="w-full max-w-md"
      >
        <Card className="relative overflow-hidden border text-center shadow-sm backdrop-blur-xl">
          <CardHeader className="pt-10">
            {/* ✅ Animated Check */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              transition={{
                duration: 0.6,
                times: [0, 0.6, 1],
                ease: 'easeOut',
              }}
              className="relative mx-auto mb-6 flex items-center justify-center py-2"
            >
              <div className="bg-primary shadow-primary/20 relative flex h-20 w-20 items-center justify-center rounded-full shadow-lg">
                <motion.svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-10 w-10"
                >
                  <motion.path
                    d="M20 6L9 17L4 12"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.4,
                      ease: 'easeInOut',
                    }}
                  />
                </motion.svg>
              </div>
            </motion.div>

            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <CardTitle className="text-3xl font-semibold tracking-tight">{finalTitle}</CardTitle>
            </motion.div>
          </CardHeader>

          <CardContent className="px-8 pb-2">
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="text-muted-foreground leading-relaxed"
            >
              {finalDescription}
            </motion.p>
          </CardContent>

          <CardFooter className="flex flex-col gap-4 px-8 pb-10">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="w-full"
            >
              <Button
                asChild
                className="group relative w-full overflow-hidden rounded-xl py-6 text-base font-semibold"
              >
                <Link href={primaryButtonHref}>
                  <span className="relative z-10">{primaryButtonText}</span>

                  {/* Hover Light Sweep */}
                  <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                </Link>
              </Button>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-muted-foreground text-xs"
            >
              You can update your information anytime in settings.
            </motion.p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
