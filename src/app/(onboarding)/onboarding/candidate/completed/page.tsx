'use client';

import { OnboardingSuccess } from '@/app/(onboarding)/_components/OnboardingSuccess';

export default function CandidateCompletedPage() {
  return (
    <main className="flex items-center justify-center">
      <OnboardingSuccess
        role="candidate"
        primaryButtonHref="/candidate/dashboard" // Assuming this will be the path
      />
    </main>
  );
}
