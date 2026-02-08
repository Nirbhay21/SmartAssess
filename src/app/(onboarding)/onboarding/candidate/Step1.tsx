import { useEffect, useMemo, useRef } from 'react';
import {
  Controller,
  ControllerRenderProps,
  FieldPath,
  UseFormReturn,
  useWatch,
} from 'react-hook-form';

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from '@/components/ui/combobox';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import {
  CANDIDATE_CURRENT_STATUS,
  DOMAIN_INDUSTRIES,
  DomainIndustry,
  HIGHEST_EDUCATION_LEVELS,
  PRIMARY_ROLES_BY_DOMAIN,
} from '@/constants/onboarding-form';
import { CandidateOnboardingData } from '@/lib/validation/onboarding/candidate-onboarding.schema';

type FieldKey = FieldPath<CandidateOnboardingData>;

const FIELD_CONFIG: Array<{
  name: FieldKey;
  label: string;
  placeholder?: string;
  required?: boolean;
}> = [
  {
    name: 'domain',
    label: 'Domain / Industry',
    placeholder: 'Select a domain or industry',
    required: true,
  },
  {
    name: 'primaryRole',
    label: 'Primary Role',
    placeholder: 'Select a primary role',
    required: true,
  },
  {
    name: 'highestEducation',
    label: 'Highest Education',
    placeholder: 'Select highest education',
    required: true,
  },
  {
    name: 'currentStatus',
    label: 'Current Status',
    placeholder: 'Select current status',
    required: true,
  },
];

const StepOne = ({ form }: { form: UseFormReturn<CandidateOnboardingData> }) => {
  // Watch domain to update dependent options
  const selectedDomain = useWatch({ control: form.control, name: 'domain' }) as DomainIndustry | '';

  // Memoize primary roles
  const primaryRoles = useMemo(
    () => (selectedDomain ? PRIMARY_ROLES_BY_DOMAIN[selectedDomain] : []),
    [selectedDomain],
  );

  // Reset primaryRole only when domain changes (skip initial mount)
  const prevDomainRef = useRef<DomainIndustry | '' | null>(null);
  useEffect(() => {
    if (prevDomainRef.current === null) {
      prevDomainRef.current = selectedDomain;
      return;
    }

    if (prevDomainRef.current !== selectedDomain) {
      form.setValue('primaryRole', '');
      prevDomainRef.current = selectedDomain;
    }
  }, [selectedDomain, form]);

  // Return items for a given field
  const getItemsFor = (name: FieldKey) => {
    switch (name) {
      case 'domain':
        return DOMAIN_INDUSTRIES;
      case 'primaryRole':
        return primaryRoles;
      case 'highestEducation':
        return HIGHEST_EDUCATION_LEVELS;
      case 'currentStatus':
        return CANDIDATE_CURRENT_STATUS;
      default:
        return [] as string[];
    }
  };

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
      {FIELD_CONFIG.map(({ name, label, placeholder, required }) => (
        <Controller
          key={String(name)}
          name={name}
          control={form.control}
          render={({ field, fieldState }) => {
            const items = getItemsFor(name);

            return (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  htmlFor={String(name)}
                  className="flex gap-1 font-semibold"
                  required={required}
                >
                  {label}
                </FieldLabel>

                <Combobox
                  id={String(name)}
                  key={name === 'primaryRole' ? selectedDomain || 'no-domain' : undefined}
                  items={items}
                  value={
                    Array.isArray(field.value)
                      ? (field.value[0] ?? '')
                      : ((field.value as string | undefined) ?? '')
                  }
                  onValueChange={(value) => handleComboboxValueChange(field, value)}
                  autoHighlight
                >
                  <ComboboxInput
                    {...field}
                    id={String(name)}
                    placeholder={placeholder}
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
            );
          }}
        />
      ))}
    </div>
  );
};

export default StepOne;
