'use client'
import * as React from 'react';
import { Eye, EyeOff } from 'lucide-react';
import Label from '@/components/ui/Label';

export interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  required?: boolean;
}

export const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ label, error, className = '', id, required, ...props }, ref) => {
    const [show, setShow] = React.useState(false);
    const generatedId = React.useId();
    const inputId = id ?? generatedId;
    const describedBy = error ? `${inputId}-error` : undefined;
    return (
      <div className="w-full relative">
        {label ? (
          <Label htmlFor={inputId} required={required}>
            {label}
          </Label>
        ) : null}
        <input
          id={inputId}
          ref={ref}
          type={show ? 'text' : 'password'}
          aria-invalid={!!error || undefined}
          aria-describedby={describedBy}
          className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-400)] transition ${error ? 'border-[var(--color-error-500)]' : 'border-gray-300'} ${className}`}
          {...props}
        />
        <button
          type="button"
          tabIndex={-1}
          className="absolute right-3 top-8 text-gray-500 hover:text-gray-700"
          onClick={() => setShow((v) => !v)}
          aria-label={show ? 'Hide password' : 'Show password'}
        >
          {show ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
        </button>
        {error ? (
          <p id={describedBy} className="mt-1 text-xs text-[var(--color-error-600)]">
            {error}
          </p>
        ) : null}
      </div>
    );
  },
);

PasswordInput.displayName = 'PasswordInput';

export default PasswordInput;


