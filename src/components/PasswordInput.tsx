
import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(({ label, error, className = '', ...props }, ref) => {
  const [show, setShow] = useState(false);
  return (
    <div className="w-full relative">
      {label && (
        <label className="block mb-1 text-sm font-medium text-gray-700">{label}</label>
      )}
      <input
        ref={ref}
        type={show ? 'text' : 'password'}
        className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 transition ${error ? 'border-red-500' : 'border-gray-300'} ${className}`}
        {...props}
      />
      <button
        type="button"
        tabIndex={-1}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
        onClick={() => setShow((v) => !v)}
        aria-label={show ? 'Hide password' : 'Show password'}
      >
        {show ? (
          <Eye className="w-5 h-5" />
        ) : (
          <EyeOff className="w-5 h-5" />
        )}
      </button>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
});
PasswordInput.displayName = 'PasswordInput';
export default PasswordInput;
