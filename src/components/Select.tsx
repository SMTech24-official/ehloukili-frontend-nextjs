import React from 'react';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { label: string; value: string }[];
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(({ label, error, options, className = '', ...props }, ref) => (
  <div className="w-full">
    {label && (
      <label className="block mb-1 text-sm font-medium text-gray-700">
        {label}
      </label>
    )}
    <select
      ref={ref}
      className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 transition ${error ? 'border-red-500' : 'border-gray-300'} ${className}`}
      {...props}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
    {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
  </div>
));
Select.displayName = 'Select';
export default Select;
