
'use client';

import DetailsInfoItem from '@/components/shared/DetailsInfoItem';
import DetailsProfileHeader from '@/components/shared/DetailsProfileHeader';
import DetailsTabs, { IDetailsTab } from '@/components/shared/DetailsTabs';
import { useDashboard } from '@/providers/DashboardProvider';
import { useLoading } from '@/providers/LoadingProvider';
import { ArrowDownRightSquareIcon, LucideAperture, LucideInfo } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useUserDetailsByAdminQuery } from '@/redux/api/authApi';
import { Text } from '@/components/ui/Typography';
import Spinner from '@/components/ui/Spinner';
import AgentPropertiesInfo from './component/AgentPropertiesInfo';
import AgentPricingInfo from './component/AgentPricingInfo';

const AdminAgentsDetailsPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { setPageTitle, setPageSubtitle } = useDashboard();
  const { setLoading, setLoadingText } = useLoading();
  const params = useParams();
  const id = typeof params.id === 'string' ? params.id : '';

  const { data, isLoading, error } = useUserDetailsByAdminQuery(id);

  useEffect(() => {
    setPageTitle('Agent Details');
    setPageSubtitle('All Agents > Details');
  }, [setPageTitle, setPageSubtitle]);

  useEffect(() => {
    if (isLoading) {
      setLoadingText('Loading agent details...');
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [isLoading, setLoading, setLoadingText]);

  const tabs: IDetailsTab[] = [
    { label: 'Agent Information', icon: <LucideInfo className="w-5 h-5" /> },
    { label: 'Property Information', icon: <LucideAperture className="w-5 h-5" /> },
    { label: 'Pricing Information', icon: <ArrowDownRightSquareIcon className="w-5 h-5" /> },
  ];

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 flex items-center justify-center h-screen">
        <Text>Loading agent details...</Text>
        <Spinner size={20} color="black" />
      </div>
    );
  }

  if (error) {
    let errorMessage = 'An error occurred while loading agent details.';
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

  if (!data?.user) {
    return (
      <div className="container mx-auto px-4 py-8 flex items-center justify-center h-screen">
        <Text color="secondary">Agent not found</Text>
      </div>
    );
  }

  const agent = data.user;

  const tabContents = [
    <div key="agent-info" className="flex flex-col gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <DetailsInfoItem label="Full Name" value={`${agent.first_name} ${agent.last_name}`} />
        <DetailsInfoItem label="Phone" value={agent.phone || 'N/A'} />
        <DetailsInfoItem label="Email" value={agent.email} />
        <DetailsInfoItem label="Address" value={agent.address || 'N/A'} />
        <DetailsInfoItem label="City" value={agent.city || 'N/A'} />
        <DetailsInfoItem label="State" value={agent.state || 'N/A'} />
        <DetailsInfoItem label="Zip Code" value={agent.zip_code || 'N/A'} />
        <DetailsInfoItem label="Country" value={agent.country || 'N/A'} />
      </div>
    </div>,
    <AgentPropertiesInfo key="agent-properties-info" properties={data?.properties || []} />,
    <AgentPricingInfo key="agent-pricing-info" subscriptions={data?.subscriptions || []} />,
  ];

  return (
    <div className="w-full px-4 py-8 border border-gray-100 shadow rounded-xl">
      <DetailsProfileHeader
        imageUrl={agent.image_url ? process.env.NEXT_PUBLIC_IMAGE_URL + agent.image_url : '/homePage/modernVilla.svg'}
        title={`${agent.first_name} ${agent.last_name}`}
        id={agent.id.toString()}
        address={`${agent.address || ''}, ${agent.city || ''}, ${agent.country || ''}`}
      />

      <div className="mt-8">
        <DetailsTabs tabList={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="mt-6 animate-fade-in">{tabContents[activeTab]}</div>
      </div>
    </div>
  );
};

export default AdminAgentsDetailsPage;