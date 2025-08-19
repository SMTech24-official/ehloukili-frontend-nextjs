'use client'


import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import Input from '@/components/Input';
import PasswordInput from '@/components/PasswordInput';
import DateInput from '@/components/DateInput';
import Button from '@/components/Button';
import Select from '@/components/Select';
import FormCard from '@/components/FormCard';
import { SignUpFormValues } from './types';

const roleOptions = [
  { label: 'User', value: 'user' },
  { label: 'Agent', value: 'agent' },
];

const initialValues: SignUpFormValues = {
  role: 'user',
  name: '',
  email: '',
  password: '',
};


const SignUpForm: React.FC = () => {
  const { control, handleSubmit, formState: { errors, isSubmitting } } = useForm<SignUpFormValues>({
    defaultValues: initialValues,
    mode: 'onTouched',
  });

  const onSubmit = async (data: SignUpFormValues) => {
    // TODO: Integrate API call here
    await new Promise((res) => setTimeout(res, 1000));
    alert('Account created!');
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
              {...field}
              label="Your role*"
              options={roleOptions}
              error={errors.role?.message}
            />
          )}
        />
        <Controller
          name="name"
          control={control}
          rules={{ required: 'Name is required.' }}
          render={({ field }) => (
            <Input
              {...field}
              label="Name*"
              placeholder="Enter your name"
              error={errors.name?.message}
              autoComplete="name"
            />
          )}
        />
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
          rules={{
            required: 'Password is required.',
            minLength: { value: 8, message: 'Must be at least 8 characters.' },
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
        <p className="text-xs text-gray-500">Must be at least 8 characters.</p>
        <Button type="submit" disabled={isSubmitting} className="bg-[#86542C] hover:bg-[#6d441c]">
          {isSubmitting ? 'Creating account...' : 'Create account'}
        </Button>
        <p className="text-center text-sm text-gray-600">
          Already have an account?{' '}
          <a href="/login" className="text-[#86542C] font-medium hover:underline">Log in</a>
        </p>
      </form>
    </FormCard>
  );
};

export default SignUpForm;
