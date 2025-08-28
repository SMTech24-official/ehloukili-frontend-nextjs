/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import React, { useEffect } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { Label } from "@radix-ui/react-label";
import * as Switch from "@radix-ui/react-switch";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Textarea";
import { useDashboard } from "@/providers/DashboardProvider";
import Spinner from '@/components/ui/Spinner';
import { toast } from 'sonner';
import { useCreatePlanMutation } from "@/redux/api/subscriptionPackage";

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

const AddPricePage = () => {

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

  const [createPlan, { isLoading }] = useCreatePlanMutation();

      const { setPageTitle, setPageSubtitle } = useDashboard();
      
          useEffect(() => {
              setPageTitle('Add Plans');
              setPageSubtitle('Create a new pricing plan');
          }, [setPageTitle, setPageSubtitle]);

  const onSubmit = async (data: FormData) => {
    try {
      const payload = {
        name: data.name,
        description: data.description,
        price: parseFloat(data.price),
        duration: data.duration,
        duration_in_days: data.durationInDays === "UNLIMITED" ? "UNLIMITED" : parseInt(data.durationInDays),
        state: data.state,
        features: data.features.map(f => f.value).filter(f => f.trim() !== ""),
        property_limit: data.propertyLimit,
        bg_color: data.bgColor,
        text_color: data.textColor,
        is_free_promo: !!data.isFreePromo,
        free_promo_text: data.freePromoText,
        is_active: !!data.isActive,
      };
      await createPlan(payload).unwrap();
      toast.success('Plan created successfully!');
      reset(defaultValues);
    } catch (err: any) {
      toast.error(err?.data?.message || 'Failed to create plan.');
    }
  };


  return (
    <form className="max-w-4xl lg:p-6 mb-16" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex justify-between items-center gap-2">
        <h1 className="text-2xl font-semibold mb-6">Add Pricing Plan</h1>
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
            disabled={isSubmitting || isLoading}
            isLoading={isSubmitting || isLoading}
          >
            {(isSubmitting || isLoading) ? (<><Spinner size={18} className="mr-2" /> Adding</>) : "Add Plan"}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default AddPricePage;