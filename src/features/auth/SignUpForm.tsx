/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'



import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import Input from '@/components/ui/Input';
import PasswordInput from '@/components/ui/PasswordInput';
import Button from '@/components/ui/Button';
import Select from '@/components/ui/Select';
import FormCard from '@/components/ui/FormCard';
import Spinner from '@/components/ui/Spinner';
import { useRegisterMutation } from '@/redux/api/authApi';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import Link from 'next/link';


const roleOptions = [
  { label: 'User', value: 'user' },
  { label: 'Agent', value: 'agent' },
];


type RegisterFormValues = {
  role: 'user' | 'agent';
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

const initialValues: RegisterFormValues = {
  role: 'user',
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  password_confirmation: '',
};



const SignUpForm: React.FC = () => {
  const { control, handleSubmit, formState: { errors }, watch, setError } = useForm<RegisterFormValues>({
    defaultValues: initialValues,
    mode: 'onTouched',
  });
  const [registerUser, { isLoading }] = useRegisterMutation();
  const router = useRouter();

  const onSubmit = async (data: RegisterFormValues) => {
    if (data.password !== data.password_confirmation) {
      setError('password_confirmation', { type: 'manual', message: 'Passwords do not match.' });
      return;
    }
    try {
      const payload = {
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        role: data.role,
        password: data.password,
        password_confirmation: data.password_confirmation,
      };
      const result = await registerUser(payload).unwrap();
      toast.success('Account created successfully!');
      if (payload.role === 'agent') {
        router.push('/pricing');
      } else {
        router.push('/auth/login');
      }
    } catch (error: any) {
      let message = 'Registration failed';
      if (error?.data?.message) {
        message = error.data.message;
      } else if (error?.data?.errors) {
        // Laravel validation errors
        const errors = error.data.errors;
        const firstKey = Object.keys(errors)[0];
        message = Array.isArray(errors[firstKey]) ? errors[firstKey][0] : errors[firstKey];
      }
      toast.error(message);
    }
  };

  return (
    <FormCard>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <h2 className="text-3xl md:text-4xl font-bold mb-2 text-[#1A1A1A] font-roboto">Sign up</h2>
        <Controller
          name="role"
          control={control}
          rules={{ required: 'Role is required.' }}
          render={({ field }) => (
            <Select
              value={field.value}
              onChange={field.onChange}
              label="Your role*"
              options={roleOptions}
              error={errors.role?.message}
            />
          )}
        />
        <div className="flex gap-3">
          <Controller
            name="first_name"
            control={control}
            rules={{
              required: 'First name is required.',
              maxLength: { value: 50, message: 'Max 50 characters.' },
              pattern: {
                value: /^[\p{L}\s-]+$/u,
                message: 'Only letters, spaces, and hyphens allowed.',
              },
            }}
            render={({ field }) => (
              <Input
                {...field}
                label="First Name*"
                placeholder="First name"
                error={errors.first_name?.message}
                autoComplete="given-name"
              />
            )}
          />
          <Controller
            name="last_name"
            control={control}
            rules={{
              required: 'Last name is required.',
              maxLength: { value: 50, message: 'Max 50 characters.' },
              pattern: {
                value: /^[\p{L}\s-]+$/u,
                message: 'Only letters, spaces, and hyphens allowed.',
              },
            }}
            render={({ field }) => (
              <Input
                {...field}
                label="Last Name*"
                placeholder="Last name"
                error={errors.last_name?.message}
                autoComplete="family-name"
              />
            )}
          />
        </div>
        <Controller
          name="email"
          control={control}
          rules={{
            required: 'Email is required.',
            maxLength: { value: 50, message: 'Max 50 characters.' },
            pattern: {
              value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
              message: 'Invalid email address.',
            },
          }}
          render={({ field }) => (
            <Input
              {...field}
              label="Email*"
              placeholder="Enter your email"
              error={errors.email?.message}
              autoComplete="email"
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          rules={{
            required: 'Password is required.',
            minLength: { value: 8, message: 'Must be at least 8 characters.' },
            validate: (value) => {
              if (!/[A-Z]/.test(value)) return 'Must contain an uppercase letter.';
              if (!/[a-z]/.test(value)) return 'Must contain a lowercase letter.';
              if (!/[0-9]/.test(value)) return 'Must contain a number.';
              if (!/[^A-Za-z0-9]/.test(value)) return 'Must contain a symbol.';
              return true;
            },
          }}
          render={({ field }) => (
            <PasswordInput
              {...field}
              label="Password*"
              placeholder="Create a password"
              error={errors.password?.message}
              autoComplete="new-password"
            />
          )}
        />
        <Controller
          name="password_confirmation"
          control={control}
          rules={{
            required: 'Please confirm your password.',
            validate: (value) => value === watch('password') || 'Passwords do not match.',
          }}
          render={({ field }) => (
            <PasswordInput
              {...field}
              label="Confirm Password*"
              placeholder="Confirm your password"
              error={errors.password_confirmation?.message}
              autoComplete="new-password"
            />
          )}
        />
        <p className="text-xs text-gray-500">Password must be at least 8 characters, include uppercase, lowercase, number, and symbol.</p>
        <Button type="submit" disabled={isLoading} className="bg-[var(--color-primary-600)] hover:bg-[var(--color-primary-700)] !text-white w-full flex items-center justify-center">
          {isLoading ? <><Spinner size={20} color="white" /> Creating account</> : 'Create account'}
        </Button>
        <p className="text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link href="/auth/login" className="text-[var(--color-primary-600)] font-medium hover:underline">Log in</Link>
        </p>
      </form>
    </FormCard>
  );
};

export default SignUpForm;
