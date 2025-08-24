import { SectionTitle, Subtitle } from '@/components/ui/Typography';
import Image from 'next/image';
import * as React from 'react';

interface PropertyTypeCardProps {
  title: string;
  propertyCount: string;
  imageUrl: string;
}

const PropertyTypeCard: React.FC<PropertyTypeCardProps> = ({ title, propertyCount, imageUrl }) => {
  return (
    <div className="group cursor-pointer bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 overflow-hidden min-h-72 relative">
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

const propertyTypes = [
  {
    title: 'Town Houses',
    propertyCount: '2,512 Properties',
    imageUrl: '/homePage/town.svg'
  },
  {
    title: 'Modern Villas',
    propertyCount: '1,824 Properties',
    imageUrl: '/homePage/modernVilla.svg'
  },
  {
    title: 'Apartment Buildings',
    propertyCount: '3,947 Properties',
    imageUrl: '/homePage/apartment.svg'
  },
  {
    title: 'Single Family',
    propertyCount: '4,158 Properties',
    imageUrl: '/homePage/family.svg'
  },
  {
    title: 'Office Buildings',
    propertyCount: '892 Properties',
    imageUrl: '/homePage/office.svg'
  },
];

const PropertyTypesSection: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
      </div>
    </section>
  );
};

export default PropertyTypesSection;
