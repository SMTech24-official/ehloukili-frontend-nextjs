'use client';

import * as React from 'react';
import { Search, Map, SearchCode } from 'lucide-react';
import Button from '@/components/ui/Button';
import Select from '@/components/ui/Select';
import Image from 'next/image';

export interface SearchFilters {
    location: string;
    priceRange: string;
    propertyType: string;
    rooms: string;
    status: string;
}

interface SaleSearchSectionProps {
    activeTab: 'sale' | 'rent';
    onTabChange: (tab: 'sale' | 'rent') => void;
    filters: SearchFilters;
    onFiltersChange: (filters: SearchFilters) => void;
    onSearch: () => void;
}

const searchTabs = [
    { label: 'Sale', value: 'sale' as const },
    { label: 'Rent', value: 'rent' as const },
];

const SaleSearchSection: React.FC<SaleSearchSectionProps> = ({
    activeTab,
    onTabChange,
    filters,
    onFiltersChange,
    onSearch,
}) => {

    return (
        <section className="bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                {/* Search Tabs */}
                <div className="flex justify-center mb-6">
                    <div className="flex gap-1 p-1 bg-gray-100 rounded-lg">
                        {searchTabs.map((tab) => (
                            <button
                                key={tab.value}
                                onClick={() => onTabChange(tab.value)}
                                className={`px-8 py-0.5 rounded-md font-medium text-sm transition-all min-w-[100px] ${activeTab === tab.value
                                    ? 'bg-white text-[var(--color-secondary-600)] shadow-sm'
                                    : 'text-[var(--color-neutral-600)] hover:text-[var(--color-neutral-900)]'
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Filter Bar */}
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7 gap-4 items-end">
                        {/* Location */}
                        <div>
                            <label className="block text-sm font-medium text-[var(--color-neutral-700)] mb-2">
                                Location
                            </label>
                            <Select
                                value={filters.location}
                                onChange={(value: string) => onFiltersChange({ ...filters, location: value })}
                                options={[
                                    { value: 'any-location', label: 'Any Location' },
                                    { value: 'brooklyn', label: 'Brooklyn' },
                                    { value: 'manhattan', label: 'Manhattan' },
                                    { value: 'queens', label: 'Queens' },
                                    { value: 'bronx', label: 'Bronx' },
                                    { value: 'dhaka', label: 'Dhaka' },
                                    { value: 'chittagong', label: 'Chittagong' },
                                    { value: 'sylhet', label: 'Sylhet' },
                                ]}
                                placeholder="Any Location"
                                className="w-full"
                            />
                        </div>

                        {/* Price */}
                        <div>
                            <label className="block text-sm font-medium text-[var(--color-neutral-700)] mb-2">
                                Price
                            </label>
                            <Select
                                value={filters.priceRange}
                                onChange={(value: string) => onFiltersChange({ ...filters, priceRange: value })}
                                options={
                                    activeTab === 'sale'
                                        ? [
                                            { value: 'any-price', label: 'Any Price' },
                                            { value: '0-300000', label: 'Under $300K' },
                                            { value: '300000-500000', label: '$300K - $500K' },
                                            { value: '500000-1000000', label: '$500K - $1M' },
                                            { value: '1000000+', label: 'Above $1M' },
                                        ]
                                        : [
                                            { value: 'any-price', label: 'Any Price' },
                                            { value: '0-1000', label: 'Under $1,000/mo' },
                                            { value: '1000-2000', label: '$1,000 - $2,000/mo' },
                                            { value: '2000-3000', label: '$2,000 - $3,000/mo' },
                                            { value: '3000+', label: 'Above $3,000/mo' },
                                        ]
                                }
                                placeholder="Any Price"
                                className="w-full"
                            />
                        </div>

                        {/* Property Type */}
                        <div>
                            <label className="block text-sm font-medium text-[var(--color-neutral-700)] mb-2">
                                Property Type
                            </label>
                            <Select
                                value={filters.propertyType}
                                onChange={(value: string) => onFiltersChange({ ...filters, propertyType: value })}
                                options={[
                                    { value: 'any-type', label: 'Home' },
                                    { value: 'house', label: 'House' },
                                    { value: 'apartment', label: 'Apartment' },
                                    { value: 'condo', label: 'Condo' },
                                    { value: 'townhouse', label: 'Townhouse' },
                                    { value: 'villa', label: 'Villa' },
                                ]}
                                placeholder="Home"
                                className="w-full"
                            />
                        </div>

                        {/* Number of Rooms */}
                        <div>
                            <label className="block text-sm font-medium text-[var(--color-neutral-700)] mb-2">
                                Number Of Room
                            </label>
                            <Select
                                value={filters.rooms}
                                onChange={(value: string) => onFiltersChange({ ...filters, rooms: value })}
                                options={[
                                    { value: 'any-rooms', label: '3' },
                                    { value: '1', label: '1' },
                                    { value: '2', label: '2' },
                                    { value: '3', label: '3' },
                                    { value: '4', label: '4' },
                                    { value: '5+', label: '5+' },
                                ]}
                                placeholder="3"
                                className="w-full"
                            />
                        </div>

                        {/* Status */}
                        <div>
                            <label className="block text-sm font-medium text-[var(--color-neutral-700)] mb-2">
                                Status
                            </label>
                            <Select
                                value={filters.status}
                                onChange={(value: string) => onFiltersChange({ ...filters, status: value })}
                                options={
                                    activeTab === 'sale'
                                        ? [
                                            { value: 'any-status', label: 'New' },
                                            { value: 'new', label: 'New' },
                                            { value: 'pending', label: 'Pending' },
                                            { value: 'sold', label: 'Recently Sold' },
                                            { value: 'active', label: 'Active' },
                                        ]
                                        : [
                                            { value: 'any-status', label: 'Available' },
                                            { value: 'available', label: 'Available' },
                                            { value: 'pending', label: 'Application Pending' },
                                            { value: 'rented', label: 'Recently Rented' },
                                            { value: 'coming-soon', label: 'Coming Soon' },
                                        ]
                                }
                                placeholder={activeTab === 'sale' ? 'New' : 'Available'}
                                className="w-full"
                            />
                        </div>

                        {/* Search Buttons */}
                        <div className="flex gap-3 lg:col-span-1 col-span-1 sm:col-span-2 md:col-span-3">
                            <Button
                                color="primary"
                                className="flex-1 flex items-center justify-center !text-white gap-2 px-6 py-3"
                                onClick={onSearch}
                            >
                                Search
                            </Button>
                        </div>
                        <div className="text-[var(--color-secondary-600)] px-2 py-3 flex items-center gap-2 cursor-pointer">
                            <Image
                                src="/homePage/iconMapInhero.svg"
                                alt="Search"
                                width={20}
                                height={20}
                            />
                            <span className="inline">Search Map</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SaleSearchSection;
