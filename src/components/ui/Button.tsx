/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';

export type ButtonColor = 'primary' | 'secondary' | 'destructive' | 'ghost' | 'outline';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  color?: ButtonColor;
  size?: ButtonSize;
  isLoading?: boolean;
}

const baseClass =
  'inline-flex items-center justify-center rounded-md font-semibold transition-colors focus:outline-none focus-visible:ring-2 disabled:opacity-60 disabled:cursor-not-allowed gap-2';

const sizeClass: Record<ButtonSize, string> = {
  sm: 'h-9 px-3 text-sm',
  md: 'h-10 px-4 text-sm',
  lg: 'h-12 px-5 text-base',
};

const colorClass: Record<ButtonColor, string> = {
  primary:
    'bg-[var(--color-button-bg)] text-white hover:bg-[var(--color-primary-700)] focus-visible:ring-[var(--color-primary-400)]',
  secondary:
    'bg-[var(--color-secondary-600)] text-white hover:bg-[var(--color-secondary-700)] focus-visible:ring-[var(--color-secondary-400)]',
  destructive:
    'bg-[var(--color-error-600)] text-white hover:bg-[var(--color-error-700)] focus-visible:ring-[var(--color-error-400)]',
  ghost:
    'bg-transparent text-[var(--color-foreground)] hover:bg-[color-mix(in_oklab,var(--color-foreground)_8%,transparent)] focus-visible:ring-[var(--color-neutral-300)]',
  outline:
    'bg-transparent border border-[var(--color-button-bg)] text-[var(--color-button-bg)] hover:bg-[var(--color-button-bg)] hover:text-white focus-visible:ring-[var(--color-primary-400)]',
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className = '',
      asChild = false,
      color = 'primary',
      size = 'md',
      isLoading = false,
      children,
      disabled,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button';
    const ariaBusy = isLoading || undefined;
    return (
      <Comp
        ref={ref as any}
        className={`${baseClass} ${sizeClass[size]} ${colorClass[color]} ${className}`}
        aria-busy={ariaBusy}
        aria-disabled={disabled || isLoading || undefined}
        disabled={disabled || isLoading}
        {...props}
      >
        {children} 
      </Comp>
    );
  },
);

Button.displayName = 'Button';

export default Button;


