/* eslint-disable react-hooks/exhaustive-deps */


"use client";
import React, { useEffect } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { Label } from "@radix-ui/react-label";
import * as Switch from "@radix-ui/react-switch";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Textarea";
import { useDashboard } from "@/providers/DashboardProvider";
import { useLoading } from '@/providers/LoadingProvider';

type FormData = {
  name: string;
  description: string;
  price: string;
  duration: "FREE" | "MONTHLY" | "YEARLY";
  durationInDays: string;
  state: "PAID" | "FREE";
  features: { value: string }[];
  bgColor: string;
  textColor?: string;
  isFreePromo?: boolean;
  freePromoText?: string;
  propertyLimit: number;
  isActive: boolean;
};



import { useRouter, useParams } from "next/navigation";
import Spinner from '@/components/ui/Spinner';
import { toast } from 'sonner';
import { useGetSinglePlanQuery, useUpdatePlanMutation } from "@/redux/api/subscriptionPackage";

const defaultValues: FormData = {
  name: "",
  description: "",
  price: "0",
  duration: "FREE",
  durationInDays: "UNLIMITED",
  state: "FREE",
  features: [],
  bgColor: "#ffffff",
  textColor: "#000000",
  isFreePromo: false,
  freePromoText: "",
  propertyLimit: 0,
  isActive: false,
};


const EditPricePage = () => {

  const router = useRouter();
  const params = useParams();
  const planId = params?.id as string;
  const { setLoading, setLoadingText } = useLoading();
  const { data, isLoading, isError } = useGetSinglePlanQuery(planId, { skip: !planId });
  const [updatePlan, { isLoading: isUpdating }] = useUpdatePlanMutation();
  // Show global loading overlay while fetching plan
  useEffect(() => {
    if (isLoading) {
      setLoadingText('Loading plan details...');
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [isLoading]);


  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { isSubmitting },
  } = useForm<FormData>({ defaultValues });
  const { fields, append, remove } = useFieldArray({ control, name: "features" });
  const state = watch("state");
  const isFreePromo = watch("isFreePromo");

  const { setPageTitle, setPageSubtitle } = useDashboard();


  useEffect(() => {
    setPageTitle("Edit Plan");
    setPageSubtitle("Edit pricing plan details");
  }, [setPageTitle, setPageSubtitle]);

  // Set form values from API
  useEffect(() => {
    if (data?.data) {
      const plan = data.data;
      reset({
        name: plan.name || '',
        description: plan.description || '',
        price: plan.price?.toString() || '0',
        duration: plan.duration || 'FREE',
        durationInDays: plan.duration_in_days?.toString() || 'UNLIMITED',
        state: plan.state || 'FREE',
        features: Array.isArray(plan.features) ? plan.features.map((f: string) => ({ value: f })) : [],
        bgColor: plan.bg_color || '#ffffff',
        textColor: plan.text_color || '#000000',
        isFreePromo: !!plan.is_free_promo,
        freePromoText: plan.free_promo_text || '',
        propertyLimit: plan.property_limit || 0,
        isActive: !!plan.is_active,
      });
    }
  }, [data, reset]);


  const onSubmit = async (formData: FormData) => {
    try {
      const payload = {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        duration: formData.duration,
        duration_in_days: formData.durationInDays === 'UNLIMITED' ? 'UNLIMITED' : parseInt(formData.durationInDays),
        state: formData.state,
        features: formData.features.map(f => f.value).filter(f => f.trim() !== ''),
        property_limit: formData.propertyLimit,
        bg_color: formData.bgColor,
        text_color: formData.textColor,
        is_free_promo: !!formData.isFreePromo,
        free_promo_text: formData.freePromoText,
        is_active: !!formData.isActive,
      };
      await updatePlan({ id: planId, data: payload }).unwrap();
      toast.success('Plan updated successfully!');
      router.push('/admin/pricing');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error(err?.data?.message || 'Failed to update plan.');
    }
  };


  if (isLoading) return <div className="flex justify-center items-center min-h-[200px]"><Spinner size={32} /></div>;
  if (isError) return <div className="p-8 text-red-500">Failed to load plan data.</div>;

  return (
    <form className="max-w-4xl lg:p-6 mb-16" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex justify-between items-center gap-2">
        <h1 className="text-2xl font-semibold mb-6">Edit Pricing Plan</h1>
        <div className="flex items-center gap-3 mt-4">
          <Label htmlFor="isActive">Active</Label>
          <Controller
            control={control}
            name="isActive"
            render={({ field }) => (
              <Switch.Root
                className="w-10 h-6 bg-gray-200 dark:bg-gray-700 rounded-full relative data-[state=checked]:bg-primary outline-none cursor-pointer transition-colors data-[state=checked]:bg-green-500 data-[state=checked]"
                checked={field.value}
                onCheckedChange={field.onChange}
                id="isActive"
              >
                <Switch.Thumb className="block w-5 h-5 bg-white dark:bg-gray-200 rounded-full shadow transition-transform translate-x-0.5 data-[state=checked]:translate-x-4" />
              </Switch.Root>
            )}
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Name</Label>
          <Input {...register("name", { required: true })} disabled={isSubmitting} required />
        </div>

        <div className="space-y-2">
          <Label>Description</Label>
          <Textarea {...register("description")} disabled={isSubmitting} />
        </div>

        <div className="flex gap-4">
          <div className="flex-1 space-y-2">
            <Label>Price</Label>
            <Input
              type="number"
              step="0.01"
              {...register("price")}
              disabled={isSubmitting || state === "FREE"}
            />
          </div>
          <div className="flex-1 space-y-2">
            <Label>Duration</Label>
            <select
              {...register("duration")}
              disabled={isSubmitting}
              className="w-full border rounded-md p-2"
            >
              <option value="FREE">Free</option>
              <option value="MONTHLY">Monthly</option>
              <option value="YEARLY">Yearly</option>
            </select>
          </div>
          <div className="flex-1 space-y-2">
            <Label>Duration (in Days)</Label>
            <select
              {...register("durationInDays")}
              disabled={isSubmitting}
              className="w-full border rounded-md p-2"
            >
              <option value="UNLIMITED">Unlimited</option>
              <option value="30">30 Days</option>
              <option value="90">90 Days</option>
              <option value="180">180 Days</option>
              <option value="365">365 Days</option>
            </select>
          </div>
          <div className="flex-1 space-y-2">
            <Label>Property Limit</Label>
            <Input
              type="number"
              {...register("propertyLimit", { valueAsNumber: true })}
              disabled={isSubmitting}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>State</Label>
          <select
            {...register("state")}
            disabled={isSubmitting}
            className="w-full border rounded-md p-2"
          >
            <option value="FREE">FREE</option>
            <option value="PAID">PAID</option>
          </select>
        </div>

        <div className="flex gap-4">
          <div className="flex-1 space-y-2">
            <Label>Background Color</Label>
            <div className="flex items-center gap-2">
              <Input type="color" {...register("bgColor")} disabled={isSubmitting} />
              <span
                className="inline-block w-8 h-8 rounded border border-gray-300 dark:border-gray-700"
                style={{ backgroundColor: watch("bgColor") }}
                title={watch("bgColor")}
              />
            </div>
          </div>
          <div className="flex-1 space-y-2">
            <Label>Text Color</Label>
            <div className="flex items-center gap-2">
              <Input type="color" {...register("textColor")} disabled={isSubmitting} />
              <span
                className="inline-block w-8 h-8 rounded border border-gray-300 dark:border-gray-700"
                style={{ backgroundColor: watch("textColor") }}
                title={watch("textColor")}
              />
            </div>
          </div>
        </div>

        <div className="space-y-2 flex items-center gap-2">
          <Label>Free Promo</Label>
          <Controller
            control={control}
            name="isFreePromo"
            render={({ field }) => (
              <Switch.Root
                className="w-10 h-6 rounded-full relative outline-none cursor-pointer transition-colors bg-gray-200 dark:bg-gray-700 data-[state=checked]:bg-green-500 data-[state=checked]:dark:bg-green-400"
                checked={!!field.value}
                onCheckedChange={field.onChange}
                id="isFreePromo"
              >
                <Switch.Thumb className="block w-5 h-5 rounded-full shadow transition-transform translate-x-0.5 data-[state=checked]:translate-x-4 bg-white dark:bg-gray-200 data-[state=checked]:bg-green-100 data-[state=checked]:dark:bg-green-200" />
              </Switch.Root>
            )}
          />
        </div>

        <div className="space-y-2">
          <Label>Free Promo Text</Label>
          <Input
            {...register("freePromoText")}
            disabled={isSubmitting || !isFreePromo}
            placeholder="Enter promotional text"
          />
        </div>

        <div>
          <Label className="mb-2 block">Features</Label>
          <div className="space-y-2">
            {fields.map((field, index) => (
              <div key={field.id} className="flex gap-2 items-center">
                <Input
                  {...register(`features.${index}.value` as const)}
                  disabled={isSubmitting}
                />
                <Button type="button" color="ghost" onClick={() => remove(index)} disabled={isSubmitting}>
                  Remove
                </Button>
              </div>
            ))}
            <Button
              type="button"
              color="outline"
              onClick={() => append({ value: "" })}
              className="mt-2 cursor-pointer"
              disabled={isSubmitting}
            >
              + Add Feature
            </Button>
          </div>
        </div>

        <div className="pt-6">
          <Button
            className="cursor-pointer bg-primary hover:bg-primary/80 !text-white"
            type="submit"
            disabled={isSubmitting || isUpdating}
            isLoading={isSubmitting || isUpdating}
          >
            {(isSubmitting || isUpdating) ? (<><Spinner size={18} className="mr-2" /> Saving...</>) : "Save Changes"}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default EditPricePage;