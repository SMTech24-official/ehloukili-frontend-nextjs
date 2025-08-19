/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import Input from '@/components/ui/Input';
import PasswordInput from '@/components/ui/PasswordInput';
import Button from '@/components/ui/Button';
import FormCard from '@/components/ui/FormCard';

interface SignInFormValues {
  email: string;
  password: string;
  remember: boolean;
}

const initialValues: SignInFormValues = {
  email: '',
  password: '',
  remember: false,
};

const SignInForm: React.FC = () => {
  const { control, handleSubmit, formState: { errors, isSubmitting } } = useForm<SignInFormValues>({
    defaultValues: initialValues,
    mode: 'onTouched',
  });

  const onSubmit = async (data: SignInFormValues) => {
    // TODO: Integrate API call here
    await new Promise((res) => setTimeout(res, 1000));
    alert('Signed in!');
  };

  return (
    <FormCard>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <h2 className="text-3xl md:text-4xl font-bold mb-2 text-[#1A1A1A] font-roboto">Sign in</h2>
        <Controller
          name="email"
          control={control}
          rules={{
            required: 'Email is required.',
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
          rules={{ required: 'Password is required.' }}
          render={({ field }) => (
            <PasswordInput
              {...field}
              label="Password*"
              placeholder="Enter your password"
              error={errors.password?.message}
              autoComplete="current-password"
            />
          )}
        />
        <div className="flex items-center justify-between">
          <Controller
            name="remember"
            control={control}
            render={({ field }) => (
              <label className="flex items-center text-sm text-gray-700">
                <input
                  type="checkbox"
                  className="mr-2 accent-[#86542C]"
                  checked={field.value}
                  onChange={e => field.onChange(e.target.checked)}
                />
                Remember for 30 days
              </label>
            )}
          />
          <a href="/auth/forgot-password" className="text-[var(--color-primary-600)] text-sm font-medium hover:underline">Forgot password?</a>
        </div>
        <Button type="submit" disabled={isSubmitting} className="bg-[var(--color-primary-600)] hover:bg-[var(--color-primary-700)] !text-white w-full">
          {isSubmitting ? 'Signing in...' : 'Sign in'}
        </Button>
        <p className="text-center text-sm text-gray-600">
          Don&#39;t have an account?{' '}
          <a href="/auth/signup" className="text-[var(--color-primary-600)] font-medium hover:underline">Sign up</a>
        </p>
      </form>
    </FormCard>
  );
};

export default SignInForm;
