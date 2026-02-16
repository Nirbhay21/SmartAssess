'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import type { KeyboardEvent } from 'react';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';

import { OnboardingCard } from '@/app/(onboarding)/_components/OnboardingCard';
import { OnboardingHeader } from '@/app/(onboarding)/_components/OnboardingHeader';
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

import StepOne from './Step1';
import StepTwo from './Step2';
import StepThree from './Step3';

const Page = () => {
  const { data: session } = useSession();
  const onboardingType = getOnboardingType(session?.user?.role);

  const { data: onboarding, isLoading: isOnboardingLoading } = useGetOnboardingStatusQuery(
    undefined,
    {
      skip: !session, // Skip the query if there's no session data
      refetchOnReconnect: true, // Refetch the onboarding status when the network reconnects
    },
  );
  const [
    updateOnboardingStatus,
    { isLoading: isUpdatingOnboardingStatus, data: updateOnboardingStatusData },
  ] = useUpdateOnboardingStatusMutation();

  const [completeOnboarding, { isLoading: isCompletingOnboarding }] =
    useCompleteOnboardingMutation();

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

  function onSubmit(data: CandidateOnboardingData) {
    completeOnboarding({
      onboardingType: 'candidate',
      currentStep: 3,
      onboardingData: data,
    });
    console.log('Candidate Form submitted:', data);
  }

  const [step, setStep] = useState<number>(0);

  const steps = [
    {
      title: 'Professional Identity',
      description: 'We use this to match you with the right job markets and salary bands.',
      component: <StepOne form={form} />,
    },
    {
      title: 'Expertise & Bio',
      description:
        'Recruiters filter candidates by skills and experience. Your bio helps you stand out.',
      component: <StepTwo form={form} />,
    },
    {
      title: 'Location & Presence',
      description:
        'Location matching helps with visa sponsorship/relocation. Social links build credibility.',
      component: <StepThree form={form} />,
    },
  ];

  const stepFields: (keyof CandidateOnboardingData)[][] = [
    ['domain', 'primaryRole', 'highestEducation', 'currentStatus'],
    ['topSkills', 'yearsOfExperience', 'professionalBio'],
    ['country', 'portfolioUrl', 'githubUrl', 'linkedinUrl'],
  ];

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

    console.log(sanitizedFormData);

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

  // Reset form with draft data when onboarding data is loaded
  useEffect(() => {
    if (onboarding?.onboardingType === 'candidate' && onboarding.draft) {
      form.reset({
        ...formDefaultValues,
        ...onboarding.draft,
      });
    }
  }, [onboarding, form, formDefaultValues]);

  return (
    <main role="main" className="relative z-1 mx-auto w-full max-w-7xl flex-col">
      <div className="mx-auto flex w-full max-w-2xl flex-col items-center">
        <OnboardingHeader step={step} totalSteps={steps.length} stepTitle={steps[step].title} />
        <div data-shadcn className="w-full max-w-2xl">
          <form
            id="candidate-onboarding"
            onSubmit={form.handleSubmit(onSubmit)}
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
              isSubmitting={form.formState.isSubmitting}
            >
              {steps[step].component}
            </OnboardingCard>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Page;
