/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { Heading, Text } from '@/components/ui/Typography';
import PricingCard from '@/components/shared/PricingCard';
import { Check } from 'lucide-react';
import React from 'react';
import { useGetPlansQuery } from '@/redux/api/subscriptionPackage';
import Spinner from '@/components/ui/Spinner';
import { useRouter } from 'next/navigation';




export default function PricingPage() {
	const router = useRouter();
	const { data, isLoading, isError } = useGetPlansQuery();

	const handlePricingCardClick = (plan: any) => {
		router.push(`/pricing/payment?plan=${plan.name}`);
	};

	return (
		<main className="container mx-auto px-4 py-8 max-w-5xl md:pt-20 pt-10">
			{/* Heading */}
			<div className="text-center lg:mb-20 mb-12">
				<Heading level={3} className="text-3xl md:text-4xl font-bold mb-2">Simple, transparent pricing</Heading>
				<Text color="muted" className="text-lg !text-center">We believe Unilited should be accessible to all companies, no matter the size.</Text>
			</div>

			{/* Pricing Cards */}
			<div className="relative flex flex-col md:flex-row gap-8 justify-center items-stretch min-h-[200px]">
				{/* Most Popular Arrow & Label */}
				<div className="hidden md:block absolute left-1/2 -translate-x-1/2 -top-8 z-10">
					<div className="flex flex-col items-center">
						<span className="text-sm font-medium text-primary-600 mb-1">Most popular!</span>
						<svg width="40" height="32" viewBox="0 0 40 32" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M20 0V28M20 28L8 16M20 28L32 16" stroke="#1A7F64" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
						</svg>
					</div>
				</div>
				{isLoading ? (
					<div className="flex justify-center items-center w-full min-h-[180px]"><Spinner size={32} color='black'/></div>
				) : isError ? (
					<div className="flex justify-center items-center w-full text-red-500">Failed to load plans. Please try again later.</div>
				) : !data?.data?.length ? (
					<div className="flex justify-center items-center w-full text-gray-500">No plans found.</div>
				) : (
					data?.data?.map((plan: any) => (
						<PricingCard
							key={plan.id}
							price={plan.price}
							name={plan.name}
							description={plan.description}
							features={plan.features}
							popular={plan.popular || false}
							onClick={() => handlePricingCardClick(plan)}
							duration={plan.duration}
							propertyLimit={plan.property_limit}
						/>
					))
				)}
			</div>
		</main>
	);
}
