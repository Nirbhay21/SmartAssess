import type { ReactNode } from 'react';

export default function OnboardingLayout({ children }: { children: ReactNode }) {
  return <div className="flex min-h-screen justify-center px-4 py-12 sm:py-16">{children}</div>;
}
