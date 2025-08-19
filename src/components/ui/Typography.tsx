import * as React from 'react';

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
type TextSize = 'xs' | 'sm' | 'md' | 'lg';
type TextColor = 'default' | 'muted' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';

interface BaseProps {
  className?: string;
  children: React.ReactNode;
}

export interface HeadingProps extends BaseProps {
  level?: HeadingLevel;
}

export interface TextProps extends BaseProps {
  size?: TextSize;
  color?: TextColor;
  as?: keyof JSX.IntrinsicElements;
}

const headingSizeByLevel: Record<HeadingLevel, string> = {
  1: 'text-4xl md:text-5xl font-bold',
  2: 'text-3xl md:text-4xl font-bold',
  3: 'text-2xl md:text-3xl font-semibold',
  4: 'text-xl md:text-2xl font-semibold',
  5: 'text-lg font-semibold',
  6: 'text-base font-semibold',
};

const textSizeClass: Record<TextSize, string> = {
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
};

const textColorClass: Record<TextColor, string> = {
  default: 'text-[var(--color-foreground)]',
  muted: 'text-gray-600',
  primary: 'text-[var(--color-primary-700)]',
  secondary: 'text-[var(--color-secondary-700)]',
  success: 'text-[var(--color-success-700)]',
  warning: 'text-[var(--color-warning-700)]',
  error: 'text-[var(--color-error-700)]',
  info: 'text-[var(--color-info-700)]',
};

export const Heading = ({ level = 2, className = '', children }: HeadingProps) => {
  const Tag = (`h${level}` as unknown) as keyof JSX.IntrinsicElements;
  return (
    <Tag className={`${headingSizeByLevel[level]} text-[var(--color-foreground)] tracking-tight ${className}`}>
      {children}
    </Tag>
  );
};

export const Text = ({ size = 'md', color = 'default', className = '', as: Component = 'p', children }: TextProps) => {
  return (
    <Component className={`${textSizeClass[size]} ${textColorClass[color]} ${className}`}>
      {children}
    </Component>
  );
};

export default { Heading, Text };


