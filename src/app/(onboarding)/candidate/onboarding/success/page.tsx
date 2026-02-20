'use client';

import { OnboardingSuccess } from '@/app/(onboarding)/_components/OnboardingSuccess';

export default function CandidateOnboardingSuccess() {
  return (
    <main className="flex items-center justify-center">
      <OnboardingSuccess role="candidate" primaryButtonHref="/candidate/dashboard" />
    </main>
  );
}
