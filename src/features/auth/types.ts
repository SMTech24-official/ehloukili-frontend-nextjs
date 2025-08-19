export type UserRole = 'user' | 'agent';

export interface SignUpFormValues {
  role: UserRole;
  name: string;
  email: string;
  password: string;
}
