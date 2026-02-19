import {
  CandidateOnboardingData,
  CandidateOnboardingDraftData,
} from '@/lib/validation/onboarding/candidate-onboarding.schema.js';
import {
  RecruiterOnboardingData,
  RecruiterOnboardingDraftData,
} from '@/lib/validation/onboarding/recruiter-onboarding.schema.js';

export type OnboardingStatusResponse =
  | {
      status: 'not_started';
      onboardingType: UserType;
      currentStep: null;
      draft: null;
    }
  | {
      status: 'completed';
      onboardingType: UserType;
      currentStep: null;
      draft: null;
    }
  | {
      status: 'in_progress';
      onboardingType: 'candidate';
      currentStep: number;
      draft: CandidateOnboardingDraftData | null;
    }
  | {
      status: 'in_progress';
      onboardingType: 'recruiter';
      currentStep: number;
      draft: RecruiterOnboardingDraftData | null;
    };

export type OnboardingInitializeResponse = {
  type: 'initialized';
  currentStep: number;
  isCompleted: boolean;
};

export type UpdateOnboardingStatusResponse =
  | OnboardingInitializeResponse
  | {
      type: 'draft_saved';
      currentStep: number;
      isCompleted: false;
    };

export type UpdateOnboardingStatusPayload =
  | {
      currentStep: number;
      isCompleted: boolean;
      onboardingType: 'candidate';
      draft: CandidateOnboardingDraftData;
    }
  | {
      currentStep: number;
      isCompleted: boolean;
      onboardingType: 'recruiter';
      draft: RecruiterOnboardingDraftData;
    };

export type CompleteOnboardingResponse = {
  type: 'completed';
  currentStep: number;
  isCompleted: true;
};

export type CompletedOnboardingPayload =
  | {
      onboardingType: 'candidate';
      currentStep: number;
      onboardingData: CandidateOnboardingData;
    }
  | {
      onboardingType: 'recruiter';
      currentStep: number;
      onboardingData: RecruiterOnboardingData;
    };
