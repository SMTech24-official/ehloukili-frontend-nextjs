'use client'
import DetailsInfoItem from '@/components/shared/DetailsInfoItem';
import DetailsProfileHeader from '@/components/shared/DetailsProfileHeader';
import DetailsTabs, { IDetailsTab } from '@/components/shared/DetailsTabs';
import { useDashboard } from '@/providers/DashboardProvider';
import { LucideInfo} from 'lucide-react';
import React, { useEffect, useState } from 'react';

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
	)
];

const AdminTenantsDetailsPage = () => {
    const [activeTab, setActiveTab] = useState(0);
  const { setPageTitle, setPageSubtitle } = useDashboard();

    useEffect(() => {
        setPageTitle('AllTenants');
        setPageSubtitle('All Tenants > Details');
    }, [setPageTitle, setPageSubtitle]);
    const tabs: IDetailsTab[] = [
        { label: "Tenant Informations", icon: <LucideInfo className="w-5 h-5" /> }
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

export default AdminTenantsDetailsPage;