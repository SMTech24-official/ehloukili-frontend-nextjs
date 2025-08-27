'use client';

import FeaturedPropertyCard from '@/components/shared/FeaturedPropertyCard';
import Button from '@/components/ui/Button';
import { Heading, Text } from '@/components/ui/Typography';
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

// Mock data for sale properties
const saleProperties: Property[] = [
  {
    id: '1',
    title: 'Skyper Pool Apartment',
    address: '1020 Bloomingdale Ave',
    price: '$350,000',
    badge: 'For Sale',
    bedrooms: 4,
    bathrooms: 2,
    sqft: 1400,
    imageUrl: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    location: 'brooklyn',
    priceValue: 350000,
    propertyType: 'apartment',
    status: 'new',
  },
  {
    id: '2',
    title: 'North Dillard Street',
    address: '4330 Bell Shoals Rd',
    price: '$280,000',
    badge: 'For Sale',
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1200,
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    location: 'manhattan',
    priceValue: 280000,
    propertyType: 'house',
    status: 'active',
  },
  {
    id: '3',
    title: 'Eaton Garth Penthouse',
    address: '7722 18th Ave, Brooklyn',
    price: '$950,000',
    badge: 'For Sale',
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1800,
    imageUrl: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    location: 'brooklyn',
    priceValue: 950000,
    propertyType: 'condo',
    status: 'pending',
  },
  {
    id: '4',
    title: 'Modern Downtown Loft',
    address: '234 Main Street',
    price: '$750,000',
    badge: 'For Sale',
    bedrooms: 1,
    bathrooms: 1,
    sqft: 900,
    imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    location: 'manhattan',
    priceValue: 750000,
    propertyType: 'apartment',
    status: 'new',
  },
  {
    id: '5',
    title: 'Luxury Beach Villa',
    address: '889 Ocean Drive',
    price: '$1,200,000',
    badge: 'For Sale',
    bedrooms: 5,
    bathrooms: 4,
    sqft: 3200,
    imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    location: 'queens',
    priceValue: 1200000,
    propertyType: 'villa',
    status: 'active',
  },
  {
    id: '6',
    title: 'Cozy Family Home',
    address: '456 Maple Avenue',
    price: '$425,000',
    badge: 'For Sale',
    bedrooms: 4,
    bathrooms: 3,
    sqft: 2000,
    imageUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    location: 'bronx',
    priceValue: 425000,
    propertyType: 'house',
    status: 'new',
  },
];

// Mock data for rent properties
const rentProperties: Property[] = [
  {
    id: 'r1',
    title: 'Luxury Studio Apartment',
    address: '123 Park Avenue',
    price: '$2,200/month',
    badge: 'For Rent',
    bedrooms: 1,
    bathrooms: 1,
    sqft: 700,
    imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    location: 'manhattan',
    priceValue: 2200,
    propertyType: 'apartment',
    status: 'available',
  },
  {
    id: 'r2',
    title: 'Spacious 2BR Flat',
    address: '789 Brooklyn Heights',
    price: '$3,500/month',
    badge: 'For Rent',
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1100,
    imageUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    location: 'brooklyn',
    priceValue: 3500,
    propertyType: 'apartment',
    status: 'pending',
  },
  {
    id: 'r3',
    title: 'Modern 3BR Condo',
    address: '321 Queens Boulevard',
    price: '$4,200/month',
    badge: 'For Rent',
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1400,
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    location: 'queens',
    priceValue: 4200,
    propertyType: 'condo',
    status: 'available',
  },
  {
    id: 'r4',
    title: 'Cozy 1BR with Balcony',
    address: '567 East Side Drive',
    price: '$1,800/month',
    badge: 'For Rent',
    bedrooms: 1,
    bathrooms: 1,
    sqft: 650,
    imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    location: 'manhattan',
    priceValue: 1800,
    propertyType: 'apartment',
    status: 'coming-soon',
  },
  {
    id: 'r5',
    title: 'Family Townhouse',
    address: '234 Suburban Lane',
    price: '$5,000/month',
    badge: 'For Rent',
    bedrooms: 4,
    bathrooms: 3,
    sqft: 2200,
    imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    location: 'bronx',
    priceValue: 5000,
    propertyType: 'townhouse',
    status: 'available',
  },
  {
    id: 'r6',
    title: 'Penthouse with City View',
    address: '890 High Street',
    price: '$8,500/month',
    badge: 'For Rent',
    bedrooms: 3,
    bathrooms: 3,
    sqft: 1900,
    imageUrl: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    location: 'manhattan',
    priceValue: 8500,
    propertyType: 'apartment',
    status: 'available',
  },
];

type SortOption = 'newest' | 'price-low' | 'price-high' | 'bedrooms' | 'size';

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
  const [isLoading, setIsLoading] = React.useState(false);
  const [sortBy, setSortBy] = React.useState<SortOption>('newest');
  const propertiesPerPage = 6;

  // Get properties based on active tab
  const allProperties = activeTab === 'sale' ? saleProperties : rentProperties;

  // Filter properties based on search filters
  const filteredProperties = React.useMemo(() => {
    return allProperties.filter((property) => {
      // Location filter
      if (filters.location !== 'any-location' && property.location !== filters.location) {
        return false;
      }

      // Property type filter
      if (filters.propertyType !== 'any-type' && property.propertyType !== filters.propertyType) {
        return false;
      }

      // Rooms filter
      if (filters.rooms !== 'any-rooms' && filters.rooms !== '5+') {
        if (property.bedrooms !== parseInt(filters.rooms)) {
          return false;
        }
      } else if (filters.rooms === '5+' && property.bedrooms < 5) {
        return false;
      }

      // Status filter
      if (filters.status !== 'any-status' && property.status !== filters.status) {
        return false;
      }

      // Price filter
      if (filters.priceRange !== 'any-price') {
        const [min, max] = filters.priceRange.split('-').map(v => parseInt(v.replace('+', '')));
        if (max) {
          if (property.priceValue < min || property.priceValue > max) {
            return false;
          }
        } else {
          if (property.priceValue < min) {
            return false;
          }
        }
      }

      return true;
    });
  }, [allProperties, filters]);

  // Sort properties
  const sortedProperties = React.useMemo(() => {
    const sorted = [...filteredProperties];

    switch (sortBy) {
      case 'price-low':
        return sorted.sort((a, b) => a.priceValue - b.priceValue);
      case 'price-high':
        return sorted.sort((a, b) => b.priceValue - a.priceValue);
      case 'bedrooms':
        return sorted.sort((a, b) => b.bedrooms - a.bedrooms);
      case 'size':
        return sorted.sort((a, b) => b.sqft - a.sqft);
      case 'newest':
      default:
        return sorted;
    }
  }, [filteredProperties, sortBy]);

  // Calculate pagination
  const totalPages = Math.ceil(sortedProperties.length / propertiesPerPage);
  const startIndex = (currentPage - 1) * propertiesPerPage;
  const endIndex = startIndex + propertiesPerPage;
  const currentProperties = sortedProperties.slice(0, endIndex);

  // Reset pagination when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [filters, searchTrigger, activeTab]);

  const loadMore = () => {
    if (currentPage < totalPages) {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        setCurrentPage(prev => prev + 1);
        setIsLoading(false);
      }, 1000);
    }
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
              Showing {currentProperties.length} of {sortedProperties.length} results
            </Text>
          </div>

          {/* Sort & View Options */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Text size="sm" color="muted">Sort by:</Text>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)] focus:border-transparent bg-white"
              >
                <option value="newest">Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="bedrooms">Most Bedrooms</option>
                <option value="size">Largest Size</option>
              </select>
            </div>

            {/* View Toggle - Grid/List (for future enhancement) */}
            <div className="hidden sm:flex items-center gap-1 p-1 bg-gray-100 rounded-md">
              <button className="p-2 rounded bg-white shadow-sm">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button className="p-2 rounded text-gray-400">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* No Results Message */}
        {sortedProperties.length === 0 && (
          <div className="text-center py-12">
            <div className="mb-4">
              <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h4M9 7h6m-6 4h6m-6 4h6" />
              </svg>
            </div>
            <Heading level={4} className="mb-2">No properties found</Heading>
            <Text color="muted">
              Try adjusting your search filters to find more properties.
            </Text>
          </div>
        )}

        {/* Properties Grid */}
        {sortedProperties.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {currentProperties.map((property) => (
              <FeaturedPropertyCard
                key={property.id}
                {...property}
              />
            ))}
          </div>
        )}

        {/* Load More / Pagination */}
        {sortedProperties.length > 0 && currentPage < totalPages && (
          <div className="text-center">
            <Button
              color="outline"
              size="lg"
              onClick={loadMore}
              disabled={isLoading}
              className="min-w-[150px]"
            >
              {isLoading ? 'Loading...' : 'Load More Properties'}
            </Button>
          </div>
        )}

        {/* Results Summary */}
        {sortedProperties.length > 0 && currentPage >= totalPages && (
          <div className="text-center py-8">
            <Text color="muted">
              You&apos;ve viewed all {sortedProperties.length} available properties
            </Text>
          </div>
        )}
      </div>
    </section>
  );
};

export default SalePropertiesGrid;
