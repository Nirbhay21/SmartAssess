import { Controller, ControllerRenderProps, UseFormReturn } from 'react-hook-form';

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from '@/components/ui/combobox';
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

const StepThree = ({ form }: { form: UseFormReturn<CandidateOnboardingData> }) => {
  const countryOptions = COUNTRY_OPTIONS.map((country) => country.label);

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
        name="country"
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="country" className="flex gap-1 font-semibold" required>
              Country
            </FieldLabel>

            <Combobox
              id="country"
              name="country"
              autoComplete="country-name"
              items={countryOptions}
              value={field.value ?? ''}
              onValueChange={(value) => handleComboboxValueChange(field, value)}
              autoHighlight
            >
              <ComboboxInput
                {...field}
                id="country"
                name="country"
                placeholder="Select your country"
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

              <Input
                {...field}
                id={name}
                autoComplete={autoComplete}
                placeholder={placeholder}
                className="font-inter"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      ))}
    </div>
  );
};

export default StepThree;
