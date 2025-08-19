import * as React from 'react';

export interface FormCardProps {
  children: React.ReactNode;
  className?: string;
}

export const FormCard: React.FC<FormCardProps> = ({ children, className = '' }) => (
  <div className={`bg-white dark:bg-[var(--color-neutral-800)] rounded-2xl shadow-lg p-8 w-full max-w-md ${className}`}>
    {children}
  </div>
);

export default FormCard;


