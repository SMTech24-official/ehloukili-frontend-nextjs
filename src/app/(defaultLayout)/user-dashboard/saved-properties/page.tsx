/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React from 'react';
import FeaturedPropertyCard from '@/components/shared/FeaturedPropertyCard';
import { Text } from '@/components/ui/Typography';
import Spinner from '@/components/ui/Spinner';
import { useGetSavedPropertiesQuery } from '@/redux/api/propertiesApi';

const SavedPropertiesPage = () => {
  const { data, isLoading, error } = useGetSavedPropertiesQuery(undefined);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 flex items-center justify-center h-screen">
        <Text>Loading saved properties...</Text>
        <Spinner size={20} color="black" />
      </div>
    );
  }

  if (error) {
    let errorMessage = 'An error occurred while loading saved properties.';
    if ('message' in error && typeof error.message === 'string') {
      errorMessage = error.message;
    } else if ('status' in error && typeof error.status === 'number') {
      errorMessage = `Error code: ${error.status}`;
    }
    return (
      <div className="container mx-auto px-4 py-8 flex items-center justify-center h-screen">
        <Text color="error">{errorMessage}</Text>
      </div>
    );
  }

  const properties = data?.data || [];

  return (
    <div className="container mx-auto px-4 py-8">
      {properties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
          {properties.map((property: any) => (
            <FeaturedPropertyCard
              key={property.id}
              id={property.id.toString()}
              title={`${property.street_address}, ${property.city}`}
              address={`${property.city}, ${property.country}`}
              price={`$${property.price}${property.listing_type === 'sale' ? '' : '/month'}`}
              badge={property.listing_type === 'sale' ? 'For Sale' : 'For Rent'}
              bedrooms={property.bedrooms}
              bathrooms={property.bathrooms}
              sqft={property.unit_area}
              imageUrl={
                property.photos?.[0]?.url
                  ? `${process.env.NEXT_PUBLIC_IMAGE_URL}${property.photos[0].url}`
                  : '/placeholder-image.jpg'
              }
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <Text color="secondary">No saved properties found.</Text>
        </div>
      )}
    </div>
  );
};

export default SavedPropertiesPage;