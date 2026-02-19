'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import type { KeyboardEvent } from 'react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { OnboardingCard } from '@/app/(onboarding)/_components/OnboardingCard';
import { OnboardingHeader } from '@/app/(onboarding)/_components/OnboardingHeader';
import { useCompleteOnboardingMutation } from '@/features/onboarding/api';
import {
  RecruiterOnboardingData,
  recruiterOnboardingSchema,
} from '@/lib/validation/onboarding/recruiter-onboarding.schema';

import StepOne from './Step1';
import StepTwo from './Step2';
import StepThree from './Step3';

const Page = () => {
  const router = useRouter();
  const [completeOnboarding, { isLoading: isCompleting, isSuccess: isCompleteSuccess }] =
    useCompleteOnboardingMutation();

  const form = useForm<RecruiterOnboardingData>({
    resolver: zodResolver(recruiterOnboardingSchema),
    mode: 'onTouched',
    defaultValues: {
      organizationName: '',
      organizationSize: '',
      industry: '',
      country: '',
      hiringDomains: [],
      experienceLevelsHiring: [],
      companyWebsite: '',
      llmProvider: '',
      llmApiKey: '',
      defaultModel: '',
    },
  });

  const [step, setStep] = useState<number>(0);

  useEffect(() => {
    if (isCompleteSuccess) {
      router.push('/onboarding/recruiter/completed');
    }
  }, [isCompleteSuccess, router]);

  async function onSubmit(data: RecruiterOnboardingData) {
    console.log('Recruiter Form submitted:', data);
    // try {
    //   await completeOnboarding(data).unwrap();
    // } catch (error) {
    //   console.error('Failed to complete onboarding:', error);
    // }
  }

  const steps = [
    {
      title: 'Organization Identity',
      description: 'Tell us about your organization to help us tailor the experience.',
      component: <StepOne form={form} />,
    },
    {
      title: 'Hiring Needs',
      description: 'Define the roles and experience levels you are looking for.',
      component: <StepTwo form={form} />,
    },
    {
      title: 'AI Configuration',
      description: 'Configure your LLM provider for generating assessments and analyzing results.',
      component: <StepThree form={form} />,
    },
  ];

  const stepFields: (keyof RecruiterOnboardingData)[][] = [
    ['organizationName', 'organizationSize', 'industry', 'country'],
    ['hiringDomains', 'experienceLevelsHiring', 'companyWebsite'],
    ['llmProvider', 'llmApiKey', 'defaultModel'],
  ];

  const nextStep = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const currentFields = stepFields[step];
    const valid = await form.trigger(currentFields);

    if (!valid) return;

    setStep((s) => s + 1);
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

  return (
    <main role="main" className="relative z-1 mx-auto w-full max-w-7xl flex-col">
      <div className="mx-auto flex w-full max-w-2xl flex-col items-center">
        <OnboardingHeader step={step} totalSteps={steps.length} stepTitle={steps[step].title} />
        <div data-shadcn className="w-full max-w-2xl">
          <form
            id="recruiter-onboarding"
            onSubmit={form.handleSubmit(onSubmit)}
            onKeyDown={handleFormKeyDown}
            aria-labelledby="recruiter-form-title"
          >
            <OnboardingCard
              step={step}
              totalSteps={steps.length}
              title={steps[step].title}
              description={steps[step].description}
              onPrev={prevStep}
              onNext={nextStep}
              isSubmitting={form.formState.isSubmitting || isCompleting}
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
