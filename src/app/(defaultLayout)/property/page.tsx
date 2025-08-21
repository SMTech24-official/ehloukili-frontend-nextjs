'use client';

import React from 'react';
import type { SearchFilters } from '@/components/pages/sale/SaleSearchSection';
import SaleSearchSection from '@/components/pages/sale/SaleSearchSection';
import SalePropertiesGrid from '@/components/pages/sale/SalePropertiesGrid';

const PropertyPage = () => {
    const [activeTab, setActiveTab] = React.useState<'sale' | 'rent'>('sale');
    const [searchTrigger, setSearchTrigger] = React.useState(0);
    const [filters, setFilters] = React.useState<SearchFilters>({
        location: 'any-location',
        priceRange: 'any-price',
        propertyType: 'any-type',
        rooms: 'any-rooms',
        status: 'any-status',
    });

    const handleTabChange = (tab: 'sale' | 'rent') => {
        setActiveTab(tab);
        // Reset filters when changing tabs
        setFilters({
            location: 'any-location',
            priceRange: 'any-price',
            propertyType: 'any-type',
            rooms: 'any-rooms',
            status: 'any-status',
        });
    };

    const handleFiltersChange = (newFilters: SearchFilters) => {
        setFilters(newFilters);
    };

    const handleSearch = () => {
        // Trigger search by incrementing searchTrigger
        setSearchTrigger(prev => prev + 1);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Search Section */}
            <SaleSearchSection 
                activeTab={activeTab}
                onTabChange={handleTabChange}
                filters={filters}
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