'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';

import { OnboardingCard } from '@/app/(onboarding)/_components/OnboardingCard';
import { OnboardingHeader } from '@/app/(onboarding)/_components/OnboardingHeader';
import {
  CandidateOnboardingData,
  candidateOnboardingSchema,
} from '@/lib/validation/onboarding/candidate-onboarding.schema';

import StepOne from './Step1';
import StepTwo from './Step2';
import StepThree from './Step3';

const Page = () => {
  const form = useForm({
    resolver: zodResolver(candidateOnboardingSchema),
    mode: 'onTouched',
    defaultValues: {
      domain: '',
      primaryRole: '',
      highestEducation: '',
      currentStatus: '',
      topSkills: [],
      yearsOfExperience: undefined,
      professionalBio: '',
      country: '',
      portfolioUrl: '',
      githubUrl: '',
      linkedinUrl: '',
    },
  }) as UseFormReturn<CandidateOnboardingData>;

  function onSubmit(data: CandidateOnboardingData) {
    console.log('Form submitted:', data);
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

    setStep((s) => s + 1);
  };

  const prevStep = () => setStep((s) => s - 1);

  return (
    <main role="main" className="relative z-1 mx-auto w-full max-w-7xl flex-col">
      <div className="mx-auto flex w-full max-w-2xl flex-col items-center">
        <OnboardingHeader step={step} totalSteps={steps.length} stepTitle={steps[step].title} />
        <div data-shadcn className="w-full max-w-2xl">
          <form
            id="candidate-onboarding"
            onSubmit={form.handleSubmit(onSubmit)}
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
