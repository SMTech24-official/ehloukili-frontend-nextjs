import * as React from 'react';
import Label from '@/components/ui/Label';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  required?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', id, required, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id ?? generatedId;
    const describedBy = error ? `${inputId}-error` : undefined;
    return (
      <div className="w-full">
        {label ? (
          <Label htmlFor={inputId} required={required}>
            {label}
          </Label>
        ) : null}
        <input
          id={inputId}
          ref={ref}
          aria-invalid={!!error || undefined}
          aria-describedby={describedBy}
          className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-400)] transition ${error ? 'border-[var(--color-error-500)]' : 'border-gray-300'} ${className}`}
          {...props}
        />
        {error ? (
          <p id={describedBy} className="mt-1 text-xs text-[var(--color-error-600)]">
            {error}
          </p>
        ) : null}
      </div>
    );
  },
);

Input.displayName = 'Input';

export default Input;


