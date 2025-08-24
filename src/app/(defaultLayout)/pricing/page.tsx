/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { Heading, Text } from '@/components/ui/Typography';
import PricingCard from '@/components/shared/PricingCard';
import { Check } from 'lucide-react';
import React from 'react';
import { useRouter } from 'next/navigation';

const plans = [
	{
		name: 'Basic plan',
		price: 10,
		description: 'Billed annually.',
		features: [
			'Access to all basic features',
			'Basic reporting and analytics',
			'Up to 10 individual users',
			'20GB individual data each user',
			'Basic chat and email support',
		],
		popular: false,
	},
	{
		name: 'Business plan',
		price: 20,
		description: 'Billed annually.',
		features: [
			'200+ integrations',
			'Advanced reporting and analytics',
			'Up to 20 individual users',
			'40GB individual data each user',
			'Priority chat and email support',
		],
		popular: true,
	},
	{
		name: 'Enterprise plan',
		price: 40,
		description: 'Billed annually.',
		features: [
			'Advanced custom fields',
			'Audit log and data history',
			'Unlimited individual users',
			'Unlimited individual data',
			'Personalised+priority service',
		],
		popular: false,
	},
];

export default function PricingPage() {
    const router = useRouter();

    const handlePricingCardClick = (plan: typeof plans[number]) => {
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
			<div className="relative flex flex-col md:flex-row gap-8 justify-center items-stretch">
				{/* Most Popular Arrow & Label */}
				<div className="hidden md:block absolute left-1/2 -translate-x-1/2 -top-8 z-10">
					<div className="flex flex-col items-center">
						<span className="text-sm font-medium text-primary-600 mb-1">Most popular!</span>
						<svg width="40" height="32" viewBox="0 0 40 32" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M20 0V28M20 28L8 16M20 28L32 16" stroke="#1A7F64" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
						</svg>
					</div>
				</div>
				{plans.map((plan) => (
					<PricingCard
						key={plan.name}
						price={plan.price}
						name={plan.name}
						description={plan.description}
						features={plan.features}
						popular={plan.popular}
						onClick={() => handlePricingCardClick(plan)}
					/>
				))}
			</div>
		</main>
	);
}
