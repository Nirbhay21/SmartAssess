'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import type { KeyboardEvent } from 'react';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';

import { OnboardingCard } from '@/app/(onboarding)/_components/OnboardingCard';
import { OnboardingHeader } from '@/app/(onboarding)/_components/OnboardingHeader';
import { FormStatus } from '@/app/(onboarding)/_components/StatusBadge';
import StepOne from '@/app/(onboarding)/candidate/onboarding/Step1';
import StepTwo from '@/app/(onboarding)/candidate/onboarding/Step2';
import StepThree from '@/app/(onboarding)/candidate/onboarding/Step3';
import {
  useCompleteOnboardingMutation,
  useGetOnboardingStatusQuery,
  useUpdateOnboardingStatusMutation,
} from '@/features/onboarding/api';
import { useSession } from '@/lib/auth-client';
import { getOnboardingType } from '@/lib/utils';
import {
  CandidateOnboardingData,
  CandidateOnboardingDraftData,
  candidateOnboardingSchema,
} from '@/lib/validation/onboarding/candidate-onboarding.schema';

const CandidateOnboardingClient = () => {
  const router = useRouter();
  const { data: session, isPending: isSessionPending } = useSession();
  const onboardingType = getOnboardingType(session?.user?.role);

  const { data: onboarding, isLoading: isOnboardingLoading } = useGetOnboardingStatusQuery(
    undefined,
    {
      skip: !session, // Skip the query if there's no session data
      refetchOnReconnect: true, // Refetch the onboarding status when the network reconnects
    },
  );

  // Track whether we've initialized local state from the server-provided onboarding
  const [hasInitialized, setHasInitialized] = useState(false);

  const isFetching = isSessionPending || isOnboardingLoading;
  // Use a derived state to ensure we show a loading indicator until hydration is complete
  const isLoading = useMemo(() => {
    // If we have already initialized, we are NO LONGER loading, regardless of background fetches
    if (hasInitialized) return false;
    // Otherwise, we are loading if we are fetching or waiting to initialize data
    if (isFetching) return true;
    if (onboarding && !hasInitialized) return true;
    return false;
  }, [isFetching, onboarding, hasInitialized]);

  const [
    updateOnboardingStatus,
    { isLoading: isUpdatingOnboardingStatus, isSuccess: isUpdateSuccess },
  ] = useUpdateOnboardingStatusMutation();

  const [completeOnboarding, { isLoading: isCompleting }] = useCompleteOnboardingMutation();

  // Track when to show "saved" status
  const [showSaved, setShowSaved] = useState(false);

  // Determine form status
  const formStatus: FormStatus = useMemo(() => {
    if (isLoading) return 'loading';
    if (isUpdatingOnboardingStatus) return 'saving';
    if (showSaved) return 'saved';
    return 'idle';
  }, [isLoading, isUpdatingOnboardingStatus, showSaved]);

  // Show "saved" badge for 2 seconds after successful update
  useEffect(() => {
    if (isUpdateSuccess) {
      // Use setTimeout to avoid synchronous setState in effect
      const showTimer = setTimeout(() => setShowSaved(true), 0);
      const hideTimer = setTimeout(() => setShowSaved(false), 2000);

      return () => {
        clearTimeout(showTimer);
        clearTimeout(hideTimer);
      };
    }
  }, [isUpdateSuccess, setShowSaved]);

  const formDefaultValues: CandidateOnboardingData = useMemo(() => {
    return {
      domain: '',
      primaryRole: '',
      highestEducation: '',
      currentStatus: '',
      topSkills: [],
      yearsOfExperience: '',
      professionalBio: '',
      country: '',
      portfolioUrl: '',
      githubUrl: '',
      linkedinUrl: '',
    };
  }, []);

  const form = useForm<CandidateOnboardingData>({
    resolver: zodResolver(candidateOnboardingSchema),
    mode: 'onTouched',
    defaultValues: formDefaultValues,
  });

  async function onSubmit(data: CandidateOnboardingData) {
    try {
      await completeOnboarding({
        onboardingType: 'candidate',
        currentStep: 3,
        onboardingData: data,
      }).unwrap();

      // session/app_meta refresh handled by RTK Query in onQueryStarted; manual fetch removed

      router.push('/candidate/onboarding/success');
    } catch (err) {
      console.error('Complete onboarding failed', err);
    }
  }

  const [step, setStep] = useState<number>(0);

  const steps = useMemo(
    () => [
      {
        title: 'Professional Identity',
        description: 'We use this to match you with the right job markets and salary bands.',
        component: <StepOne form={form} isLoading={isLoading} />,
      },
      {
        title: 'Expertise & Bio',
        description:
          'Recruiters filter candidates by skills and experience. Your bio helps you stand out.',
        component: <StepTwo form={form} isLoading={isLoading} />,
      },
      {
        title: 'Location & Presence',
        description:
          'Location matching helps with visa sponsorship/relocation. Social links build credibility.',
        component: <StepThree form={form} isLoading={isLoading} />,
      },
    ],
    [form, isLoading],
  );

  const stepFields: (keyof CandidateOnboardingData)[][] = useMemo(
    () => [
      ['domain', 'primaryRole', 'highestEducation', 'currentStatus'],
      ['topSkills', 'yearsOfExperience', 'professionalBio'],
      ['country', 'portfolioUrl', 'githubUrl', 'linkedinUrl'],
    ],
    [],
  );

  const nextStep = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const valid = await form.trigger(stepFields[step]);
    if (!valid) return;
    if (onboardingType === null) return;

    setStep((s) => s + 1);

    const rawFormData = form.getValues();
    const sanitizedFormData = (
      Object.keys(rawFormData) as Array<keyof CandidateOnboardingData>
    ).reduce((acc, key) => {
      const value = rawFormData[key];

      return {
        ...acc,
        [key]: !value || (Array.isArray(value) && value.length === 0) ? undefined : value,
      };
    }, {} as CandidateOnboardingDraftData);

    updateOnboardingStatus({
      currentStep: step + 1,
      isCompleted: false,
      onboardingType: 'candidate',
      draft: sanitizedFormData,
    });
  };

  const prevStep = () => setStep((s) => s - 1);

  const handleFormKeyDown = (event: KeyboardEvent<HTMLFormElement>) => {
    if (event.key !== 'Enter') return;

    const target = event.target as HTMLElement | null;
    if (!target) return;

    const tagName = target.tagName.toLowerCase();
    if (tagName === 'textarea') return;

    event.preventDefault();
  };

  // HYDRATION: Reset form and sync step when data first arrives
  useEffect(() => {
    // Only run this ONCE when onboarding data is first available
    if (hasInitialized || !onboarding) return;

    // Defensive redirect guard: ensure we have a stable client state before redirecting
    if (onboarding.status === 'completed') {
      if (
        isLoading ||
        !session ||
        onboarding.onboardingType !== 'candidate' ||
        onboardingType !== 'candidate'
      ) {
        // still hydrating or role mismatch — wait for a stable state
        return;
      }
      router.replace('/candidate/onboarding/success');
      return;
    }

    if (onboarding.status === 'not_started') {
      setTimeout(() => setHasInitialized(true), 0);
      return;
    }

    if (onboarding.status === 'in_progress' && onboarding.onboardingType === 'candidate') {
      // 1. Load the draft into the form
      if (onboarding.draft) {
        form.reset({
          ...formDefaultValues,
          ...onboarding.draft,
        });
      }

      // 2. Set the current step
      if (typeof onboarding.currentStep === 'number') {
        setTimeout(() => setStep(onboarding.currentStep), 0);
      }

      // 3. Mark initialization as complete
      setTimeout(() => setHasInitialized(true), 0);
    }
  }, [
    onboarding,
    form,
    formDefaultValues,
    router,
    hasInitialized,
    session,
    isLoading,
    onboardingType,
  ]);

  return (
    <main role="main" className="relative z-1 mx-auto w-full max-w-7xl flex-col">
      <div className="mx-auto flex w-full max-w-2xl flex-col items-center">
        <OnboardingHeader step={step} totalSteps={steps.length} stepTitle={steps[step].title} />
        <div data-shadcn className="w-full max-w-2xl">
          <form
            id="candidate-onboarding"
            onSubmit={form.handleSubmit(onSubmit, (errors) => {
              console.error('Onboarding validation errors:', errors);
            })}
            onKeyDown={handleFormKeyDown}
            aria-labelledby="candidate-form-title"
          >
            <OnboardingCard
              step={step}
              totalSteps={steps.length}
              title={steps[step].title}
              description={steps[step].description}
              onPrev={prevStep}
              onNext={nextStep}
              isSubmitting={form.formState.isSubmitting || isCompleting}
              status={formStatus}
            >
              {steps[step].component}
            </OnboardingCard>
          </form>
        </div>
      </div>
    </main>
  );
};

export default CandidateOnboardingClient;
