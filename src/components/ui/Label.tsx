import * as React from 'react';
import * as RadixLabel from '@radix-ui/react-label';

export interface LabelProps extends RadixLabel.LabelProps {
  required?: boolean;
}

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className = '', children, required, ...props }, ref) => {
    return (
      <RadixLabel.Root
        ref={ref}
        className={`block mb-1 text-sm font-medium text-[var(--color-foreground)] ${className}`}
        {...props}
      >
        {children}
        {required ? (
          <span aria-hidden className="ml-0.5 text-[var(--color-error-600)]">*</span>
        ) : null}
      </RadixLabel.Root>
    );
  },
);

Label.displayName = 'Label';

export default Label;


