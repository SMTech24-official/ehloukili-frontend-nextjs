'use client'
import DetailsInfoItem from '@/components/shared/DetailsInfoItem';
import DetailsProfileHeader from '@/components/shared/DetailsProfileHeader';
import DetailsTabs, { IDetailsTab } from '@/components/shared/DetailsTabs';
import { useDashboard } from '@/providers/DashboardProvider';
import { ArrowDownRightSquareIcon, LucideAperture, LucideInfo} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import AgentPropertiesInfo from './component/AgentPropertiesInfo';
import AgentPricingInfo from './component/AgentPricingInfo';

const tenant = {
    id: "T123",
    name: "John Doe",
    phone: "+1 555-987-6543",
    email: "john.doe@email.com",
    address: "123 Main St. Anytown, USA",
    city: "Anytown",
    state: "California",
    zip_code: "12345"
};

const tabContents = [
	// tenants Information
	(
        <div key="tenants-info" className="flex flex-col gap-4">
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <DetailsInfoItem label="Full Name" value={tenant.name} />
                <DetailsInfoItem label="Phone" value={tenant.phone} />
                <DetailsInfoItem label="Email" value={tenant.email} />
                <DetailsInfoItem label="Address" value={tenant.address} />
                <DetailsInfoItem label="City" value={tenant.city} />
                <DetailsInfoItem label="State" value={tenant.state} />
                <DetailsInfoItem label="Zip Code" value={tenant.zip_code} />
			</div>
		</div>
	),
    (<AgentPropertiesInfo key="agent-properties-info" />),
    (<AgentPricingInfo key="agent-pricing-info" />)
];

const AdminAgentsDetailsPage = () => {
    const [activeTab, setActiveTab] = useState(0);
  const { setPageTitle, setPageSubtitle } = useDashboard();

    useEffect(() => {
        setPageTitle('Agent Details');
        setPageSubtitle('All Agents > Details');
    }, [setPageTitle, setPageSubtitle]);
    const tabs: IDetailsTab[] = [
        { label: "Agent Informations", icon: <LucideInfo className="w-5 h-5" /> },
        { label: "Property Information", icon: <LucideAperture className="w-5 h-5" /> },
        { label: "Pricing Information", icon: <ArrowDownRightSquareIcon className="w-5 h-5" /> }
    ];
    return (
        <div className="w-full px-4 py-8 border border-gray-100 shadow rounded-xl">
            {/* Property Profile Header */}
            <DetailsProfileHeader
                imageUrl={'/homePage/modernVilla.svg'}
                title={tenant.name}
                id={tenant.id}
                address={tenant.address}
            />

            {/* Tabs */}
            <div className="mt-8">
                <DetailsTabs tabList={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
                <div className="mt-6 animate-fade-in">
                    {tabContents[activeTab]}
                </div>
            </div>
        </div>
    );
};

export default AdminAgentsDetailsPage;