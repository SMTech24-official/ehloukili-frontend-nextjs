
'use client';

import DetailsInfoItem from '@/components/shared/DetailsInfoItem';
import DetailsProfileHeader from '@/components/shared/DetailsProfileHeader';
import DetailsTabs, { IDetailsTab } from '@/components/shared/DetailsTabs';
import { useDashboard } from '@/providers/DashboardProvider';
import { LucideInfo } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useSingleUserQuery } from '@/redux/api/authApi';
import { Text } from '@/components/ui/Typography';
import { useLoading } from '@/providers/LoadingProvider';

const UserDetailsPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { setPageTitle, setPageSubtitle } = useDashboard();
    const { setLoading, setLoadingText } = useLoading();
  const params = useParams();
  const id = typeof params.id === 'string' ? params.id : '';

  const { data, isLoading, error } = useSingleUserQuery(id);

  useEffect(() => {
    setPageTitle('My Tenants');
    setPageSubtitle('All Tenants > Details');
  }, [setPageTitle, setPageSubtitle]);

  const tabs: IDetailsTab[] = [
    { label: 'User Information', icon: <LucideInfo className="w-5 h-5" /> },
  ];

    useEffect(() => {
        if (isLoading) {
            setLoadingText('Loading User Details...');
            setLoading(true);
        } else {
            setLoading(false);
        }
    }, [isLoading, setLoading, setLoadingText]);

  if (error) {
    let errorMessage = 'An error occurred while loading tenant details.';
    if ('message' in error && typeof error.message === 'string') {
      errorMessage = error.message;
    } else if ('status' in error && typeof error.status === 'number') {
      errorMessage = `Error code: ${error.status}`;
    }
    return (
      <div className="container mx-auto px-4 py-8 flex items-center justify-center h-screen">
        <Text color="error">{errorMessage}</Text>
      </div>
    );
  }

  if (!data?.profile) {
    return (
      <div className="container mx-auto px-4 py-8 flex items-center justify-center h-screen">
        <Text color="secondary">Tenant not found</Text>
      </div>
    );
  }

  const tenant = data.profile;

  const tabContents = [
    <div key="tenants-info" className="flex flex-col gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <DetailsInfoItem label="Full Name" value={`${tenant.first_name} ${tenant.last_name}`} />
        <DetailsInfoItem label="Phone" value={tenant.phone} />
        <DetailsInfoItem label="Email" value={tenant.email} />
        <DetailsInfoItem label="Address" value={tenant.address || 'N/A'} />
        <DetailsInfoItem label="City" value={tenant.city || 'N/A'} />
        <DetailsInfoItem label="State" value={tenant.state || 'N/A'} />
        <DetailsInfoItem label="Zip Code" value={tenant.zip_code || 'N/A'} />
        <DetailsInfoItem label="Country" value={tenant.country || 'N/A'} />
      </div>
    </div>,
  ];

  return (
    <div className="w-full px-4 py-8 border border-gray-100 shadow rounded-xl">
      <DetailsProfileHeader
        imageUrl={tenant.image_url || '/homePage/modernVilla.svg'}
        title={`${tenant.first_name} ${tenant.last_name}`}
        id={tenant.id.toString()}
        address={`${tenant.address || ''}, ${tenant.city || ''}, ${tenant.country || ''}`}
      />

      <div className="mt-8">
        <DetailsTabs tabList={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="mt-6 animate-fade-in">{tabContents[activeTab]}</div>
      </div>
    </div>
  );
};

export default UserDetailsPage;