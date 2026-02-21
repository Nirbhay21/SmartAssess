export interface MeResponse {
  id: string;
  email: string;
  name: string;
  role: 'candidate' | 'recruiter';
  onboardingStatus: 'not_started' | 'in_progress' | 'completed';
}
