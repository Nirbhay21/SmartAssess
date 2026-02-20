'use client';

import { OnboardingSuccess } from '@/app/(onboarding)/_components/OnboardingSuccess';

export default function RecruiterOnboardingSuccess() {
  return (
    <main className="flex min-h-[calc(100vh-100px)] items-center justify-center">
      <OnboardingSuccess role="recruiter" primaryButtonHref="/recruiter/dashboard" />
    </main>
  );
}
