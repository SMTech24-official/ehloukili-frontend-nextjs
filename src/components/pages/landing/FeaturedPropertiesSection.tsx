
"use client";

import * as React from 'react';
import FeaturedPropertyCard from '../../shared/FeaturedPropertyCard';
import { SectionTitle, Subtitle } from '@/components/ui/Typography';
import { useGetAllPropertiesQuery } from '@/redux/api/propertiesApi';
import Spinner from '@/components/ui/Spinner';

interface Property {
  id: number;
  street_address: string;
  city: string;
  property_type: string;
  listing_type: 'rent' | 'sale';
  bedrooms: number;
  bathrooms: number;
  unit_area: number;
  price: number;
  photos: { url: string }[];
}

interface FeaturedProperty {
  id: string;
  title: string;
  address: string;
  price: string;
  badge: 'For Sale' | 'For Rent';
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  imageUrl: string;
}

const fallbackProperties: FeaturedProperty[] = [
  {
    id: '1',
    title: 'Dream Pool Apartment',
    address: '1032 Sycamore St',
    price: '$280,000',
    badge: 'For Sale',
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1200,
    imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
  },
  {
    id: '2',
    title: 'North Strand House',
    address: '42 Silver Maple Drive',
    price: '$290,000',
    badge: 'For Rent',
    bedrooms: 4,
    bathrooms: 3,
    sqft: 1600,
    imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
  },
  {
    id: '3',
    title: 'Eden Garth Penthouse',
    address: '1421 San Pedro St',
    price: '$180,000',
    badge: 'For Sale',
    bedrooms: 2,
    bathrooms: 2,
    sqft: 900,
    imageUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
  },
  {
    id: '4',
    title: 'Luxury Beach Villa',
    address: '889 Ocean Drive',
    price: '$750,000',
    badge: 'For Sale',
    bedrooms: 5,
    bathrooms: 4,
    sqft: 2800,
    imageUrl: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
  }
];

const FeaturedPropertiesSection: React.FC = () => {
  const { data: propertiesData, isLoading: propertiesLoading, error: propertiesError } = useGetAllPropertiesQuery({ isHomePageView: true, per_page: 100000 });

  // Map API data to FeaturedPropertyCard props
  const properties: FeaturedProperty[] = propertiesError || !propertiesData?.data
    ? fallbackProperties
    : propertiesData.data.slice(0, 4).map((property: Property) => ({
        id: property.id.toString(),
        title: property.property_type.charAt(0).toUpperCase() + property.property_type.slice(1),
        address: `${property.street_address}, ${property.city}`,
        price: property.listing_type === 'rent' ? `$${property.price.toLocaleString()}/mo` : `$${property.price.toLocaleString()}`,
        badge: property.listing_type === 'rent' ? 'For Rent' : 'For Sale',
        bedrooms: property.bedrooms,
        bathrooms: property.bathrooms,
        sqft: property.unit_area,
        imageUrl: property.photos?.[0]?.url
          ? `${process.env.NEXT_PUBLIC_IMAGE_URL}${property.photos[0].url}`
          : 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      }));

  return (
    <section className="py-20 bg-gray-50">
      <div className="">
        <div className="text-center mb-12">
          <SectionTitle>
            Discover Our Best Deals
          </SectionTitle>
          <Subtitle>
            Unlock exclusive offers on premium properties, with unbeatable prices and exceptional value that goes above home value.
          </Subtitle>
        </div>

        {propertiesLoading ? (
          <div className="flex justify-center items-center h-64">
            <Spinner color='black'/>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 overflow-x-auto pb-4 scrollbar-hide">
            {properties.slice(0, 4).map((property) => (
              <FeaturedPropertyCard key={property.id} {...property} />
            ))}
          </div>
        )}

        {/* <div className="text-center mt-8">
            <Button asChild size="sm" color='outline'>
                <Link href="/auth/signup">View More</Link>
            </Button>
        </div> */}
      </div>
    </section>
  );
};

export default FeaturedPropertiesSection;