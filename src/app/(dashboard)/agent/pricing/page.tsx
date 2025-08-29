"use client";

import { Table } from '@/components/shared/Table';
import React, { useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/Button';
import PricingDetailsModal from '@/components/pages/dashboard/PricingDetailsModal';
import { useRouter } from 'next/navigation';
import Typography from '@/components/ui/Typography';
import { useDashboard } from '@/providers/DashboardProvider';


import { useLoading } from '@/providers/LoadingProvider';
import { useGetAgentSubscriptionsQuery } from '@/redux/api/subscriptionPackage';


// API data types
type Subscription = {
    id: number;
    payment_intent_id: string | null;
    payment_status: string | null;
    status: string;
    created_at: string;
    package: {
        id: number;
        name: string;
        price: string;
        duration: string;
        duration_in_days: number;
        property_limit: number;
        features: string[];
    };
};

const columns = [
    { header: 'Subscription ID', accessor: 'id' as keyof Subscription, minWidth: '120px' },
    // value na thakle N/A show hobe
    { header: 'Payment Intent ID', accessor: 'payment_intent_id' as keyof Subscription, minWidth: '160px', render: (item: Subscription) => item.payment_intent_id || 'N/A' },
    { header: 'Payment Status', accessor: 'payment_status' as keyof Subscription, minWidth: '120px', render: (item: Subscription) => item.payment_status || 'N/A' },
    { header: 'Status', accessor: 'status' as keyof Subscription, minWidth: '100px', render: (item: Subscription) => item.status || 'N/A' },
    { header: 'Package', accessor: 'package' as keyof Subscription, minWidth: '180px', render: (item: Subscription) => `${item.package.id} - ${item.package.name}` },
];




const PricingPage = () => {
    const router = useRouter();
    const { setPageTitle, setPageSubtitle } = useDashboard();
    const { data, isLoading } = useGetAgentSubscriptionsQuery();
    const { setLoading, setLoadingText } = useLoading();


    useEffect(() => {
        setPageTitle('Pricing');
        setPageSubtitle('Manage Your Pricing Plans');
    }, [setPageTitle, setPageSubtitle]);

    // Global loading overlay for fetching subscriptions
    useEffect(() => {
        if (isLoading) {
            setLoadingText('Loading your subscriptions...');
            setLoading(true);
        } else {
            setLoading(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading]);

    // Sort subscriptions by created_at desc
    const subscriptions: Subscription[] = useMemo(() => {
        if (!data?.subscriptions) return [];
        return [...data.subscriptions].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    }, [data]);

    const current = subscriptions[0];
    const previous = subscriptions[1];

    // Calculate days left for current plan
    function getDaysLeft(sub: Subscription | undefined) {
        if (!sub) return null;
        const start = new Date(sub.created_at);
        const now = new Date();
        const duration = sub.package.duration_in_days || 0;
        const end = new Date(start.getTime() + duration * 24 * 60 * 60 * 1000);
        const diffMs = end.getTime() - now.getTime();
        if (diffMs <= 0) return 'Expired';
        const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        return `${days} days ${hours} hour`;
    }

        // Table data: use full Subscription objects
        const tableData = subscriptions;

    // Modal state for details
    const [modalOpen, setModalOpen] = React.useState(false);
    const [selectedSub, setSelectedSub] = React.useState<Subscription | null>(null);

    // Convert Subscription to modal plan shape
    function getPlanDetails(sub: Subscription | null) {
        if (!sub) return null;
        return {
            amount: `$${sub.package.price}/${sub.package.duration === 'YEARLY' ? 'yr' : 'mo'}`,
            planName: sub.package.name,
            propertyCount: sub.package.property_limit,
            description: `Subscription ID: ${sub.id}`,
            features: sub.package.features,
            // features: [
            //     `Status: ${sub.status}`,
            //     `Payment Status: ${sub.payment_status || 'N/A'}`,
            //     `Payment Intent ID: ${sub.payment_intent_id || 'N/A'}`,
            //     `Duration: ${sub.package.duration_in_days} days`,
                
            // ],
        };
    }

    // Table actions
    const renderActions = (sub: Subscription) => (
        <Button color="primary" size="sm" className="!text-white" onClick={() => { setSelectedSub(sub); setModalOpen(true); }}>
            View
        </Button>
    );

    return (
        <div className="w-full space-y-8">
            {/* pricing card */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8 flex-wrap">
                {/* Current Plan Card */}
                <div className='flex-1 min-w-[180px] rounded-xl shadow border border-primary-400 dark:border-gray-700 bg-white dark:bg-[var(--color-neutral-900)] p-5 flex justify-between flex-wrap items-center gap-2 relative transition-all duration-200 hover:shadow-lg hover:-translate-y-1 hover:border-primary/60 cursor-pointer'>
                    <div className="">
                        <p className='text-sm text-gray-400'>Days left: {getDaysLeft(current)}</p>
                        <div className="text-sm xl:text-base font-semibold text-muted-foreground mb-1 uppercase tracking-wide">Current Plan</div>
                        <Typography.Heading level={4} className="text-2xl font-bold text-foreground dark:text-white">{current ? `$${current.package.price}/${current.package.duration === 'YEARLY' ? 'yr' : 'mo'}` : '--'}</Typography.Heading>
                        <div className="text-sm text-primary font-semibold text-primary-400">{current?.package.name || '--'}</div>
                        <div className="text-sm xl:text-base text-muted-foreground mb-4">{current?.package.property_limit || '--'} Property Listings</div>
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
                        <Typography.Heading level={4} className="text-2xl font-bold text-foreground dark:text-white">{previous ? `$${previous.package.price}/${previous.package.duration === 'YEARLY' ? 'yr' : 'mo'}` : '--'}</Typography.Heading>
                        <div className="text-sm text-primary font-semibold text-primary-400">{previous?.package.name || '--'}</div>
                        <div className="text-sm xl:text-base text-muted-foreground mb-4">{previous?.package.property_limit || '--'} Property Listings</div>
                    </div>
                </div>
            </div>

            {/* table */}
            <Table
                columns={columns}
                data={tableData}
                renderActions={renderActions}
            />

            {/* Details Modal */}
            <PricingDetailsModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                plan={getPlanDetails(selectedSub)}
                onUpgrade={() => { setModalOpen(false); router.push('/pricing'); }}
            />
        </div>
    );
};

export default PricingPage;