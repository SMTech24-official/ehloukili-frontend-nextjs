import { SignUpFormValues } from './types';

export function validateSignUp(values: SignUpFormValues): Partial<Record<keyof SignUpFormValues, string>> {
  const errors: Partial<Record<keyof SignUpFormValues, string>> = {};
  if (!values.name.trim()) errors.name = 'Name is required.';
  if (!values.email.trim()) errors.email = 'Email is required.';
  else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(values.email)) errors.email = 'Invalid email address.';
  if (!values.password) errors.password = 'Password is required.';
  else if (values.password.length < 8) errors.password = 'Must be at least 8 characters.';
  if (!values.role) errors.role = 'Role is required.';
  return errors;
}
