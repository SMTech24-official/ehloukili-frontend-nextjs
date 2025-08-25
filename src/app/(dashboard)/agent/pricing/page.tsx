"use client";

import { Table } from '@/components/shared/Table';
import React, { useEffect, useState } from 'react';
import PricingDetailsModal from '@/components/pages/dashboard/PricingDetailsModal';
import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';
import Typography from '@/components/ui/Typography';
import { useDashboard } from '@/providers/DashboardProvider';
import { Eye } from 'lucide-react';


// Demo/mock data
const currentPlan = {
    amount: "$49/mo",
    planName: "Pro Plan",
    propertyCount: 10,
};
const previousPlan = {
    amount: "$19/mo",
    planName: "Starter Plan",
    propertyCount: 3,
};

type PriceItem = {
    id: string;
    planName: string;
    amount: string;
    propertyCount: number;
    description: string;
    features: string[];
};

const priceData: PriceItem[] = [
    {
        id: "sub_001",
        planName: "Pro Plan",
        amount: "$49/mo",
        propertyCount: 10,
        description: "Best for growing agencies.",
        features: ["10 property listings", "Priority support", "Advanced analytics"],
    },
    {
        id: "sub_002",
        planName: "Starter Plan",
        amount: "$19/mo",
        propertyCount: 3,
        description: "For individuals starting out.",
        features: ["3 property listings", "Basic support"],
    },
];

const columns = [
    { header: 'Subscription ID', accessor: 'id' as keyof PriceItem, minWidth: '160px' },
    { header: 'Plan Name', accessor: 'planName' as keyof PriceItem, minWidth: '120px' },
    { header: 'Amount', accessor: 'amount' as keyof PriceItem, minWidth: '100px' },
    {
        header: 'Actions',
        accessor: 'id' as keyof PriceItem, // Use a valid key, but render custom cell
        render: (item: PriceItem) => <ActionsCell item={item} />, minWidth: '120px'
    },
];


function ActionsCell({ item }: { item: PriceItem }) {
    const [open, setOpen] = useState(false);
    const router = useRouter();
    const handleUpgrade = () => {
        setOpen(false);
        router.push('/pricing');
    };
    return (
        <>
            <Button color="primary" className='!text-white' size="sm" onClick={() => setOpen(true)}>
                <Eye size={18} />
            </Button>
            <PricingDetailsModal
                open={open}
                onClose={() => setOpen(false)}
                plan={item}
                onUpgrade={handleUpgrade}
            />
        </>
    );
}

const PricingPage = () => {
    const router = useRouter();
    const { setPageTitle, setPageSubtitle } = useDashboard();
    
        useEffect(() => {
            setPageTitle('Pricing');
            setPageSubtitle('Manage Your Pricing Plans');
        }, [setPageTitle, setPageSubtitle]);
    return (
        <div className="w-full space-y-8">
            {/* pricing card */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8 flex-wrap">
                {/* Current Plan Card */}
                <div className='flex-1 min-w-[180px] rounded-xl shadow border border-primary-400 dark:border-gray-700 bg-white dark:bg-[var(--color-neutral-900)] p-5 flex justify-between flex-wrap items-center gap-2 relative transition-all duration-200 hover:shadow-lg hover:-translate-y-1 hover:border-primary/60 cursor-pointer'>
                    <div className="">
                        <div className="text-sm xl:text-base font-semibold text-muted-foreground mb-1 uppercase tracking-wide">Current Plan</div>
                        <Typography.Heading level={4} className="text-2xl font-bold text-foreground dark:text-white">{currentPlan.amount}</Typography.Heading>
                        <div className="text-sm text-primary font-semibold text-primary-400">{currentPlan.planName}</div>
                        <div className="text-sm xl:text-base text-muted-foreground mb-4">{currentPlan.propertyCount} Property Listings</div>
                    </div>
                    <div className=''>
                        <Button color="primary" size="sm" className="mt-auto !text-white" onClick={() => router.push('/pricing')}>
                            Upgrade Plan
                        </Button>
                    </div>
                </div>
                {/* Previous Plan Card */}
                <div className='flex-1 min-w-[180px] rounded-xl shadow border border-gray-300 dark:border-gray-700 bg-white dark:bg-[var(--color-neutral-900)] p-5 flex justify-between flex-wrap items-center gap-2 relative transition-all duration-200 hover:shadow-lg hover:-translate-y-1 hover:border-primary/60 cursor-pointer'>
                    <div className="">
                        <div className="text-sm xl:text-base font-semibold text-muted-foreground mb-1 uppercase tracking-wide">Previous Plan</div>
                        <Typography.Heading level={4} className="text-2xl font-bold text-foreground dark:text-white">{previousPlan.amount}</Typography.Heading>
                        <div className="text-sm text-primary font-semibold text-primary-400">{previousPlan.planName}</div>
                        <div className="text-sm xl:text-base text-muted-foreground mb-4">{previousPlan.propertyCount} Property Listings</div>
                    </div>
                </div>
            </div>

            {/* table */}
            <Table
                columns={columns}
                data={priceData}
            />
        </div>
    );
};

export default PricingPage;