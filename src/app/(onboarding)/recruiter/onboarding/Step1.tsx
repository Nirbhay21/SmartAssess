import { Controller, FieldPath, UseFormReturn } from 'react-hook-form';

import { FieldSkeleton } from '@/app/(onboarding)/_components/FormFieldSkeletons';
import Combobox from '@/components/ui/combobox';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
  COUNTRY_OPTIONS,
  DOMAIN_INDUSTRIES,
  ORGANIZATION_SIZES,
} from '@/constants/onboarding-form';
import { RecruiterOnboardingData } from '@/lib/validation/onboarding/recruiter-onboarding.schema';

const StepOne = ({
  form,
  isLoading = false,
}: {
  form: UseFormReturn<RecruiterOnboardingData>;
  isLoading?: boolean;
}) => {
  const countryOptions = COUNTRY_OPTIONS.map((country) => country.label);

  const FIELDS: Array<{
    name: FieldPath<RecruiterOnboardingData>;
    label: string;
    type: 'input' | 'combobox';
    placeholder?: string;
    autoComplete?: string;
    items?: readonly string[];
    searchPlaceholder?: string;
    ariaLabel?: string;
    className?: string;
    required?: boolean;
  }> = [
    {
      name: 'organizationName',
      label: 'Organization Name',
      type: 'input',
      placeholder: 'Enter organization name',
      autoComplete: 'organization',
      required: true,
    },
    {
      name: 'organizationSize',
      label: 'Organization Size',
      type: 'combobox',
      items: ORGANIZATION_SIZES,
      placeholder: 'Select organization size',
      required: true,
    },
    {
      name: 'industry',
      label: 'Industry',
      type: 'combobox',
      items: DOMAIN_INDUSTRIES,
      placeholder: 'Select industry',
      required: true,
    },
    {
      name: 'country',
      label: 'Country',
      type: 'combobox',
      items: countryOptions,
      placeholder: 'Select country',
      searchPlaceholder: 'Search...',
      ariaLabel: 'country',
      className: 'w-full',
      required: true,
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
                required={f.required}
              >
                {f.label}
              </FieldLabel>

              {isLoading ? (
                <FieldSkeleton />
              ) : (
                <>
                  {f.type === 'input' && (
                    <Input
                      {...field}
                      id={String(f.name)}
                      placeholder={f.placeholder}
                      autoComplete={f.autoComplete}
                      className="font-inter"
                    />
                  )}

                  {f.type === 'combobox' && (
                    <Combobox
                      id={String(f.name)}
                      {...field}
                      items={f.items || []}
                      placeholder={f.placeholder}
                      searchPlaceholder={f.searchPlaceholder}
                      ariaLabel={f.ariaLabel}
                      className={f.className ?? 'font-inter w-full'}
                    />
                  )}
                </>
              )}

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      ))}
    </div>
  );
};

export default StepOne;
