'use client';

import { OnboardingSuccess } from '@/app/(onboarding)/_components/OnboardingSuccess';

export default function RecruiterCompletedPage() {
  return (
    <main className="flex min-h-[calc(100vh-100px)] items-center justify-center">
      <OnboardingSuccess
        role="recruiter"
        primaryButtonHref="/recruiter/dashboard" // Assuming this will be the path
      />
    </main>
  );
}
