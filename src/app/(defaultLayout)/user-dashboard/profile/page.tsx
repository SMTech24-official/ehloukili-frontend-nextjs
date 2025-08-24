'use client'
import { yupResolver } from '@hookform/resolvers/yup';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { userProfileFormSchema, UserProfileFormSchema } from '@/schema/userProfileForm.schema';
import Image from 'next/image';
import { Controller, useForm } from 'react-hook-form';

const USER = {
  name: 'Your name',
  email: 'youname@gmail.com',
  avatarUrl: '/user-avatar.svg',
};

const defaultValues: UserProfileFormSchema = {
  firstName: '',
  lastName: '',
  email: '',
  mobile: '',
  password: '',
  confirmPassword: '',
};

export default function UserProfilePage() {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserProfileFormSchema>({
    defaultValues,
    resolver: yupResolver(userProfileFormSchema),
    mode: 'onTouched',
  });

  const onSubmit = async () => {
    await new Promise((res) => setTimeout(res, 1200));
    alert('Profile updated!');
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center gap-4 mb-6">
        <Image
          src={USER.avatarUrl}
          alt={USER.name}
          width={64}
          height={64}
          className="rounded-full border-2 border-primary-100 object-cover hover:scale-105 transition-transform duration-200"
        />
        <div>
          <div className="font-semibold text-lg">{USER.name}</div>
          <div className="text-gray-500 text-sm">{USER.email}</div>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Controller
            name="firstName"
            control={control}
            render={({ field }) => (
              <Input {...field} label="First Name" placeholder="Enter First name" error={errors.firstName?.message} required autoComplete="given-name" />
            )}
          />
          <Controller
            name="lastName"
            control={control}
            render={({ field }) => (
              <Input {...field} label="First Name" placeholder="Enter First name" error={errors.lastName?.message} required autoComplete="family-name" />
            )}
          />
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input {...field} label="Email" placeholder="Enter Email" error={errors.email?.message} required autoComplete="email" />
            )}
          />
          <Controller
            name="mobile"
            control={control}
            render={({ field }) => (
              <Input {...field} label="Mobile number" placeholder="Enter Mobile number" error={errors.mobile?.message} required autoComplete="tel" />
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <Input {...field} label="Password" placeholder="Enter New Password" error={errors.password?.message} required type="password" autoComplete="new-password" />
            )}
          />
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => (
              <Input {...field} label="Confirm Password" placeholder="Enter Confirm Password" error={errors.confirmPassword?.message} required type="password" autoComplete="new-password" />
            )}
          />
        </div>
        <Button type="submit" className="!text-white w-40" disabled={isSubmitting} isLoading={isSubmitting}>
          Save Change
        </Button>
      </form>
    </div>
  );
}
