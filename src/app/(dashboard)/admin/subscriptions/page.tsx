"use client";

import { Table } from '@/components/shared/Table';
import React, { useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/Button';
import PricingDetailsModal from '@/components/pages/dashboard/PricingDetailsModal';
import { useRouter } from 'next/navigation';
import { useDashboard } from '@/providers/DashboardProvider';
import { useLoading } from '@/providers/LoadingProvider';
import { useGetAllSubscriptionsQuery } from '@/redux/api/subscriptionPackage';
import { ISubscription } from '@/schema/subscription.schema';



const columns = [
    { header: 'Subscription ID', accessor: 'id' as keyof ISubscription, minWidth: '120px' },
    { header: 'User ID', accessor: 'user' as keyof ISubscription, minWidth: '120px', render: (item: ISubscription) => `${item.user.id}` },
    { header: 'User', accessor: '' as keyof ISubscription, minWidth: '120px', render: (item: ISubscription) => `${item.user.first_name} ${item.user.last_name}` },
    { header: 'Payment Intent ID', accessor: 'payment_intent_id' as keyof ISubscription, minWidth: '160px', render: (item: ISubscription) => item.payment_intent_id || 'N/A' },
    { header: 'Payment Status', accessor: 'payment_status' as keyof ISubscription, minWidth: '120px', render: (item: ISubscription) => item.payment_status || 'N/A' },
    { header: 'Status', accessor: 'status' as keyof ISubscription, minWidth: '100px', render: (item: ISubscription) => item.status || 'N/A' },
    { header: 'Package', accessor: 'package' as keyof ISubscription, minWidth: '180px', render: (item: ISubscription) => `${item.package.id} - ${item.package.name}` },
];




const SubscriptionPage = () => {
    const router = useRouter();
    const { setPageTitle, setPageSubtitle } = useDashboard();
    const { data, isLoading } = useGetAllSubscriptionsQuery();
    const { setLoading, setLoadingText } = useLoading();


    useEffect(() => {
        setPageTitle('Subscriptions');
        setPageSubtitle('Manage Your Subscription Plans');
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
    const subscriptions: ISubscription[] = useMemo(() => {
        if (!data?.subscriptions) return [];
        return [...data.subscriptions].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    }, [data]);



    // Table data: use full Subscription objects
    const tableData = subscriptions;

    // Modal state for details
    const [modalOpen, setModalOpen] = React.useState(false);
    const [selectedSub, setSelectedSub] = React.useState<ISubscription | null>(null);

    // Convert Subscription to modal plan shape
    function getPlanDetails(sub: ISubscription | null) {
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
    const renderActions = (sub: ISubscription) => (
        <Button color="primary" size="sm" className="!text-white" onClick={() => { setSelectedSub(sub); setModalOpen(true); }}>
            View
        </Button>
    );

    return (
        <div className="w-full space-y-8">
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

export default SubscriptionPage;