/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Button from "@/components/ui/Button";
import PaymentCardTypeSelector from "@/components/shared/PaymentCardTypeSelector";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Heading, Text } from "@/components/ui/Typography";
import Input from "@/components/ui/Input";
import { paymentFormSchema, PaymentFormSchema } from "@/schema/paymentForm.schema";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { useCreateSubscriptionMutation } from "@/redux/api/subscriptionPackage";
import Spinner from "@/components/ui/Spinner";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useEffect } from "react";
import { useGetMeQuery } from "@/redux/api/authApi";
import { allCountry } from "../../../../../public/data/countries";

const defaultValues: PaymentFormSchema = {
  firstName: "",
  lastName: "",
  address: "",
  city: "",
  state: "",
  zip: "",
  phone: "",
  cardType: "card",
  country: "Bangladesh",
};

export default function PaymentPage() {
  const [createSubscription, { isLoading: isStripeLoading }] = useCreateSubscriptionMutation();
  const { data: user } = useGetMeQuery();

  const router = useRouter();
  
  const stripe = useStripe();
  const elements = useElements();

  // URL params
  const searchParams = useSearchParams();
  const planName = searchParams.get("planName") || "Plan";
  const planId = searchParams.get("planId") || "0";
  const price = searchParams.get("price") || "0";
  const duration = searchParams.get("duration") || "MONTHLY";
  const propertyLimit = searchParams.get("propertyLimit");

  let priceLabel = "";
  if (duration === "FREE") {
    priceLabel = "Free";
  } else if (duration === "YEARLY") {
    priceLabel = `$${price}/yr`;
  } else {
    priceLabel = `$${price}/mth`;
  }

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PaymentFormSchema>({
    defaultValues,
    resolver: yupResolver(paymentFormSchema),
    mode: "onTouched",
  });

  // Debug form errors
  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      toast.error("Please fix the form errors before submitting.");
    }
  }, [errors]);

  const onSubmit = async (data: PaymentFormSchema) => {
    
	if(!user){
		toast.error("User not found. Please log in.");
		router.push("/auth/login");
		return;
	}

    if (!stripe || !elements) {
      toast.error("Stripe is not loaded. Please try refreshing the page.");
      return;
    }

    try {
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) {
        toast.error("Card details are missing. Please try again.");
        return;
      }

      const { error, token } = await stripe.createToken(cardElement, {
        name: `${data.firstName} ${data.lastName}`,
        address_line1: data.address,
        address_city: data.city,
        address_state: data.state,
        address_zip: data.zip,
        address_country: data.country,
      });


      if (error || !token) {
        console.error("Stripe token error:", error);
        toast.error(error?.message || "Failed to create payment method.");
        return;
      }

      const response = await createSubscription({
        package_id: Number(planId),
        payment_method: token.id,
      }).unwrap();

      toast.success("Subscription successful!");
	  router.push("/agent/pricing");
    } catch (err: any) {
      toast.error(err?.data?.message || "Payment failed. Please try again.");
    }
  };

  return (
    <main className="container mx-auto px-4 py-8 max-w-6xl md:pt-20 pt-10">
      <div className="text-center mb-10 lg:mb-20">
        <Heading level={3} className="text-3xl md:text-4xl font-bold mb-2">
          Confirm Subscription
        </Heading>
        <Text color="muted" className="text-lg !text-center">
          We believe Untitled should be accessible to all companies, no matter the size.
        </Text>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="grid md:grid-cols-2 gap-10 items-start">
        {/* Booking Details */}
        <div>
          <Heading level={5} className="text-lg font-semibold mb-4">
            Booking Details
          </Heading>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <Controller
              name="firstName"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="First Name"
                  placeholder="Enter First name"
                  error={errors.firstName?.message}
                  required
                  autoComplete="given-name"
                />
              )}
            />
            <Controller
              name="lastName"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Last name"
                  placeholder="Enter Last name"
                  error={errors.lastName?.message}
                  required
                  autoComplete="family-name"
                />
              )}
            />
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <Controller
              name="address"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Address"
                  placeholder="Enter Address"
                  error={errors.address?.message}
                  required
                  autoComplete="address-line1"
                />
              )}
            />
            <Controller
              name="city"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="City"
                  placeholder="Enter City"
                  error={errors.city?.message}
                  required
                  autoComplete="address-level2"
                />
              )}
            />
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <Controller
              name="state"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="State"
                  placeholder="Enter State"
                  error={errors.state?.message}
                  required
                  autoComplete="address-level1"
                />
              )}
            />
            <Controller
              name="zip"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Zip Code"
                  placeholder="Enter Zip Code"
                  error={errors.zip?.message}
                  required
                  autoComplete="postal-code"
                />
              )}
            />
          </div>
          <div className="grid grid-cols-1 gap-4">
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Phone Number"
                  placeholder="Enter Phone Number"
                  error={errors.phone?.message}
                  required
                  autoComplete="tel"
                />
              )}
            />
          </div>
        </div>

        {/* Billing & Payment */}
        <div>
          <Heading level={5} className="text-lg font-semibold mb-4">
            Billing Details
          </Heading>
          <div className="flex flex-col gap-2 border rounded-lg px-4 py-3 mb-2">
            <div className="flex justify-between items-center">
              <span>
                {planName}{" "}
                {duration === "YEARLY" ? "(Year)" : duration === "MONTHLY" ? "(Month)" : ""}
              </span>
              <span className="font-semibold">{priceLabel}</span>
            </div>
            {propertyLimit && (
              <div className="flex justify-between items-center text-xs text-gray-500">
                <span>Property Limit</span>
                <span>{propertyLimit}</span>
              </div>
            )}
          </div>
          <div className="flex justify-between items-center border rounded-lg px-4 py-3 mb-6">
            <span>Total</span>
            <span className="font-semibold">{priceLabel}</span>
          </div>

          <Heading level={5} className="text-lg font-semibold mb-4">
            Payment Information
          </Heading>

          <Controller
            name="cardType"
            control={control}
            render={({ field }) => (
              <PaymentCardTypeSelector value={field.value} onChange={field.onChange} />
            )}
          />

          {/* Stripe CardElement */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Card Details</label>
            <div className="border p-3 rounded-md">
              <CardElement options={{ style: { base: { fontSize: "16px" } } }} />
            </div>
            {errors.cardType && (
              <p className="text-red-500 text-sm mt-1">{errors.cardType.message}</p>
            )}
          </div>

          <div className="mb-8">
            <label htmlFor="country" className="block text-sm font-medium mb-2">
              Country
            </label>
            <Controller
              name="country"
              control={control}
              render={({ field }) => (
                <select
                  {...field}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                >
				  <option value="">Select a country</option>
				  {allCountry.map((country) => (
					<option key={country?.name} value={country?.name}>
					  {country?.name}
					</option>
				  ))}
                </select>
              )}
            />
            {errors.country && (
              <p className="text-red-500 text-sm mt-1">{errors.country.message}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full !text-white"
            disabled={isSubmitting || isStripeLoading || !stripe || !elements}
            isLoading={isSubmitting || isStripeLoading}
          >
            {(isSubmitting || isStripeLoading) ? (
              <>
                <Spinner size={18} className="mr-2" /> Processing...
              </>
            ) : (
              "Confirm Subscription"
            )}
          </Button>
        </div>
      </form>
    </main>
  );
}