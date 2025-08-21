import { type ClassValue, clsx } from 'clsx';

export function classNames(...classes: (string | undefined | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
