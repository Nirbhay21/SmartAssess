import React from 'react';
import { Controller, FieldPath, UseFormReturn } from 'react-hook-form';

import { FieldSkeleton } from '@/app/(onboarding)/_components/FormFieldSkeletons';
import Combobox from '@/components/ui/combobox';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { RecruiterOnboardingData } from '@/lib/validation/onboarding/recruiter-onboarding.schema';

const LLM_PROVIDERS = [
  'OpenAI',
  'Anthropic',
  'Google Gemini',
  'Mistral AI',
  'Meta Llama (via Provider)',
  'Azure OpenAI',
];

const StepThree = ({
  form,
  isLoading = false,
}: {
  form: UseFormReturn<RecruiterOnboardingData>;
  isLoading?: boolean;
}) => {
  const FIELDS: Array<{
    name: FieldPath<RecruiterOnboardingData>;
    label: string;
    type: 'combobox' | 'input';
    placeholder?: string;
    items?: readonly string[];
    inputProps?: React.ComponentProps<'input'> | undefined;
    helperText?: string;
    optional?: boolean;
    required?: boolean;
  }> = [
    {
      name: 'llmProvider',
      label: 'LLM Provider',
      type: 'combobox',
      items: LLM_PROVIDERS,
      placeholder: 'Select LLM Provider',
      required: true,
    },
    {
      name: 'llmApiKey',
      label: 'API Key',
      type: 'input',
      placeholder: 'sk-...',
      inputProps: { type: 'password', autoComplete: 'off' },
      helperText: 'Your API key is encrypted and stored securely.',
      required: true,
    },
    {
      name: 'defaultModel',
      label: 'Default Model',
      type: 'input',
      placeholder: 'e.g. gpt-4-turbo, claude-3-opus-20240229',
      helperText: 'Override the default model for the selected provider.',
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
                required={f.required}
                optional={f.optional}
              >
                {f.label}
              </FieldLabel>

              {isLoading ? (
                <FieldSkeleton />
              ) : (
                <>
                  {f.type === 'combobox' && (
                    <Combobox
                      id={String(f.name)}
                      {...field}
                      items={f.items || []}
                      placeholder={f.placeholder}
                      className="font-inter w-full"
                    />
                  )}

                  {f.type === 'input' && (
                    <>
                      <Input
                        {...field}
                        id={String(f.name)}
                        placeholder={f.placeholder}
                        className="font-inter"
                        {...f.inputProps}
                      />
                      {f.helperText && (
                        <p className="text-muted-foreground mt-1 text-xs">{f.helperText}</p>
                      )}
                    </>
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

export default StepThree;
