/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Table } from '@/components/shared/Table';
import { Button } from '@/components/ui/Button';
import { useDashboard } from '@/providers/DashboardProvider';
import { Eye } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import PricingDetailsModal from '@/components/pages/dashboard/PricingDetailsModal';
import { Heading, Text } from '@/components/ui/Typography';

interface Subscription {
  id: number;
  package_name: string;
  package_price: string;
  status: string;
  starts_at: string;
  propertyCount?: number;
  description?: string;
  features?: string[];
}

interface AgentPricingInfoProps {
  subscriptions: Subscription[];
}

const AgentPricingInfo = ({ subscriptions }: AgentPricingInfoProps) => {
  const { setPageTitle, setPageSubtitle } = useDashboard();
  const router = useRouter();

  useEffect(() => {
    setPageTitle('Pricing');
    setPageSubtitle('Manage Your Pricing Plans');
  }, [setPageTitle, setPageSubtitle]);

  // Create a new array to avoid mutating the original
  const sortedSubscriptions = [...subscriptions].sort((a, b) => new Date(b.starts_at).getTime() - new Date(a.starts_at).getTime());
  const latestSubscription = sortedSubscriptions[0];
  const previousSubscription = sortedSubscriptions.length > 1 ? sortedSubscriptions[1] : null;

  const columns = [
    {
      header: 'Subscription ID',
      accessor: 'id' as keyof Subscription,
      minWidth: '160px',
    },
    {
      header: 'Plan Name',
      accessor: 'package_name' as keyof Subscription,
      minWidth: '120px',
    },
    {
      header: 'Amount',
      accessor: 'package_price' as keyof Subscription,
      render: (item: Subscription) => `$${item.package_price}`,
      minWidth: '100px',
    },
    {
      header: 'Actions',
      accessor: 'b' as any,
      render: (item: Subscription) => <ActionsCell item={item} />,
      minWidth: '120px',
    },
  ];

  function ActionsCell({ item }: { item: Subscription }) {
    const [open, setOpen] = useState(false);
    const handleUpgrade = () => {
      setOpen(false);
      router.push('/pricing');
    };
    return (
      <>
        <Button color="primary" className="!text-white" size="sm" onClick={() => setOpen(true)}>
          <Eye size={18} />
        </Button>
        <PricingDetailsModal
          open={open}
          onClose={() => setOpen(false)}
          plan={{
            // id: item.id.toString(),
            planName: item.package_name,
            amount: `$${item.package_price}`,
            propertyCount: item.propertyCount || 0,
            description: item.description || 'No description available',
            features: item.features || [],
          }}
          onUpgrade={handleUpgrade}
        />
      </>
    );
  }

  return (
    <div className="w-full space-y-8">
      <div className="flex flex-col sm:flex-row gap-4 mb-8 flex-wrap">
        {latestSubscription ? (
          <div className="flex-1 min-w-[180px] rounded-xl shadow border border-primary-400 dark:border-gray-700 bg-white dark:bg-[var(--color-neutral-900)] p-5 flex justify-between flex-wrap items-center gap-2 relative transition-all duration-200 hover:shadow-lg hover:-translate-y-1 hover:border-primary/60 cursor-pointer">
            <div>
              <Text size="sm" className="font-semibold text-muted-foreground mb-1 uppercase tracking-wide">
                Current Plan
              </Text>
              <Heading level={4} className="text-2xl font-bold text-foreground dark:text-white">
                ${latestSubscription.package_price}
              </Heading>
              <Text size="sm" className="text-primary font-semibold text-primary-400">
                {latestSubscription.package_name}
              </Text>
              <Text size="sm" className="text-muted-foreground mb-4">
                {latestSubscription.propertyCount || 'N/A'} Property Listings
              </Text>
            </div>
          </div>
        ) : (
          <Text color="secondary">No current subscription found</Text>
        )}
        {previousSubscription ? (
          <div className="flex-1 min-w-[180px] rounded-xl shadow border border-gray-300 dark:border-gray-700 bg-white dark:bg-[var(--color-neutral-900)] p-5 flex justify-between flex-wrap items-center gap-2 relative transition-all duration-200 hover:shadow-lg hover:-translate-y-1 hover:border-primary/60 cursor-pointer">
            <div>
              <Text size="sm" className="font-semibold text-muted-foreground mb-1 uppercase tracking-wide">
                Previous Plan
              </Text>
              <Heading level={4} className="text-2xl font-bold text-foreground dark:text-white">
                ${previousSubscription.package_price}
              </Heading>
              <Text size="sm" className="text-primary font-semibold text-primary-400">
                {previousSubscription.package_name}
              </Text>
              <Text size="sm" className="text-muted-foreground mb-4">
                {previousSubscription.propertyCount || 'N/A'} Property Listings
              </Text>
            </div>
          </div>
        ) : (
          <Text color="secondary">No previous subscription found</Text>
        )}
      </div>
      <Table columns={columns} data={subscriptions} />
    </div>
  );
};

export default AgentPricingInfo;