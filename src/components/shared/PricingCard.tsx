import React from 'react';
import { Check } from 'lucide-react';
import Button from '../ui/Button';
import { cn } from '@/utils/classNames';

export interface PricingCardProps {
  price: number;
  name: string;
  description: string;
  features: string[];
  popular?: boolean;
  onClick?: () => void;
}

const PricingCard: React.FC<PricingCardProps> = ({
  price,
  name,
  description,
  features,
  popular = false,
  onClick,
}) => {
  return (
    <div
      className={cn(
        'flex-1 bg-white rounded-2xl shadow-md px-8 py-10 flex flex-col items-center border transition-all duration-200',
        'hover:shadow-xl hover:scale-[1.03] hover:border-primary-500',
        popular ? 'border-primary-500 scale-105 z-10 shadow-lg' : 'border-gray-200'
      )}
      style={popular ? { boxShadow: '0 8px 32px 0 rgba(26,127,100,0.10)' } : {}}
    >
      <div className="text-3xl font-bold mb-2">${price}/mth</div>
      <div className="text-base font-semibold mb-1">{name}</div>
      <div className="text-sm text-gray-500 mb-6">{description}</div>
      <ul className="mb-8 w-full space-y-3">
        {features.map((feature) => (
          <li key={feature} className="flex items-center gap-2 text-base">
            <Check className="w-5 h-5 text-primary-600" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <Button className={cn('w-full', popular && 'bg-primary-600 hover:bg-primary-700 !text-white')} onClick={onClick}>
        Get started
      </Button>
    </div>
  );
};

export default PricingCard;
