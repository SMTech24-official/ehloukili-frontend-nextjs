/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import FeaturedPropertyCard from '@/components/shared/FeaturedPropertyCard';
import { PropertyListItem } from '@/components/shared/PropertyListItem';
import Button from '@/components/ui/Button';
import { Heading, Text } from '@/components/ui/Typography';
import { useGetAllPropertiesQuery } from '@/redux/api/propertiesApi';
import * as React from 'react';
import { SearchFilters } from './SaleSearchSection';

export interface Property {
  id: string;
  title: string;
  address: string;
  price: string;
  badge: 'For Sale' | 'For Rent';
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  imageUrl: string;
  location: string;
  priceValue: number;
  propertyType: string;
  status: string;
}

interface PropertyFilters {
  city?: string;
  country?: string;
  property_type?: string;
  property_status?: string;
  isHomePageView?: boolean;
  listing_type?: 'rent' | 'sale';
  isActive?: boolean;
  min_price?: number;
  max_price?: number;
  bedrooms?: number;
  bathrooms?: number;
  per_page?: number;
  page?: number;
  sort?: string;
}

type SortOption = 'newest' | 'price-low' | 'price-high' | 'bedrooms' | 'size';

const mapSortOptionToApi = (sort: SortOption): string => {
  switch (sort) {
    case 'price-low': return 'price:asc';
    case 'price-high': return 'price:desc';
    case 'bedrooms': return 'bedrooms:desc';
    case 'size': return 'unit_area:desc';
    case 'newest': return 'created_at:desc';
    default: return 'created_at:desc';
  }
};


interface SalePropertiesGridProps {
  activeTab: 'sale' | 'rent';
  filters: SearchFilters;
  searchTrigger: number;
}

const SalePropertiesGrid: React.FC<SalePropertiesGridProps> = ({
  activeTab,
  filters,
  searchTrigger,
}) => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [sortBy, setSortBy] = React.useState<SortOption>('newest');
  const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('grid');
  const propertiesPerPage = 12;

  // Map SearchFilters to PropertyFilters
  const apiFilters: PropertyFilters = React.useMemo(() => ({
    city: filters.city !== '' ? filters.city : undefined,
    country: filters.country !== '' ? filters.country : undefined,
    property_type: filters.propertyType !== 'any-type' ? filters.propertyType : undefined,
    property_status: filters.status !== 'any-status' ? filters.status : undefined,
    listing_type: activeTab,
    isActive: true, // Always true as per requirement
    bedrooms: filters.rooms !== 'any-rooms' ? (filters.rooms === '5+' ? 5 : parseInt(filters.rooms)) : undefined,
    min_price: filters.priceRange !== 'any-price' ? parseInt(filters.priceRange.split('-')[0].replace('+', '')) : undefined,
    max_price: filters.priceRange !== 'any-price' ? (filters.priceRange.includes('+') ? undefined : parseInt(filters.priceRange.split('-')[1])) : undefined,
    per_page: propertiesPerPage,
    page: currentPage,
    sort: mapSortOptionToApi(sortBy),
  }), [filters, activeTab, currentPage, sortBy]);

  // API integration
  const { data, isLoading, isError, error } = useGetAllPropertiesQuery(apiFilters);

  // Extract data and pagination metadata
  const properties: Property[] = React.useMemo(() => {
    return (data?.data || []).map((item: any) => ({
      id: item.id.toString(),
      title: `${item.property_type} - ${item.street_address}`,
      address: `${item.street_address} ${item.city} ${item.state}`,
      price: activeTab === 'sale' ? `$${item.price.toLocaleString()}` : `$${item.price.toLocaleString()}/month`,
      badge: activeTab === 'sale' ? 'For Sale' : 'For Rent',
      bedrooms: item.bedrooms,
      bathrooms: item.bathrooms,
      sqft: item.unit_area,
      imageUrl: item.photos?.[0]?.url ? `${process.env.NEXT_PUBLIC_IMAGE_URL}${item.photos[0].url}` : '/placeholder.svg',
      location: item.city,
      priceValue: item.price,
      propertyType: item.property_type,
      status: item.status,
    }));
  }, [data, activeTab]);

  const meta = data?.meta || { current_page: 1, last_page: 1, per_page: propertiesPerPage, total: 0, from: 0, to: 0 };
  const { current_page, last_page, total, from, to } = meta;

  // Reset pagination on filter or tab change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [filters, searchTrigger, activeTab]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePrev = () => {
    if (current_page > 1) setCurrentPage(current_page - 1);
  };

  const handleNext = () => {
    if (current_page < last_page) setCurrentPage(current_page + 1);
  };

  return (
    <section className="py-8">
      <div className="container max-w-7xl min-[100rem]:max-w-[96rem] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Results Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <Heading level={3} className="mb-1">
              Properties for {activeTab === 'sale' ? 'Sale' : 'Rent'}
            </Heading>
            <Text color="muted" size="sm">
              Showing {from} to {to} of {total} results
            </Text>
          </div>

          {/* Sort & View Options */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Text size="sm" color="muted">Sort by:</Text>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)] focus:border-transparent bg-white dark:bg-[var(--color-neutral-800)]"
              >
                <option value="newest">Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="bedrooms">Most Bedrooms</option>
                <option value="size">Largest Size</option>
              </select>
            </div>

            {/* View Toggle - Grid/List */}
            <div className="flex items-center gap-1 p-1 bg-gray-100 rounded-md">
              <button
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white shadow-sm' : 'text-gray-400'}`}
                onClick={() => setViewMode('grid')}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-white shadow-sm' : 'text-gray-400'}`}
                onClick={() => setViewMode('list')}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {/* Loading make more professional production grade */}
        {isLoading && (
          <div className="text-center py-12">
            <div className="animate-spin w-10 h-10 mx-auto border-4 border-t-transparent border-teal-500 rounded-full"></div>
          </div>
        )}

        {/* Error State */}
        {isError && (
          <div className="text-center py-12">
            <svg className="w-16 h-16 mx-auto text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <Heading level={4} className="mb-2">Failed to load properties</Heading>
            <Text color="muted">
              {error && 'message' in error && typeof error.message === 'string' ? error.message : 'Please try again later.'}
            </Text>
          </div>
        )}

        {/* No Results Message */}
        {!isLoading && !isError && properties.length === 0 && (
          <div className="text-center py-12">
            <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h4M9 7h6m-6 4h6m-6 4h6" />
            </svg>
            <Heading level={4} className="mb-2">No properties found</Heading>
            <Text color="muted">
              Try adjusting your search filters to find more properties.
            </Text>
          </div>
        )}

        {/* Properties Display */}
        {!isLoading && !isError && properties.length > 0 && (
          <div className={`mb-8 ${viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 'space-y-4'}`}>
            {properties.map((property) => (
              viewMode === 'grid' ? (
                <FeaturedPropertyCard key={property.id} {...property} />
              ) : (
                <PropertyListItem key={property.id} {...property} />
              )
            ))}
          </div>
        )}

        {/* Pagination */}
        {!isLoading && !isError && properties.length > 0 && last_page > 1 && (
          <div className="flex justify-between items-center gap-2 mt-4">
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Showing {from} to {to} of {total} properties
            </div>
            <div className="flex items-center gap-2">
              <Button color="ghost" onClick={handlePrev} disabled={current_page === 1}>Previous</Button>
              {Array.from({ length: last_page }, (_, i) => i + 1).map((pageNum) => (
                <Button
                  key={pageNum}
                  color={pageNum === current_page ? 'primary' : 'ghost'}
                  onClick={() => handlePageChange(pageNum)}
                >
                  {pageNum}
                </Button>
              ))}
              <Button color="ghost" onClick={handleNext} disabled={current_page === last_page}>Next</Button>
            </div>
          </div>
        )}

        {/* Results Summary */}
        {!isLoading && !isError && properties.length > 0 && current_page >= last_page && (
          <div className="text-center py-8">
            <Text color="muted">
              You&apos;ve viewed all {total} available properties
            </Text>
          </div>
        )}
      </div>
    </section>
  );
};

export default SalePropertiesGrid;