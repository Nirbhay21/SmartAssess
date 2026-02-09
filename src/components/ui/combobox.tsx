'use client';

import { CheckIcon, ChevronsUpDownIcon } from 'lucide-react';
import React, { useMemo, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

type Item = string | { value: string; label?: string };

export interface ComboboxProps {
  items?: readonly Item[];
  id?: string;
  name?: string;
  inputId?: string;
  /** Controlled value (accept string or string[] from form controllers) */
  value?: string | string[];
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  searchPlaceholder?: string;
  ariaLabel?: string;
  className?: string;
  buttonClassName?: string;
  renderItem?: (item: Item) => React.ReactNode;
  emptyMessage?: string;
  disabled?: boolean;
  enableSearch?: boolean;
}
function toValue(item: Item) {
  return typeof item === 'string' ? item : item.value;
}

function toLabel(item: Item) {
  return typeof item === 'string' ? item : (item.label ?? item.value);
}

const Combobox = React.forwardRef<HTMLInputElement, ComboboxProps>(
  (
    {
      items = [],
      id,
      name,
      inputId,
      value: controlledValue,
      defaultValue,
      onValueChange,
      onChange,
      onBlur,
      placeholder = 'Select...',
      searchPlaceholder = 'Search...',
      ariaLabel = 'combobox',
      className,
      buttonClassName,
      renderItem,
      emptyMessage = 'No results found.',
      disabled = false,
      enableSearch = true,
    }: ComboboxProps,
    forwardedRef,
  ) => {
    const [open, setOpen] = useState(false);
    const [internalValue, setInternalValue] = useState<string>(defaultValue ?? '');
    const [query, setQuery] = useState('');

    const computedInputId = inputId ?? (id ? `${id}-input` : undefined);

    const normalizedValue = Array.isArray(controlledValue)
      ? (controlledValue[0] ?? '')
      : (controlledValue ?? internalValue);

    const normalized = useMemo(
      () => items.map((i) => ({ value: toValue(i), label: toLabel(i) })),
      [items],
    );

    const filtered = useMemo(() => {
      if (!enableSearch || !query) return normalized;
      const q = query.toLowerCase();
      return normalized.filter(
        (i) => i.label.toLowerCase().includes(q) || i.value.toLowerCase().includes(q),
      );
    }, [normalized, query, enableSearch]);

    function handleSelect(val: string) {
      // call both callbacks: prop-level and generic onChange (for Controller support)
      if (onValueChange) onValueChange(val);
      if (onChange) onChange(val);
      else setInternalValue((prev) => (prev === val ? '' : val));
      // mark as touched
      if (onBlur) onBlur();
      setOpen(false);
    }

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id={id}
            name={name}
            disabled={disabled}
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn('flex justify-between', className, buttonClassName)}
            aria-label={ariaLabel}
          >
            {normalizedValue
              ? (normalized.find((i) => i.value === normalizedValue)?.label ?? normalizedValue)
              : placeholder}
            <ChevronsUpDownIcon className="opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent data-shadcn className="min-w-(--radix-popper-anchor-width) p-0">
          <Command>
            {enableSearch && (
              <CommandInput
                ref={forwardedRef as React.Ref<HTMLInputElement>}
                id={computedInputId}
                name={name}
                placeholder={searchPlaceholder}
                className="h-9"
                value={query}
                onValueChange={(val) => setQuery(val)}
                onBlur={onBlur}
              />
            )}
            <CommandList>
              <CommandEmpty>{emptyMessage}</CommandEmpty>
              <CommandGroup>
                {filtered.map((item) => (
                  <CommandItem
                    key={item.value}
                    value={item.value}
                    onSelect={(currentValue: string) => handleSelect(currentValue)}
                  >
                    {renderItem ? renderItem(item) : item.label}
                    <CheckIcon
                      className={cn(
                        'ml-auto',
                        normalizedValue === item.value ? 'opacity-100' : 'opacity-0',
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    );
  },
);

Combobox.displayName = 'Combobox';

export default Combobox;
