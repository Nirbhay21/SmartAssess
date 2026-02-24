import Image from 'next/image';
import { useState } from 'react';
import { Controller, UseFormReturn } from 'react-hook-form';

import { FieldSkeleton } from '@/app/(onboarding)/_components/FormFieldSkeletons';
import Combobox from '@/components/ui/combobox';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { COUNTRY_OPTIONS } from '@/constants/onboarding-form';
import { cn } from '@/lib/utils';
import { CandidateOnboardingData } from '@/lib/validation/onboarding/candidate-onboarding.schema';

const FlagImage = ({ src, alt = '', className, ...props }: React.ComponentProps<typeof Image>) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="bg-muted/20 relative h-4 w-5 shrink-0 overflow-hidden">
      <Image
        src={src}
        alt={alt}
        className={cn(
          'h-full w-full object-cover transition-opacity duration-300',
          isLoading ? 'opacity-0' : 'opacity-100',
          className,
        )}
        onLoad={() => setIsLoading(false)}
        {...props}
      />
    </div>
  );
};

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
  // pass the full objects so we can render flags and keep the value/code
  const countryOptions = COUNTRY_OPTIONS;

  return (
    <div className="space-y-6">
      <Controller
        control={form.control}
        name="countryCode"
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="country" className="flex gap-1 font-semibold" required>
              Country
            </FieldLabel>

            {isLoading ? (
              <FieldSkeleton />
            ) : (
              <Combobox
                id="countryCode"
                {...field}
                items={countryOptions}
                placeholder="Select your country"
                className="font-inter w-full"
                // renderItem adds the flag next to each option
                renderItem={(item) => {
                  const code = typeof item === 'string' ? item : item.value;
                  const label = typeof item === 'string' ? item : item.label;
                  const flagUrl = `https://flagcdn.com/w40/${code.toLowerCase()}.png`;

                  return (
                    <div className="flex items-center gap-2">
                      <FlagImage src={flagUrl} alt={`Flag of ${label}`} width={20} height={14} />
                      {label}
                    </div>
                  );
                }}
                // also show the flag when a value is selected
                renderValue={(item) => {
                  const code = typeof item === 'string' ? item : item.value;
                  const label = typeof item === 'string' ? item : item.label;
                  const flagUrl = `https://flagcdn.com/w40/${code.toLowerCase()}.png`;

                  return (
                    <div className="flex items-center gap-2">
                      <FlagImage src={flagUrl} alt={`Flag of ${label}`} width={20} height={14} />
                      {label}
                    </div>
                  );
                }}
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
