import React from 'react';
import { CreditCard } from 'lucide-react';
import { cn } from '@/utils/classNames';

export interface PaymentCardTypeSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const cardTypes = [
  { label: 'Card', value: 'card', icon: <CreditCard className="w-5 h-5" /> },
  // Add more types if needed
];

const PaymentCardTypeSelector: React.FC<PaymentCardTypeSelectorProps> = ({ value, onChange }) => {
  return (
    <div className="flex gap-2 mb-4">
      {cardTypes.map((type) => (
        <button
          key={type.value}
          type="button"
          className={cn(
            'flex items-center gap-2 px-3 py-2 rounded-md border text-sm font-medium transition-all',
            value === type.value
              ? 'border-primary-600 bg-primary-50 text-primary-700 shadow-sm'
              : 'border-gray-200 bg-white text-gray-600 hover:border-primary-400'
          )}
          onClick={() => onChange(type.value)}
          aria-pressed={value === type.value}
        >
          {type.icon}
          {type.label}
        </button>
      ))}
    </div>
  );
};

export default PaymentCardTypeSelector;
