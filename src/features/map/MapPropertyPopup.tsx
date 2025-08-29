/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';

import { Text } from '@/components/ui/Typography';
import Image from 'next/image';


interface MapPropertyPopupProps {
  property: any;
  small?: boolean;
}

const MapPropertyPopup: React.FC<MapPropertyPopupProps> = ({ property, small }) => {
  if (!small) {
    // fallback to full card if needed
    return (
      <div style={{ minWidth: 300, maxWidth: 320 }}>
        <div className="p-2">
          <strong>{property.title}</strong>
          <div>{property.address}</div>
          <div>{property.price}</div>
        </div>
      </div>
    );
  }
  return (
    <div
      className="bg-white rounded-lg shadow border border-gray-200 w-full p-4"
    // style={{ minWidth: 140, maxWidth: 180, padding: 8 }}
    >
      <div className="relative w-full h-20 rounded overflow-hidden mb-2">
        <Image
          src={property.imageUrl}
          alt={property.title}
          fill
          className="object-cover rounded"
          style={{ minHeight: 60, maxHeight: 80 }}
        />
        <span className={`absolute top-1 left-1 px-2 py-0.5 rounded text-[10px] font-semibold ${property.badge === 'For Sale' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>{property.badge}</span>
      </div>
      <div className="mb-1">
        <Text size="xs" weight="bold" className="truncate">{property.title}</Text>
        <Text size="xs" color="muted" className="truncate">{property.address}</Text>
      </div>
      <div className="flex items-center gap-2 mb-1">
        <Text size="xs">{property.bedrooms}🛏</Text>
        <Text size="xs">{property.bathrooms}🛁</Text>
        <Text size="xs">{property.sqft} sqft</Text>
      </div>
      <Text size="sm" weight="bold" color="secondary">{property.price}</Text>
    </div>
  );
};

export default MapPropertyPopup;
