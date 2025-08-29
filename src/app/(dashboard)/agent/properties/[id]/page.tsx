/* eslint-disable @typescript-eslint/no-explicit-any */


"use client";
import React, { useEffect, useState } from "react";
import { useParams } from 'next/navigation';
import { useGetSinglePropertyQuery } from '@/redux/api/propertiesApi';
import { LucideWarehouse, LucideInfo, LucidePhone } from "lucide-react";
import FeaturePill from "@/components/shared/FeaturePill";
import DetailsTabs, { IDetailsTab } from "@/components/shared/DetailsTabs";
import DetailsProfileHeader from "@/components/shared/DetailsProfileHeader";
import DetailsInfoItem from "@/components/shared/DetailsInfoItem";
import { useDashboard } from "@/providers/DashboardProvider";
import Image from "next/image";

export default function PropertyDetailsPage() {
    const params = useParams();
    const id = typeof params?.id === "string" ? params.id : "";
    const { data, isLoading, isError } = useGetSinglePropertyQuery(id);
    const property = data?.data;
    const [activeTab, setActiveTab] = useState(0);
    const [imgModal, setImgModal] = useState(false);
    const [docModal, setDocModal] = useState(false);
    const { setPageTitle, setPageSubtitle } = useDashboard();

    useEffect(() => {
        setPageTitle('My Properties');
        setPageSubtitle('All Properties > Details');
    }, [setPageTitle, setPageSubtitle]);

    if (isLoading) return <div className="py-20 text-center">Loading...</div>;
    if (isError || !property) return <div className="py-20 text-center text-red-500">Failed to load property.</div>;

    const tabs: IDetailsTab[] = [
        { label: "Properties Information", icon: <LucideInfo className="w-5 h-5" /> },
        { label: "Contact Information", icon: <LucidePhone className="w-5 h-5" /> }
    ];

    const tabContents = [
        // Properties Information
        (
            <div key="properties-info" className="flex flex-col md:flex-row gap-8">
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                    <DetailsInfoItem label="Properties" value={property.property_type} />
                    <DetailsInfoItem label="Post Date" value={property.created_at ? new Date(property.created_at).toLocaleDateString() : ''} />
                    <DetailsInfoItem label="Properties ID" value={property.id} />
                    <DetailsInfoItem label="Status" value={property.status} />
                    <DetailsInfoItem label="Bedrooms" value={`${property.bedrooms} Bedrooms`} />
                    <DetailsInfoItem label="Baths" value={`${property.bathrooms} Baths`} />
                    <DetailsInfoItem label="Price" value={`$${property.price}`} />
                    <DetailsInfoItem label="Zip Code" value={property.zip_code} />
                    <div className="flex gap-2 mt-2">
                        <button className="px-3 py-1 rounded bg-teal-600 text-white" onClick={() => setImgModal(true)}>View Images</button>
                        <button className="px-3 py-1 rounded bg-blue-600 text-white" onClick={() => setDocModal(true)}>View Documents</button>
                    </div>
                </div>
                <div className="flex flex-col gap-2 mt-6 md:mt-0 md:w-64">
                    {/* Features */}
                    {(property.interior_features || []).map((f: string, i: number) => <FeaturePill key={f + i} icon={<LucideWarehouse className="w-4 h-4 text-primary" />} label={f} />)}
                    {(property.exterior_features || []).map((f: string, i: number) => <FeaturePill key={f + i} icon={<LucideWarehouse className="w-4 h-4 text-primary" />} label={f} />)}
                </div>
            </div>
        ),
        // Contact Information
        (
            <div key="contact-info" className="flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <DetailsInfoItem label="Owner Name" value={property.agent_name || (property.first_name + ' ' + property.last_name)} />
                    <DetailsInfoItem label="Phone" value={property.phone_number} />
                    <DetailsInfoItem label="Email" value={property.email} />
                    <DetailsInfoItem label="Address" value={property.street_address} />
                    <DetailsInfoItem label="City" value={property.city} />
                    <DetailsInfoItem label="State" value={property.state} />
                    <DetailsInfoItem label="Zip Code" value={property.zip_code} />
                </div>
            </div>
        ),
    ];

    return (
        <div className="w-full px-4 py-8 border border-gray-100 shadow rounded-xl">
            {/* Property Profile Header */}
            <DetailsProfileHeader
                imageUrl={process.env.NEXT_PUBLIC_IMAGE_URL + (property.photos?.[0]?.url || '') || '/homePage/modernVilla.svg'}
                title={property.property_type}
                id={property.id}
                address={property.street_address}
            />

            {/* Tabs */}
            <div className="mt-8">
                <DetailsTabs tabList={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
                <div className="mt-6 animate-fade-in">
                    {tabContents[activeTab]}
                </div>
            </div>

            {/* Images Modal */}
            {imgModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                    <div className="bg-white dark:bg-neutral-900 rounded-lg shadow-lg p-6 max-h-[85vh] w-full max-w-3xl overflow-y-auto relative">
                        <button className="absolute top-3 right-3 text-gray-400 hover:text-gray-700" onClick={() => setImgModal(false)}>&times;</button>
                        <h3 className="text-lg font-bold mb-4">Property Images</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {property.photos?.length ? property.photos.map((img: any, i: number) => (
                                <Image width={500} height={300} key={img.url + i}
                                    src={process.env.NEXT_PUBLIC_IMAGE_URL + (img?.url || '')} alt={img.name} className="rounded w-full object-cover max-h-60" />
                            )) : <div className="col-span-3 text-center text-gray-500">No images found.</div>}
                        </div>
                    </div>
                </div>
            )}
            {/* Documents Modal */}
            {docModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                    <div className="bg-white dark:bg-neutral-900 rounded-lg shadow-lg p-6 max-h-[85vh] w-full max-w-2xl overflow-y-auto relative">
                        <button className="absolute top-3 right-3 text-gray-400 hover:text-gray-700" onClick={() => setDocModal(false)}>&times;</button>
                        <h3 className="text-lg font-bold mb-4">Property Documents</h3>
                        <div className="space-y-3">
                            {property.documents?.length ? property?.documents?.map((doc: any, i: number) => (
                                <div key={doc.url + i} className="flex items-center gap-3 border p-2 rounded">
                                    <span className="font-medium text-gray-700 dark:text-gray-200">{doc.name}</span>
                                    <a href={process.env.NEXT_PUBLIC_IMAGE_URL + doc.url} target="_blank" rel="noopener noreferrer" className="ml-auto px-3 py-1 rounded bg-blue-600 text-white">View</a>
                                </div>
                            )) : <div className="text-center text-gray-500">No documents found.</div>}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}