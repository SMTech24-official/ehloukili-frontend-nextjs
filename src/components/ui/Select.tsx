import * as React from 'react';
import * as RadixSelect from '@radix-ui/react-select';
import Label from '@/components/ui/Label';

export interface Option {
  label: string;
  value: string;
}

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLButtonElement>, 'onChange'> {
  label?: string;
  error?: string;
  required?: boolean;
  options: Option[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  id?: string;
}

export const Select = ({
  label,
  error,
  required,
  options,
  value,
  defaultValue,
  onChange,
  placeholder = 'Select an option',
  id,
  className = '',
}: SelectProps) => {
  const generatedId = React.useId();
  const selectId = id ?? generatedId;
  const describedBy = error ? `${selectId}-error` : undefined;

  return (
    <div className="w-full">
      {label ? (
        <Label htmlFor={selectId} required={required}>
          {label}
        </Label>
      ) : null}

      <RadixSelect.Root value={value} defaultValue={defaultValue} onValueChange={onChange}>
        <RadixSelect.Trigger
          id={selectId}
          aria-invalid={!!error || undefined}
          aria-describedby={describedBy}
          className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-400)] transition ${error ? 'border-[var(--color-error-500)]' : 'border-gray-300'} bg-white dark:bg-[var(--color-neutral-800)] text-left ${className}`}
        >
          <RadixSelect.Value placeholder={placeholder} />
        </RadixSelect.Trigger>
        <RadixSelect.Content className="z-50 overflow-hidden rounded-md border border-gray-200 dark:border-[var(--color-neutral-700)] bg-white dark:bg-[var(--color-neutral-800)] shadow-md">
          <RadixSelect.Viewport className="p-1">
            {options.map((opt) => (
              <RadixSelect.Item
                key={opt.value}
                value={opt.value}
                className="relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none hover:bg-[var(--color-neutral-100)] dark:hover:bg-[var(--color-neutral-700)]"
              >
                <RadixSelect.ItemText>{opt.label}</RadixSelect.ItemText>
              </RadixSelect.Item>
            ))}
          </RadixSelect.Viewport>
        </RadixSelect.Content>
      </RadixSelect.Root>

      {error ? (
        <p id={describedBy} className="mt-1 text-xs text-[var(--color-error-600)]">
          {error}
        </p>
      ) : null}
    </div>
  );
};

export default Select;


