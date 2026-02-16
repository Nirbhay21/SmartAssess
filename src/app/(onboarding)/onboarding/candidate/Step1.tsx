import { useEffect, useMemo, useRef } from 'react';
import { Controller, FieldPath, UseFormReturn, useWatch } from 'react-hook-form';

import Combobox from '@/components/ui/combobox';
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

  // Reset primaryRole only when domain changes (skip initial mount).
  // Preserve the value if the incoming primaryRole is valid for the new domain
  const prevDomainRef = useRef<DomainIndustry | '' | null>(null);
  useEffect(() => {
    if (prevDomainRef.current === null) {
      prevDomainRef.current = selectedDomain;
      return;
    }

    if (prevDomainRef.current !== selectedDomain) {
      const currentPrimary = form.getValues('primaryRole');
      const allowedRoles = selectedDomain ? PRIMARY_ROLES_BY_DOMAIN[selectedDomain] : [];

      // Only clear if the current primaryRole is not among the allowed roles
      if (!currentPrimary || !allowedRoles.includes(currentPrimary)) {
        form.setValue('primaryRole', '');
      }

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
                  {...field}
                  items={items}
                  placeholder={placeholder}
                  className="font-inter w-full"
                />

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
