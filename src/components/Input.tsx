import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ label, error, className = '', ...props }, ref) => (
  <div className="w-full">
    {label && (
      <label className="block mb-1 text-sm font-medium text-gray-700">
        {label}
      </label>
    )}
    <input
      ref={ref}
      className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 transition ${error ? 'border-red-500' : 'border-gray-300'} ${className}`}
      {...props}
    />
    {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
  </div>
));
Input.displayName = 'Input';
export default Input;
