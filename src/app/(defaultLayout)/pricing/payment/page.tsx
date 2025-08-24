'use client';
import Button from '@/components/ui/Button';
import PaymentCardTypeSelector from '@/components/shared/PaymentCardTypeSelector';import { useForm, Controller } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import { Heading, Text } from '@/components/ui/Typography';
import Input from '@/components/ui/Input';
import { paymentFormSchema, PaymentFormSchema } from '@/schema/paymentForm.schema';

const defaultValues: PaymentFormSchema = {
	firstName: '',
	lastName: '',
	address: '',
	city: '',
	state: '',
	zip: '',
	phone1: '',
	phone2: '',
	cardType: 'card',
	cardNumber: '',
	exp: '',
	cvc: '',
	country: 'Bangladesh',
};

export default function PaymentPage() {
		const { control, handleSubmit, formState: { errors, isSubmitting } } = useForm<PaymentFormSchema>({
			defaultValues,
			resolver: yupResolver(paymentFormSchema),
			mode: 'onTouched',
		});

		const onSubmit = async () => {
			await new Promise((res) => setTimeout(res, 1200));
			alert('Subscription confirmed!');
		};

	return (
		<main className="container mx-auto px-4 py-8 max-w-6xl md:pt-20 pt-10">
			<div className="text-center mb-10 lg:mb-20">
				<Heading level={3} className="text-3xl md:text-4xl font-bold mb-2">Confirm Subscription</Heading>
				<Text color="muted" className="text-lg !text-center">We believe Untitled should be accessible to all companies, no matter the size.</Text>
			</div>
			<form onSubmit={handleSubmit(onSubmit)} className="grid md:grid-cols-2 gap-10 items-start">
				{/* Booking Details */}
				<div>
					<Heading level={5} className="text-lg font-semibold mb-4">Booking Details</Heading>
					<div className="grid grid-cols-2 gap-4 mb-4">
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
								<Input {...field} label="Last name" placeholder="Enter Last name" error={errors.lastName?.message} required autoComplete="family-name" />
							)}
						/>
					</div>
					<div className="grid grid-cols-2 gap-4 mb-4">
						<Controller
							name="address"
							control={control}
							render={({ field }) => (
								<Input {...field} label="Address" placeholder="Enter Address" error={errors.address?.message} required autoComplete="address-line1" />
							)}
						/>
						<Controller
							name="city"
							control={control}
							render={({ field }) => (
								<Input {...field} label="City" placeholder="Enter City" error={errors.city?.message} required autoComplete="address-level2" />
							)}
						/>
					</div>
					<div className="grid grid-cols-2 gap-4 mb-4">
						<Controller
							name="state"
							control={control}
							render={({ field }) => (
								<Input {...field} label="State" placeholder="Enter State" error={errors.state?.message} required autoComplete="address-level1" />
							)}
						/>
						<Controller
							name="zip"
							control={control}
							render={({ field }) => (
								<Input {...field} label="Zip Code" placeholder="Enter Zip Code" error={errors.zip?.message} required autoComplete="postal-code" />
							)}
						/>
					</div>
					<div className="grid grid-cols-2 gap-4">
						<Controller
							name="phone1"
							control={control}
							render={({ field }) => (
								<Input {...field} label="Phone Number" placeholder="Enter Phone Number" error={errors.phone1?.message} required autoComplete="tel" />
							)}
						/>
						<Controller
							name="phone2"
							control={control}
							render={({ field }) => (
								<Input {...field} label="Phone Number" placeholder="Enter Phone Number" error={errors.phone2?.message} required autoComplete="tel" />
							)}
						/>
					</div>
				</div>
				{/* Billing & Payment */}
				<div>
					<Heading level={5} className="text-lg font-semibold mb-4">Billing Details</Heading>
					<div className="flex justify-between items-center border rounded-lg px-4 py-3 mb-2">
						<span>Basic Plan Year</span>
						<span className="font-semibold">$14.99</span>
					</div>
					<div className="flex justify-between items-center border rounded-lg px-4 py-3 mb-6">
						<span>Total</span>
						<span className="font-semibold">$14.99</span>
					</div>
					<Heading level={5} className="text-lg font-semibold mb-4">Payment Information</Heading>
					<Controller
						name="cardType"
						control={control}
						render={({ field }) => (
							<PaymentCardTypeSelector value={field.value} onChange={field.onChange} />
						)}
					/>
					<div className="flex items-center gap-2 mb-4">
						<Controller
							name="cardNumber"
							control={control}
							render={({ field }) => (
								<Input {...field} label="Card Number" placeholder="1223 5412 0421 3" error={errors.cardNumber?.message} required className="flex-1" autoComplete="cc-number" />
							)}
						/>
						<span className="text-xs px-2 py-1 rounded bg-gray-100 border border-gray-200 text-primary-600 font-semibold">stripe</span>
					</div>
					<div className="grid grid-cols-2 gap-4 mb-4">
						<Controller
							name="exp"
							control={control}
							render={({ field }) => (
								<Input {...field} label="Expiration date (MM/YY)" placeholder="25/2024" error={errors.exp?.message} required autoComplete="cc-exp" />
							)}
						/>
						<Controller
							name="cvc"
							control={control}
							render={({ field }) => (
								<Input {...field} label="Security code" placeholder="CVC" error={errors.cvc?.message} required autoComplete="cc-csc" />
							)}
						/>
					</div>
					<div className="mb-8">
						<label htmlFor="country" className="block text-sm font-medium mb-2">Country</label>
						<Controller
							name="country"
							control={control}
							render={({ field }) => (
								<select
									{...field}
									className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
									required
								>
									<option value="Bangladesh">Bangladesh</option>
									<option value="USA">USA</option>
									<option value="UK">UK</option>
									<option value="India">India</option>
									<option value="Canada">Canada</option>
								</select>
							)}
						/>
					</div>
					<Button type="submit" className="w-full !text-white" disabled={isSubmitting} isLoading={isSubmitting}>
						Confirm Subscription
					</Button>
				</div>
			</form>
		</main>
	);
}
