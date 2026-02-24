import Image from 'next/image';
import { Controller, FieldPath, UseFormReturn } from 'react-hook-form';

import { FieldSkeleton } from '@/app/(onboarding)/_components/FormFieldSkeletons';
import Combobox from '@/components/ui/combobox';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
  COUNTRY_OPTIONS,
  CountryOption,
  DOMAIN_INDUSTRIES,
  ORGANIZATION_SIZES,
} from '@/constants/onboarding-form';

// base organization fields shared by onboarding and edit dialog
interface OrgBasicFields {
  organizationName?: string;
  organizationSize?: string;
  industry?: string;
  countryCode?: string;
  organizationWebsite?: string;
}

const StepOne = <T extends OrgBasicFields>({
  form,
  isLoading = false,
}: {
  form: UseFormReturn<T>;
  isLoading?: boolean;
}) => {
  // we need full objects for value/label and flags
  const countryOptions = COUNTRY_OPTIONS;

  type FieldConfig = {
    name: FieldPath<T>;
    label: string;
    type: 'input' | 'combobox';
    placeholder?: string;
    autoComplete?: string;
    // combobox items can be simple strings or country option objects
    items?: readonly string[] | readonly CountryOption[];
    searchPlaceholder?: string;
    ariaLabel?: string;
    className?: string;
    required?: boolean;
  };

  const FIELDS: FieldConfig[] = [
    {
      name: 'organizationName' as FieldPath<T>,
      label: 'Organization Name',
      type: 'input',
      placeholder: 'Enter organization name',
      autoComplete: 'organization',
      required: true,
    },
    {
      name: 'organizationSize' as FieldPath<T>,
      label: 'Organization Size',
      type: 'combobox',
      items: ORGANIZATION_SIZES,
      placeholder: 'Select organization size',
      required: true,
    },
    {
      name: 'industry' as FieldPath<T>,
      label: 'Industry',
      type: 'combobox',
      items: DOMAIN_INDUSTRIES,
      placeholder: 'Select industry',
      required: true,
    },
    {
      name: 'countryCode' as FieldPath<T>,
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
                      // render flag only when editing country code
                      renderItem={(item) => {
                        if (f.name !== 'countryCode') {
                          return typeof item === 'string' ? item : item.label;
                        }
                        const code = typeof item === 'string' ? item : item.value;
                        const label = typeof item === 'string' ? item : item.label;
                        const flagUrl = `https://flagcdn.com/w20/${code.toLowerCase()}.png`;
                        return (
                          <div className="flex items-center gap-2">
                            <Image
                              src={flagUrl}
                              alt=""
                              width={20}
                              height={14}
                              className="shrink-0"
                              style={{ width: '20px', height: '14px' }}
                            />
                            {label}
                          </div>
                        );
                      }}
                      renderValue={(item) => {
                        if (f.name !== 'countryCode') {
                          return typeof item === 'string' ? item : item.label;
                        }
                        const code = typeof item === 'string' ? item : item.value;
                        const label = typeof item === 'string' ? item : item.label;
                        const flagUrl = `https://flagcdn.com/w20/${code.toLowerCase()}.png`;
                        return (
                          <div className="flex items-center gap-2">
                            <Image
                              src={flagUrl}
                              alt=""
                              width={20}
                              height={14}
                              className="shrink-0"
                              style={{ width: '20px', height: '14px' }}
                            />
                            {label}
                          </div>
                        );
                      }}
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
