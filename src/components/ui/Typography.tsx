import * as React from 'react';
import { cn } from '@/utils/classNames';

// Base typography variant classes
const headingLevelClasses = {
  1: 'text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] lg:leading-[1.05]',
  2: 'text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.2] lg:leading-[1.1]',
  3: 'text-2xl md:text-3xl lg:text-4xl font-semibold leading-[1.3] lg:leading-[1.2]',
  4: 'text-xl md:text-2xl lg:text-3xl font-semibold leading-[1.4] lg:leading-[1.3]',
  5: 'text-lg md:text-xl lg:text-2xl font-semibold leading-[1.4]',
  6: 'text-base md:text-lg lg:text-xl font-semibold leading-[1.5]',
} as const;

const textSizeClasses = {
  xs: 'text-xs leading-4',
  sm: 'text-sm leading-5',
  base: 'text-base leading-6',
  lg: 'text-lg leading-7',
  xl: 'text-xl leading-8',
  '2xl': 'text-2xl leading-9',
} as const;

const colorClasses = {
  default: 'text-[var(--color-neutral-900)]',
  muted: 'text-[var(--color-neutral-600)]',
  light: 'text-[var(--color-neutral-500)]',
  primary: 'text-[var(--color-primary-700)]',
  secondary: 'text-[var(--color-secondary-700)]',
  accent: 'text-[var(--color-accent-700)]',
  success: 'text-[var(--color-success-700)]',
  warning: 'text-[var(--color-warning-700)]',
  error: 'text-[var(--color-error-700)]',
  info: 'text-[var(--color-info-700)]',
  white: 'text-white',
  inherit: 'text-inherit',
} as const;

const weightClasses = {
  light: 'font-light',
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
} as const;

const alignClasses = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
  justify: 'text-justify',
} as const;

// Heading Component
export interface HeadingProps extends Omit<React.HTMLAttributes<HTMLHeadingElement>, 'color'> {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  color?: keyof typeof colorClasses;
  weight?: keyof typeof weightClasses;
}

export const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, level = 2, color = 'default', weight = 'bold', as, children, ...props }, ref) => {
    const Component = as || (`h${level}` as const);
    
    return (
      <Component
        ref={ref}
        className={cn(
          'font-roboto tracking-tight scroll-m-20',
          headingLevelClasses[level],
          colorClasses[color],
          weightClasses[weight],
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
Heading.displayName = 'Heading';

// Text Component
export interface TextProps extends Omit<React.HTMLAttributes<HTMLElement>, 'color'> {
  as?: React.ElementType;
  size?: keyof typeof textSizeClasses;
  color?: keyof typeof colorClasses;
  weight?: keyof typeof weightClasses;
  align?: keyof typeof alignClasses;
}

export const Text = React.forwardRef<HTMLElement, TextProps>(
  ({ className, size = 'base', color = 'default', weight = 'normal', align = 'left', as: Component = 'p', children, ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn(
          'font-roboto',
          textSizeClasses[size],
          colorClasses[color],
          weightClasses[weight],
          alignClasses[align],
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
Text.displayName = 'Text';

// Display Text - Large promotional text
export interface DisplayProps extends Omit<HeadingProps, 'level'> {
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Display = React.forwardRef<HTMLHeadingElement, DisplayProps>(
  ({ className, size = 'lg', color = 'default', as = 'h1', children, ...props }, ref) => {
    const sizeClasses = {
      sm: 'text-5xl md:text-6xl lg:text-7xl',
      md: 'text-6xl md:text-7xl lg:text-8xl',
      lg: 'text-7xl md:text-8xl lg:text-9xl',
      xl: 'text-8xl md:text-9xl lg:text-[10rem]',
    };
    
    const Component = as;
    
    return (
      <Component
        ref={ref}
        className={cn(
          'font-roboto font-bold tracking-tight leading-none',
          sizeClasses[size],
          colorClasses[color],
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
Display.displayName = 'Display';

// Lead Text - Subheadings and introductory text
export interface LeadProps extends Omit<TextProps, 'size'> {
  size?: never; // Explicitly prevent size override
}

export const Lead = React.forwardRef<HTMLParagraphElement, LeadProps>(
  ({ className, color = 'muted', weight = 'normal', align = 'left', as = 'p', children, ...props }, ref) => {
    return (
      <Text
        ref={ref}
        as={as}
        size="xl"
        color={color}
        weight={weight}
        align={align}
        className={cn('leading-relaxed', className)}
        {...props}
      >
        {children}
      </Text>
    );
  }
);
Lead.displayName = 'Lead';

// Muted Text - Secondary information
export interface MutedProps extends Omit<TextProps, 'color'> {
  color?: never; // Explicitly prevent color override
}

export const Muted = React.forwardRef<HTMLElement, MutedProps>(
  ({ className, size = 'sm', weight = 'normal', as = 'p', children, ...props }, ref) => {
    return (
      <Text
        ref={ref}
        as={as}
        size={size}
        color="light"
        weight={weight}
        className={cn(className)}
        {...props}
      >
        {children}
      </Text>
    );
  }
);
Muted.displayName = 'Muted';

// Subtitle - Section descriptions
export interface SubtitleProps extends Omit<TextProps, 'size'> {
  size?: never; // Explicitly prevent size override
}

export const Subtitle = React.forwardRef<HTMLParagraphElement, SubtitleProps>(
  ({ className, color = 'muted', weight = 'normal', align = 'center', as = 'p', children, ...props }, ref) => {
    return (
      <Text
        ref={ref}
        as={as}
        size="lg"
        color={color}
        weight={weight}
        align={align}
        className={cn('leading-relaxed max-w-2xl mx-auto', className)}
        {...props}
      >
        {children}
      </Text>
    );
  }
);
Subtitle.displayName = 'Subtitle';

// Section Title - Pre-styled section headings
export const SectionTitle = React.forwardRef<HTMLHeadingElement, Omit<HeadingProps, 'level' | 'color' | 'weight'>>(
  ({ className, as = 'h2', children, ...props }, ref) => {
    return (
      <Heading
        ref={ref}
        level={2}
        color="default"
        weight="bold"
        as={as}
        className={cn('mb-4', className)}
        {...props}
      >
        {children}
      </Heading>
    );
  }
);
SectionTitle.displayName = 'SectionTitle';

// Export all components and utilities
const Typography = {
  Heading,
  Text,
  Display,
  Lead,
  Muted,
  Subtitle,
  SectionTitle,
};

export default Typography;


