/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { useEffect, useRef, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Image from 'next/image';
import { Controller, useForm } from 'react-hook-form';
import { useUpdateUserMutation, useGetMeQuery } from '@/redux/api/authApi';
import { useLoading } from '@/providers/LoadingProvider';
import { toast } from 'sonner';
import { Pencil } from 'lucide-react';
import Spinner from '@/components/ui/Spinner';



const defaultValues = {
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  zip_code: '',
  country: '',
  image: null as File | null,
};

const passwordDefaultValues = {
  old_password: '',
  password: '',
  password_confirmation: '',
};



export default function UserProfilePage() {
  const { setLoading, setLoadingText } = useLoading();
  const { data: meData, isLoading: isMeLoading } = useGetMeQuery();
  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const [imagePreview, setImagePreview] = useState<string>('/user-avatar.svg');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<typeof defaultValues>({
    defaultValues,
    mode: 'onTouched',
  });
  const { control, handleSubmit, setValue, formState: { errors, isSubmitting } } = form;

  const passwordForm = useForm<typeof passwordDefaultValues>({
    defaultValues: passwordDefaultValues,
    mode: 'onTouched',
  });

  // Autofill form when profile data loads
  useEffect(() => {
    if (isMeLoading) {
      setLoadingText('Loading your profile...');
      setLoading(true);
    } else {
      setLoading(false);
    }
    if (meData?.profile) {
      const p = meData.profile;
      setValue('first_name', p.first_name || '');
      setValue('last_name', p.last_name || '');
      setValue('email', p.email || '');
      setValue('phone', p.phone || '');
      setValue('address', p.address || '');
      setValue('city', p.city || '');
      setValue('state', p.state || '');
      setValue('zip_code', p.zip_code || '');
      setValue('country', p.country || '');
      if (p.image_url) setImagePreview(p.image_url);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [meData?.profile, setValue, isMeLoading]);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      setValue('image', file);
    }
  };

  const onSubmit = async (data: typeof defaultValues) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value !== '' && value !== null) {
        if (key === 'image' && value instanceof File) {
          formData.append('image', value);
        } else {
          formData.append(key, value as string);
        }
      }
    });
    try {
      await updateUser(formData).unwrap();
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error('Failed to update profile.');
    }
  };

  const onPasswordSubmit = async (data: typeof passwordDefaultValues) => {
    try {
      await updateUser({ password: data.password, password_confirmation: data.password_confirmation, old_password: data.old_password }).unwrap();
      toast.success('Password changed successfully!');
      passwordForm.reset();
    } catch (error) {
      toast.error('Failed to change password.');
    }
  };


  // No local loading UI, global loading overlay is handled by LoadingProvider

  const profile = meData?.profile;

  return (
    <div className="flex flex-col gap-8">
      {/* Profile Info & Image Upload */}
      <div className="flex items-center gap-4 mb-6">
        <div className="relative group cursor-pointer" onClick={handleImageClick}>
          <Image
            src={imagePreview}
            alt={profile ? `${profile.first_name} ${profile.last_name}` : 'User'}
            width={64}
            height={64}
            className="rounded-full border-2 border-primary-100 object-cover hover:scale-105 transition-transform duration-200 w-16 h-16"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 rounded-full transition-opacity">
            <Pencil className="text-white w-6 h-6" />
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </div>
        <div>
          <div className="font-semibold text-lg">{profile ? `${profile.first_name} ${profile.last_name}` : ''}</div>
          <div className="text-gray-500 text-sm">{profile?.email}</div>
        </div>
      </div>

      {/* Profile Update Form */}
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Controller
            name="first_name"
            control={control}
            render={({ field }) => (
              <Input {...field} label="First Name" placeholder="Enter First name" error={errors.first_name?.message} required autoComplete="given-name" />
            )}
          />
          <Controller
            name="last_name"
            control={control}
            render={({ field }) => (
              <Input {...field} label="Last Name" placeholder="Enter Last name" error={errors.last_name?.message} required autoComplete="family-name" />
            )}
          />
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input {...field} label="Email" placeholder="Enter Email" error={errors.email?.message} required autoComplete="email" readOnly />
            )}
          />
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <Input {...field} label="Mobile number" placeholder="Enter Mobile number" error={errors.phone?.message} required autoComplete="tel" />
            )}
          />
          <Controller
            name="address"
            control={control}
            render={({ field }) => (
              <Input {...field} label="Address" placeholder="Enter Address" error={errors.address?.message} autoComplete="street-address" />
            )}
          />
          <Controller
            name="city"
            control={control}
            render={({ field }) => (
              <Input {...field} label="City" placeholder="Enter City" error={errors.city?.message} autoComplete="address-level2" />
            )}
          />
          <Controller
            name="state"
            control={control}
            render={({ field }) => (
              <Input {...field} label="State" placeholder="Enter State" error={errors.state?.message} autoComplete="address-level1" />
            )}
          />
          <Controller
            name="zip_code"
            control={control}
            render={({ field }) => (
              <Input {...field} label="Zip Code" placeholder="Enter Zip Code" error={errors.zip_code?.message} autoComplete="postal-code" />
            )}
          />
          <Controller
            name="country"
            control={control}
            render={({ field }) => (
              <Input {...field} label="Country" placeholder="Enter Country" error={errors.country?.message} autoComplete="country" />
            )}
          />
        </div>
        <Button type="submit" className="!text-white w-40" disabled={isSubmitting || isLoading} isLoading={isSubmitting || isLoading}>
          {isSubmitting || isLoading ? <>Saving. <Spinner size={20} color="white" /></> : 'Save Change'}
        </Button>
      </form>

      {/* Password Change Form */}
      <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-6 w-full mt-8">
        <div className="font-semibold text-lg mb-2">Change Password</div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            <Controller
              name="old_password"
              control={passwordForm.control}
              render={({ field }) => (
                <PasswordInput
                  {...field}
                  label="Old Password"
                  placeholder="Enter Old Password"
                  error={passwordForm.formState.errors.old_password?.message}
                  required
                  autoComplete="current-password"
                />
              )}
            />
            <Controller
              name="password"
              control={passwordForm.control}
              render={({ field }) => (
                <PasswordInput
                  {...field}
                  label="New Password"
                  placeholder="Enter New Password"
                  error={passwordForm.formState.errors.password?.message}
                  required
                  autoComplete="new-password"
                />
              )}
            />
            <Controller
              name="password_confirmation"
              control={passwordForm.control}
              render={({ field }) => (
                <PasswordInput
                  {...field}
                  label="Confirm Password"
                  placeholder="Enter Confirm Password"
                  error={passwordForm.formState.errors.password_confirmation?.message}
                  required
                  autoComplete="new-password"
                />
              )}
            />
        </div>
        <Button type="submit" className="!text-white !w-44" disabled={passwordForm.formState.isSubmitting || isLoading} isLoading={passwordForm.formState.isSubmitting || isLoading}>
          Change Password
        </Button>
      </form>
    </div>
  );
}
import PasswordInput from '@/components/ui/PasswordInput';
