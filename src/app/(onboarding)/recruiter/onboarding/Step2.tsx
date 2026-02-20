import { useMemo } from 'react';
import { Controller, FieldPath, UseFormReturn } from 'react-hook-form';

import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import MultipleSelector, { Option } from '@/components/ui/multiple-selector';
import { DOMAIN_INDUSTRIES, EXPERIENCE_LEVELS } from '@/constants/onboarding-form';
import { RecruiterOnboardingData } from '@/lib/validation/onboarding/recruiter-onboarding.schema';

const StepTwo = ({ form }: { form: UseFormReturn<RecruiterOnboardingData> }) => {
  const domainOptions: Option[] = useMemo(
    () => DOMAIN_INDUSTRIES.map((d) => ({ label: d, value: d })),
    [],
  );

  const experienceOptions: Option[] = useMemo(
    () => EXPERIENCE_LEVELS.map((e) => ({ label: e, value: e })),
    [],
  );

  const FIELDS: Array<{
    name: FieldPath<RecruiterOnboardingData>;
    label: string;
    type: 'multiple' | 'input';
    placeholder?: string;
    defaultOptions?: Option[];
    creatable?: boolean;
    optional?: boolean;
  }> = [
    {
      name: 'hiringDomains',
      label: 'Hiring Domains',
      type: 'multiple',
      defaultOptions: domainOptions,
      placeholder: 'Select domains you hire for...',
      creatable: false,
    },
    {
      name: 'experienceLevelsHiring',
      label: 'Experience Levels',
      type: 'multiple',
      defaultOptions: experienceOptions,
      placeholder: 'Select experience levels...',
      creatable: false,
    },
    {
      name: 'companyWebsite',
      label: 'Company Website',
      type: 'input',
      placeholder: 'https://example.com',
      optional: true,
    },
  ];

  return (
    <div className="space-y-6">
      {FIELDS.map((f) => (
        <Controller
          key={String(f.name)}
          control={form.control}
          name={f.name}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel
                htmlFor={String(f.name)}
                className="flex gap-1 font-semibold"
                required={!f.optional}
                optional={f.optional}
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
                  defaultOptions={f.defaultOptions}
                  placeholder={f.placeholder}
                  badgeVariant="outline"
                  creatable={f.creatable}
                  className="font-inter"
                  emptyIndicator={
                    <p className="text-center text-sm leading-10 text-gray-600 dark:text-gray-400">
                      no results found.
                    </p>
                  }
                />
              )}

              {f.type === 'input' && (
                <Input
                  {...field}
                  id={String(f.name)}
                  placeholder={f.placeholder}
                  type={String(f.name) === 'companyWebsite' ? 'url' : undefined}
                  autoComplete={String(f.name) === 'companyWebsite' ? 'url' : undefined}
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
