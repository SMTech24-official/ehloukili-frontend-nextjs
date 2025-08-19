import React from 'react';

interface FormCardProps {
  children: React.ReactNode;
  className?: string;
}

const FormCard: React.FC<FormCardProps> = ({ children, className = '' }) => (
  <div className={`bg-white rounded-2xl shadow-lg p-8 w-full max-w-md ${className}`}>
    {children}
  </div>
);

export default FormCard;
