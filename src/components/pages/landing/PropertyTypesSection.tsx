
"use client";

import { SectionTitle, Subtitle } from '@/components/ui/Typography';
import Image from 'next/image';
import * as React from 'react';
import { useGetPropertyTypeCountsQuery } from '@/redux/api/adminApi';
import { useRouter } from 'next/navigation';

interface PropertyTypeCardProps {
  title: string;
  propertyCount: string;
  imageUrl: string;
}

const PropertyTypeCard: React.FC<PropertyTypeCardProps> = ({ title, propertyCount, imageUrl }) => {
  const router = useRouter();
  return (
    <div onClick={() => router.push(`/property`)} className="group cursor-pointer bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 overflow-hidden min-h-72 relative">
      <div className="relative h-72 overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-5 absolute top-0 left-0">
        <h3 className="text-lg font-semibold text-[var(--color-neutral-900)] mb-1">{title}</h3>
        <p className="text-sm font-medium text-[var(--color-neutral-700)]">{propertyCount}</p>
      </div>
    </div>
  );
};

interface PropertyType {
  title: string;
  propertyCount: string;
  imageUrl: string;
}


const PropertyTypesSection: React.FC = () => {
  const { data, isLoading, error } = useGetPropertyTypeCountsQuery(undefined);

  // Demo data to show during loading or error states, or to fill in missing types
  const demoPropertyTypes: PropertyType[] = [
    { title: 'Town Houses', propertyCount: '0 Properties', imageUrl: '/homePage/town.svg' },
    { title: 'Modern Villas', propertyCount: '0 Properties', imageUrl: '/homePage/modernVilla.svg' },
    { title: 'Apartment Buildings', propertyCount: '0 Properties', imageUrl: '/homePage/apartment.svg' },
    { title: 'Single Family', propertyCount: '0 Properties', imageUrl: '/homePage/family.svg' },
    { title: 'Office Buildings', propertyCount: '0 Properties', imageUrl: '/homePage/office.svg' },
  ];

  // Mapping of API property types to demo data titles for accurate image matching
  const typeMapping: { [key: string]: string } = {
    townhouse: 'Town Houses',
    condo: 'Apartment Buildings',
    villa: 'Modern Villas',
    singlefamily: 'Single Family',
    office: 'Office Buildings',
  };

  // Map API data to property types, ensuring all five demo types are included
  const propertyTypes: PropertyType[] = isLoading || error || !data?.success
    ? demoPropertyTypes
    : demoPropertyTypes.map((demo) => {
        // Find the API type that matches the demo title
        const apiType = Object.keys(typeMapping).find((key) => typeMapping[key] === demo.title);
        const count = apiType && data.counts[apiType] !== undefined ? data.counts[apiType] : parseInt(demo.propertyCount.replace(/[^0-9]/g, '')) || 0;
        return {
          title: demo.title,
          propertyCount: `${count.toLocaleString()} Properties`,
          imageUrl: demo.imageUrl,
        };
      });

  return (
    <section className="py-20 bg-white">
      <div className="text-center mb-12">
        <SectionTitle>
          Find the Property Type That Fits You
        </SectionTitle>
        <Subtitle>
          Whether it&apos;s a house, apartment, villa, or commercial space - Choose the best property type based on your needs. Explore the perfect place with us.
        </Subtitle>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {propertyTypes.map((property, index) => (
          <PropertyTypeCard
            key={index}
            title={property.title}
            propertyCount={property.propertyCount}
            imageUrl={property.imageUrl}
          />
        ))}
      </div>
    </section>
  );
};

export default PropertyTypesSection;