import { useMemo } from 'react';
import { Controller, FieldPath, UseFormReturn } from 'react-hook-form';

import {
  FieldSkeleton,
  MultipleSelectorSkeleton,
} from '@/app/(onboarding)/_components/FormFieldSkeletons';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import MultipleSelector, { Option } from '@/components/ui/multiple-selector';
import { DOMAIN_INDUSTRIES, EXPERIENCE_LEVELS } from '@/constants/onboarding-form';

// generic form component that works with any object containing the expected
// recruiter organization fields (names must match). By making the component
// generic we avoid casting when the parent form uses a subset type.
type OrgStepFields = {
  hiringDomains?: string[];
  experienceLevels?: string[];
  organizationWebsite?: string;
};

const StepTwo = <T extends OrgStepFields>({
  form,
  isLoading = false,
}: {
  form: UseFormReturn<T>;
  isLoading?: boolean;
}) => {
  const domainOptions: Option[] = useMemo(
    () => DOMAIN_INDUSTRIES.map((d) => ({ label: d, value: d })),
    [],
  );

  const experienceOptions: Option[] = useMemo(
    () => EXPERIENCE_LEVELS.map((e) => ({ label: e, value: e })),
    [],
  );

  const FIELDS: Array<{
    name: FieldPath<T>;
    label: string;
    type: 'multiple' | 'input';
    placeholder?: string;
    defaultOptions?: Option[];
    creatable?: boolean;
    optional?: boolean;
  }> = [
    {
      name: 'hiringDomains' as FieldPath<T>,
      label: 'Hiring Domains',
      type: 'multiple',
      defaultOptions: domainOptions,
      placeholder: 'Select domains you hire for...',
      creatable: false,
    },
    {
      // experienceLevels is the shared key used by both onboarding and org schema
      name: 'experienceLevels' as FieldPath<T>,
      label: 'Experience Levels',
      type: 'multiple',
      defaultOptions: experienceOptions,
      placeholder: 'Select experience levels...',
      creatable: false,
    },
    {
      name: 'organizationWebsite' as FieldPath<T>,
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

              {isLoading ? (
                f.type === 'multiple' ? (
                  <MultipleSelectorSkeleton />
                ) : (
                  <FieldSkeleton />
                )
              ) : (
                <>
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
                      type={String(f.name) === 'organizationWebsite' ? 'url' : undefined}
                      autoComplete={String(f.name) === 'organizationWebsite' ? 'url' : undefined}
                      className="font-inter"
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

export default StepTwo;
