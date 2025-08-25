

"use client";
import React, { useEffect, useState } from "react";
import { LucideDog, LucideWaves, LucideWifi, LucideParkingCircle, LucideUtensils, LucideBedDouble, LucideMapPin, LucideWarehouse, LucideInfo, LucidePhone, LucideUser } from "lucide-react";
import FeaturePill from "@/components/shared/FeaturePill";
import DetailsTabs, { IDetailsTab } from "@/components/shared/DetailsTabs";
import DetailsProfileHeader from "@/components/shared/DetailsProfileHeader";
import DetailsInfoItem from "@/components/shared/DetailsInfoItem";
import { useDashboard } from "@/providers/DashboardProvider";

const property = {
    imageUrl: "/images/Property.png",
    title: "Serenity at Whispering Pines Retreat",
    propertyId: "DL12653",
    address: "3891 Ranchview Dr. Richardson, California",
    postDate: "12 March 2025",
    status: "Booked",
    propertiesAdded: 2,
    bedrooms: 5,
    baths: 6,
    guests: 6,
    price: 400,
    features: [
        { icon: <LucideDog className="w-4 h-4 text-primary" />, label: "Pet-Friendly" },
        { icon: <LucideWaves className="w-4 h-4 text-primary" />, label: "Pool" },
        { icon: <LucideWifi className="w-4 h-4 text-primary" />, label: "WiFi" },
        { icon: <LucideParkingCircle className="w-4 h-4 text-primary" />, label: "Free Parking" },
        { icon: <LucideWarehouse className="w-4 h-4 text-primary" />, label: "Washer/Dryer" },
        { icon: <LucideUtensils className="w-4 h-4 text-primary" />, label: "Kitchen" },
        { icon: <LucideBedDouble className="w-4 h-4 text-primary" />, label: "Sleeps 3+ Guests" },
        { icon: <LucideMapPin className="w-4 h-4 text-primary" />, label: "Near Beach" },
    ],
    contact: {
        name: "Robert Allen",
        phone: "+1 555-123-4567",
        email: "robert.allen@email.com",
        address: "3891 Ranchview Dr. Richardson, California",
        city: "California",
        state: "California",
        zip_code: "12345"
    },
    tenants: {
        name: "Robert Allen",
        phone: "+1 555-123-4567",
        email: "robert.allen@email.com",
        address: "3891 Ranchview Dr. Richardson, California",
        city: "California",
        state: "California",
        zip_code: "12345"
    },
};

const tabContents = [
    // Properties Information
    (
        <div key="properties-info" className="flex flex-col md:flex-row gap-8">
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                <DetailsInfoItem label="Properties" value={property.title} />
                <DetailsInfoItem label="Post Date" value={property.postDate} />
                <DetailsInfoItem label="Properties ID" value={property.propertyId} />
                <DetailsInfoItem label="Status" value={property.status} />
                <DetailsInfoItem label="How many properties You already added" value={property.propertiesAdded} />
                <DetailsInfoItem label="Bedrooms" value={`${property.bedrooms} Bedrooms`} />
                <DetailsInfoItem label="Guest" value={`${property.guests} Guest`} />
                <DetailsInfoItem label="Baths" value={`${property.baths} Baths`} />
                <DetailsInfoItem label="Price" value={`$${property.price}`} />
            </div>
            <div className="flex flex-col gap-2 mt-6 md:mt-0 md:w-64">
                {property.features.map((feature) => (
                    <FeaturePill key={feature.label} icon={feature.icon} label={feature.label} />
                ))}
            </div>
        </div>
    ),
    // Contact Information
    (
        <div key="contact-info" className="flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <DetailsInfoItem label="Owner Name" value={property.contact.name} />
                <DetailsInfoItem label="Phone" value={property.contact.phone} />
                <DetailsInfoItem label="Email" value={property.contact.email} />
                <DetailsInfoItem label="Address" value={property.contact.address} />
                <DetailsInfoItem label="City" value={property.contact.city} />
                <DetailsInfoItem label="State" value={property.contact.state} />
                <DetailsInfoItem label="Zip Code" value={property.contact.zip_code} />
            </div>
        </div>
    ),
    // Tenants Information
    (
        <div key="tenants-info" className="flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <DetailsInfoItem label="Full Name" value={property.tenants.name} />
                <DetailsInfoItem label="Phone" value={property.tenants.phone} />
                <DetailsInfoItem label="Email" value={property.tenants.email} />
                <DetailsInfoItem label="Address" value={property.tenants.address} />
                <DetailsInfoItem label="City" value={property.tenants.city} />
                <DetailsInfoItem label="State" value={property.tenants.state} />
                <DetailsInfoItem label="Zip Code" value={property.tenants.zip_code} />
            </div>
        </div>
    ),
];


export default function AdminPropertyDetailsPage() {
    const [activeTab, setActiveTab] = useState(0);

    const { setPageTitle, setPageSubtitle } = useDashboard();

    useEffect(() => {
        setPageTitle('My Properties');
        setPageSubtitle('All Properties > Details');
    }, [setPageTitle, setPageSubtitle]);

    const tabs: IDetailsTab[] = [
        { label: "Properties Information", icon: <LucideInfo className="w-5 h-5" /> },
        { label: "Contact Information", icon: <LucidePhone className="w-5 h-5" /> },
        { label: "Tenants Information", icon: <LucideUser className="w-5 h-5" /> },
    ];

    return (
        <div className="w-full px-4 py-8 border border-gray-100 shadow rounded-xl">
            {/* Property Profile Header */}
            <DetailsProfileHeader
                imageUrl={'/homePage/modernVilla.svg'}
                title={property.title}
                id={property.propertyId}
                address={property.address}
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
}
