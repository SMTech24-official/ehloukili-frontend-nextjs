import { Property } from '@/components/pages/sale/SalePropertiesGrid';
import FeaturedPropertyCard from '@/components/shared/FeaturedPropertyCard';
import React from 'react';


const Properties: Property[] = [
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


const SavedPropertiesPage = () => {
    return (
        <>
                 {/* Properties Grid */}
        {Properties.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
            {Properties.map((property) => (
              <FeaturedPropertyCard
                key={property.id}
                {...property}
              />
            ))}
          </div>
        )}
        </>
    );
};

export default SavedPropertiesPage;