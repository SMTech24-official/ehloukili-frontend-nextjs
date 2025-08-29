/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import LocationSearchInput from '@/components/ui/LocationSearchInput';
import Select from '@/components/ui/Select';
import MapPropertyPopup from '@/features/map/MapPropertyPopup';
import { useGroupedProperties } from '@/features/map/useGroupedProperties';
import dynamic from 'next/dynamic';
import * as React from 'react';

const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });

import { useGetAllPropertiesQuery } from '@/redux/api/propertiesApi';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { ArrowBigLeft, ArrowBigRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

// Fix default marker icon for leaflet in Next.js
if (typeof window !== 'undefined' && L && L.Icon.Default) {
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  });
}

const types = [
  { value: 'sale', label: 'Sale' },
  { value: 'rent', label: 'Rent' },
];

const MapView: React.FC = () => {
  const [type, setType] = React.useState<'rent' | 'sale'>('rent');
  const [center, setCenter] = React.useState<[number, number]>([34.0522, -118.2437]); // default LA

  const router = useRouter();

  const apiFilters = {
    listing_type: type,
    isActive: true,
  };

  const { data, isLoading, isError } = useGetAllPropertiesQuery(apiFilters);

  const properties = React.useMemo(() => {
    if (!data?.data) return [];
    return data.data
      .filter((p: any) => p.latitude && p.longitude)
      .map((p: any) => ({
        id: p.id,
        title: `${p.property_type} in ${p.city}`,
        address: `${p.street_address}, ${p.city}`,
        price: `$${p.price}`,
        badge: p.listing_type === 'rent' ? 'For Rent' : 'For Sale',
        bedrooms: p.bedrooms,
        bathrooms: p.bathrooms,
        sqft: p.unit_area,
        imageUrl: p.photos?.[0]?.url
          ? `${process.env.NEXT_PUBLIC_IMAGE_URL}${p.photos[0].url}`
          : '/placeholder.png',
        location: p.city,
        lat: Number(p.latitude),
        lng: Number(p.longitude),
      }));
  }, [data]);

  const grouped = useGroupedProperties(properties);
  const markerKeys = Object.keys(grouped);

  const circleIcon = L.divIcon({
    className: '',
    html: `<div style="width:32px;height:32px;background:var(--color-primary-600);border-radius:50%;box-shadow:0 2px 8px #0002;display:flex;align-items:center;justify-content:center;border:3px solid #fff;"></div>`
  });

  const [openPopupKey, setOpenPopupKey] = React.useState<string | null>(null);
  const [popupIndices, setPopupIndices] = React.useState<Record<string, number>>({});
  const markerRefs = React.useRef<Record<string, any>>({});

  const handleMarkerClick = (key: string) => {
    setPopupIndices(idx => ({ ...idx, [key]: 0 }));
    setOpenPopupKey(key);
    setTimeout(() => {
      const ref = markerRefs.current[key];
      if (ref && ref.openPopup) ref.openPopup();
    }, 0);
  };

  const handlePrev = React.useCallback((e: React.MouseEvent, key: string, groupLen: number) => {
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();

    setPopupIndices(idx => ({
      ...idx,
      [key]: ((idx[key] ?? 0) - 1 + groupLen) % groupLen
    }));

    // Keep the popup open
    setTimeout(() => {
      const ref = markerRefs.current[key];
      if (ref && ref.isPopupOpen && !ref.isPopupOpen()) {
        ref.openPopup();
      }
    }, 10);
  }, []);

  const handleNext = React.useCallback((e: React.MouseEvent, key: string, groupLen: number) => {
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();

    setPopupIndices(idx => ({
      ...idx,
      [key]: ((idx[key] ?? 0) + 1) % groupLen
    }));

    // Keep the popup open
    setTimeout(() => {
      const ref = markerRefs.current[key];
      if (ref && ref.isPopupOpen && !ref.isPopupOpen()) {
        ref.openPopup();
      }
    }, 10);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-30">
      {/* Filter Bar */}
      <div className="md:flex items-center bg-white rounded-lg p-2 gap-2 relative z-40 border border-gray-200 flex-wrap">
        <div className='md:w-32 w-full border border-gray-100 md:border-0'>
          <Select
            value={type}
            onChange={(val: any) => setType(val)}
            options={types}
            className="border-none shrink-0 grow-0"
          />
        </div>
        <div className="h-6 border-l border-gray-300 hidden md:block" />
        <div className="flex-1 border border-gray-100 md:border-0">
          <LocationSearchInput
            onLocationSelect={(loc) => {
              if (loc?.lat && loc?.lon) {
                setCenter([parseFloat(loc.lat), parseFloat(loc.lon)]);
              }
            }}
          />
        </div>
        <p
          onClick={() => router.push('/property')}
          className="ml-auto flex-shrink-0 text-secondary-500 cursor-pointer hidden md:block">
          Property List
        </p>
      </div>

      {/* Map */}
      <div className="rounded-2xl overflow-hidden bg-white relative z-20 pt-20" style={{ height: 800, marginTop: '-2rem' }}>
        <MapContainer center={center} zoom={12} style={{ height: '100%', width: '100%' }} scrollWheelZoom={true}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; OpenStreetMap contributors'
          />

          {!isLoading && !isError && markerKeys.map((key) => {
            const group = grouped[key];
            const [lat, lng] = key.split(',').map(Number);
            const markerId = `${lat},${lng}`;
            const popupIdx = popupIndices[key] ?? 0;
            return (
              <Marker
                key={markerId}
                position={[lat, lng]}
                icon={circleIcon}
                eventHandlers={{ click: () => handleMarkerClick(key) }}
                ref={ref => { markerRefs.current[key] = ref; }}
              >
                <Popup
                  position={[lat, lng]}
                  autoPan={true}
                  autoClose={false}
                  closeOnClick={false}
                  closeOnEscapeKey={true}
                  eventHandlers={{
                    popupclose: () => setOpenPopupKey(null),
                    popupopen: () => setOpenPopupKey(key)
                  }}
                >
                  <div style={{ minWidth: 180, maxWidth: 200 }}>
                    {group.length > 1 && (
                      <div className="flex justify-between items-center mb-2" style={{ userSelect: 'none' }}>
                        <button
                          type="button"
                          aria-label="Previous property"
                          onClick={(e) => handlePrev(e, key, group.length)}
                          onMouseDown={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                          }}
                          style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            padding: '4px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: '4px'
                          }}
                          className="hover:bg-gray-100"
                        >
                          <ArrowBigLeft size={18} />
                        </button>
                        <span className="text-xs text-gray-500">
                          {popupIdx + 1} of {group.length}
                        </span>
                        <button
                          type="button"
                          aria-label="Next property"
                          onClick={(e) => handleNext(e, key, group.length)}
                          onMouseDown={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                          }}
                          style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            padding: '4px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: '4px'
                          }}
                          className="hover:bg-gray-100"
                        >
                          <ArrowBigRight size={18} />
                        </button>
                      </div>
                    )}
                    <div onClick={(e) => e.stopPropagation()}>
                      <MapPropertyPopup property={group[popupIdx]} small />
                    </div>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>
    </div>
  );
};

export default MapView;