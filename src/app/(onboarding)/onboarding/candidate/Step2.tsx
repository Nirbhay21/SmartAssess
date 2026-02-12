import React from 'react';
import { Controller, FieldPath, UseFormReturn, useWatch } from 'react-hook-form';

import Combobox from '@/components/ui/combobox';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import MultipleSelector, { Option } from '@/components/ui/multiple-selector';
import { Textarea } from '@/components/ui/textarea';
import {
  DomainIndustry,
  TOP_SKILLS_BY_DOMAIN,
  YEARS_OF_EXPERIENCE,
} from '@/constants/onboarding-form';
import { CandidateOnboardingData } from '@/lib/validation/onboarding/candidate-onboarding.schema';

const StepTwo = ({ form }: { form: UseFormReturn<CandidateOnboardingData> }) => {
  const selectedDomain = useWatch({ control: form.control, name: 'domain' }) as DomainIndustry | '';
  const topSkillsOptions = React.useMemo(() => {
    // If no domain is selected, return an empty array or a default set of options
    if (!selectedDomain) return [];
    // Map the top skills based on the selected domain
    return TOP_SKILLS_BY_DOMAIN[selectedDomain].map(
      (skill) => ({ label: skill, value: skill }) as Option,
    );
  }, [selectedDomain]);

  const yearsOfExperienceOptions = YEARS_OF_EXPERIENCE;

  const fields: Array<{
    name: FieldPath<CandidateOnboardingData>;
    label: string;
    type: 'multiple' | 'combobox' | 'textarea';
    placeholder?: string;
    defaultOptions?: Option[] | ReadonlyArray<string | { value: string; label?: string }>;
    required?: boolean;
  }> = [
    {
      name: 'topSkills',
      label: 'Top Skills',
      type: 'multiple',
      placeholder: 'Select or add your top skills...',
      defaultOptions: topSkillsOptions,
      required: true,
    },
    {
      name: 'yearsOfExperience',
      label: 'Years of Experience',
      type: 'combobox',
      placeholder: 'Select years of experience',
      defaultOptions: yearsOfExperienceOptions,
      required: true,
    },
    {
      name: 'professionalBio',
      label: 'Professional Bio',
      type: 'textarea',
      required: true,
    },
  ];

  return (
    <div className="space-y-6">
      {fields.map((f) => (
        <Controller
          key={String(f.name)}
          control={form.control}
          name={f.name}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel
                htmlFor={String(f.name)}
                className="flex gap-1 font-semibold"
                required={f.required}
              >
                {f.label}
              </FieldLabel>

              {f.type === 'multiple' && (
                <MultipleSelector
                  {...field}
                  inputProps={{ id: String(f.name), name: String(f.name) }}
                  value={
                    Array.isArray(field.value)
                      ? field.value.map((v: string) => ({ label: v, value: v }))
                      : []
                  }
                  onChange={(options) => field.onChange(options.map((o) => o.value))}
                  defaultOptions={f.defaultOptions as Option[]}
                  placeholder={f.placeholder}
                  badgeVariant="outline"
                  creatable
                  className="font-inter"
                  emptyIndicator={
                    <p className="text-center text-sm leading-10 text-gray-600 dark:text-gray-400">
                      no results found.
                    </p>
                  }
                />
              )}

              {f.type === 'combobox' && (
                <Combobox
                  id={String(f.name)}
                  {...field}
                  items={f.defaultOptions as (string | { value: string; label?: string })[]}
                  placeholder={f.placeholder}
                  className="font-inter w-full"
                />
              )}

              {f.type === 'textarea' && (
                <Textarea
                  {...field}
                  id={String(f.name)}
                  maxLength={200}
                  rows={5}
                  className="font-inter"
                />
              )}

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      ))}
    </div>
  );
};

export default StepTwo;
