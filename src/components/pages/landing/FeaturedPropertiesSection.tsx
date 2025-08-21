import * as React from 'react';
import Button from '../../ui/Button';
import Link from 'next/link';
import FeaturedPropertyCard from '../../shared/FeaturedPropertyCard';
import { SectionTitle, Subtitle } from '@/components/ui/Typography';




const featuredProperties = [
    {
        id: '1',
        title: 'Dream Pool Apartment',
        address: '1032 Sycamore St',
        price: '$280,000',
        badge: 'For Sale' as const,
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
        badge: 'For Rent' as const,
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
        badge: 'For Sale' as const,
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
        badge: 'For Sale' as const,
        bedrooms: 5,
        bathrooms: 4,
        sqft: 2800,
        imageUrl: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    },
    {
        id: '5',
        title: 'Modern Downtown Loft',
        address: '234 Main Street',
        price: '$2,500/mo',
        badge: 'For Rent' as const,
        bedrooms: 1,
        bathrooms: 1,
        sqft: 800,
        imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    },
];

const FeaturedPropertiesSection: React.FC = () => {
    return (
        <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <SectionTitle>
                        Discover Our Best Deals
                    </SectionTitle>
                    <Subtitle>
                        Unlock exclusive offers on premium properties, with unbeatable prices and exceptional value that goes above home value.
                    </Subtitle>
                </div>

                <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
                    {featuredProperties.map((property) => (
                        <FeaturedPropertyCard key={property.id} {...property} />
                    ))}
                </div>

                <div className="text-center mt-8">
                    <Button asChild size="sm" color='outline'>
                        <Link href="/auth/signup">View More</Link>
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default FeaturedPropertiesSection;
