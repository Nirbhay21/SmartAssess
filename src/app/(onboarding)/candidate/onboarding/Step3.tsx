import { Controller, UseFormReturn } from 'react-hook-form';

import { FieldSkeleton } from '@/app/(onboarding)/_components/FormFieldSkeletons';
import Combobox from '@/components/ui/combobox';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { COUNTRY_OPTIONS } from '@/constants/onboarding-form';
import { CandidateOnboardingData } from '@/lib/validation/onboarding/candidate-onboarding.schema';

const URL_FIELDS = [
  {
    name: 'portfolioUrl',
    label: 'Portfolio URL',
    placeholder: 'Enter your portfolio URL',
    autoComplete: 'url',
  },
  {
    name: 'linkedinUrl',
    label: 'LinkedIn URL',
    placeholder: 'Enter your LinkedIn URL',
    autoComplete: 'url',
  },
  {
    name: 'githubUrl',
    label: 'GitHub URL',
    placeholder: 'Enter your GitHub URL',
    autoComplete: 'url',
  },
] as const;

const StepThree = ({
  form,
  isLoading = false,
}: {
  form: UseFormReturn<CandidateOnboardingData>;
  isLoading?: boolean;
}) => {
  const countryOptions = COUNTRY_OPTIONS.map((country) => country.label);

  return (
    <div className="space-y-6">
      <Controller
        control={form.control}
        name="country"
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="country" className="flex gap-1 font-semibold" required>
              Country
            </FieldLabel>

            {isLoading ? (
              <FieldSkeleton />
            ) : (
              <Combobox
                id="country"
                {...field}
                items={countryOptions}
                placeholder="Select your country"
                className="font-inter w-full"
              />
            )}

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      {URL_FIELDS.map(({ name, label, placeholder, autoComplete }) => (
        <Controller
          key={name}
          control={form.control}
          name={name}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={name} className="flex gap-1 font-semibold" optional>
                {label}
              </FieldLabel>

              {isLoading ? (
                <FieldSkeleton />
              ) : (
                <Input
                  {...field}
                  id={name}
                  autoComplete={autoComplete}
                  placeholder={placeholder}
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

export default StepThree;
