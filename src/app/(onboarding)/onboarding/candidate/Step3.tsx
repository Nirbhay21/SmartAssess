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
              items={countryOptions}
              value={field.value ?? ''}
              onValueChange={(value) => handleComboboxValueChange(field, value)}
              autoHighlight
            >
              <ComboboxInput
                {...field}
                id="country"
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
      <Controller
        control={form.control}
        name="portfolioUrl"
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="portfolioUrl" className="flex gap-1 font-semibold" optional>
              Portfolio URL
            </FieldLabel>

            <Input placeholder="Enter your portfolio URL" {...field} className="font-inter" />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Controller
        control={form.control}
        name="linkedinUrl"
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="linkedinUrl" className="flex gap-1 font-semibold" optional>
              LinkedIn URL
            </FieldLabel>

            <Input placeholder="Enter your LinkedIn URL" {...field} className="font-inter" />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Controller
        control={form.control}
        name="githubUrl"
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="githubUrl" className="flex gap-1 font-semibold" optional>
              GitHub URL
            </FieldLabel>

            <Input placeholder="Enter your GitHub URL" {...field} className="font-inter" />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </div>
  );
};

export default StepThree;
