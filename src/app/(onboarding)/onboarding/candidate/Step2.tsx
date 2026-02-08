import React from 'react';
import { Controller, ControllerRenderProps, UseFormReturn, useWatch } from 'react-hook-form';

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from '@/components/ui/combobox';
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

  const yearsOfExperienceOptions = YEARS_OF_EXPERIENCE.map((item) => item.label);

  const handleComboboxValueChange = (
    field: ControllerRenderProps<CandidateOnboardingData>,
    value: string | null,
  ) => {
    const newVal = (value ?? '') as string;
    const current = Array.isArray(field.value)
      ? (field.value[0] ?? '')
      : ((field.value as string | undefined) ?? '');
    if (newVal !== current) field.onChange(newVal);
  };

  return (
    <div className="space-y-6">
      <Controller
        control={form.control}
        name="topSkills"
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="topSkills" className="flex gap-1 font-semibold" required>
              Top Skills
            </FieldLabel>

            <MultipleSelector
              value={field.value?.map((skill: string) => ({
                label: skill,
                value: skill,
              }))}
              onChange={(options) => {
                field.onChange(options.map((option) => option.value));
              }}
              defaultOptions={topSkillsOptions}
              placeholder="Select or add your top skills..."
              badgeVariant="outline"
              creatable
              className="font-inter"
              emptyIndicator={
                <p className="text-center text-sm leading-10 text-gray-600 dark:text-gray-400">
                  no results found.
                </p>
              }
            />

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Controller
        control={form.control}
        name="yearsOfExperience"
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="yearsOfExperience" className="flex gap-1 font-semibold" required>
              Years of Experience
            </FieldLabel>

            <Combobox
              items={yearsOfExperienceOptions}
              value={field.value ?? ''}
              onValueChange={(value) => handleComboboxValueChange(field, value)}
              autoHighlight
            >
              <ComboboxInput
                id="yearsOfExperience"
                onBlur={field.onBlur}
                placeholder="Select years of experience"
                className="font-inter"
              />
              <ComboboxContent className="font-inter">
                <ComboboxEmpty>No items found.</ComboboxEmpty>
                <ComboboxList>
                  {(item) => (
                    <ComboboxItem key={item} value={item}>
                      {item}
                    </ComboboxItem>
                  )}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Controller
        control={form.control}
        name="professionalBio"
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="professionalBio" className="flex gap-1 font-semibold" required>
              Professional Bio
            </FieldLabel>

            <Textarea {...field} maxLength={200} rows={5} className="font-inter" />

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </div>
  );
};

export default StepTwo;
