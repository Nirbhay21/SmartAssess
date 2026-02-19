import CandidateOnboardingClient from './CandidateOnboardingClient';

// Server-side route protection: only allow authenticated users with role `candidate`.
// - If not authenticated -> redirect to /signin
// - If authenticated but not a candidate -> redirect to their onboarding/home route

export default function Page() {
  return <CandidateOnboardingClient />;
}
