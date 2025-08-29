/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import SalePropertiesGrid from '@/components/pages/sale/SalePropertiesGrid';
import type { SearchFilters } from '@/components/pages/sale/SaleSearchSection';
import SaleSearchSection from '@/components/pages/sale/SaleSearchSection';
import React from 'react';

const PropertyPage = () => {
    const [activeTab, setActiveTab] = React.useState<'sale' | 'rent'>('sale');
    const [searchTrigger, setSearchTrigger] = React.useState(0);
    const [filters, setFilters] = React.useState<SearchFilters>({
        country: '',
        city: '',
        priceRange: 'any-price',
        propertyType: 'any-type',
        rooms: 'any-rooms',
        status: 'any-status',
    });
    const [filtersPreview, setFiltersPreview] = React.useState<SearchFilters>({
        city: '',
        country: '',
        priceRange: 'any-price',
        propertyType: 'any-type',
        rooms: 'any-rooms',
        status: 'any-status',
    });

    const handleTabChange = (tab: 'sale' | 'rent') => {
        setActiveTab(tab);
        // Reset filters when changing tabs
        setFilters({
            city: '',
            country: '',
            priceRange: 'any-price',
            propertyType: 'any-type',
            rooms: 'any-rooms',
            status: 'any-status',
        });
    };

    const handleFiltersChange = (newFilters: SearchFilters) => {
        setFiltersPreview(newFilters);
    };

    const handleSearch = () => {
        setFilters({
            city: filtersPreview.city,
            country: filtersPreview.country,
            priceRange: filtersPreview.priceRange,
            propertyType: filtersPreview.propertyType,
            rooms: filtersPreview.rooms,
            status: filtersPreview.status,
        });
        setFiltersPreview({
            city: '',
            country: '',
            priceRange: 'any-price',
            propertyType: 'any-type',
            rooms: 'any-rooms',
            status: 'any-status',
        });
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Search Section */}
            <SaleSearchSection
                activeTab={activeTab}
                onTabChange={handleTabChange}
                filters={filtersPreview}
                onFiltersChange={handleFiltersChange}
                onSearch={handleSearch}
            />

            {/* Properties Grid */}
            <SalePropertiesGrid
                activeTab={activeTab}
                filters={filters}
                searchTrigger={searchTrigger}
            />
        </div>
    );
};

export default PropertyPage;