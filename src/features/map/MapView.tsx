/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import * as React from 'react';
import dynamic from 'next/dynamic';
import { mockProperties } from '@/features/map/mockProperties';
import { useGroupedProperties } from '@/features/map/useGroupedProperties';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';



const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });

import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import MapPropertyPopup from '@/features/map/MapPropertyPopup';

// Fix default marker icon for leaflet in Next.js
if (typeof window !== 'undefined' && L && L.Icon.Default) {
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  });
}

const locations = [
  { value: 'los-angeles', label: 'Los Angeles' },
];

const types = [
  { value: 'sale', label: 'Sale' },
  { value: 'rent', label: 'Rent' },
];

const MapView: React.FC = () => {
  const [type, setType] = React.useState('rent');
  const [location, setLocation] = React.useState('los-angeles');



  const filtered = React.useMemo(() =>
    mockProperties.filter(
      p => p.location === location && (type === 'rent' ? p.badge === 'For Rent' : p.badge === 'For Sale')
    ),
    [location, type]
  );

  // Group properties by lat/lng
  const grouped = useGroupedProperties(filtered);
  const markerKeys = Object.keys(grouped);

  const center = React.useMemo(() => {
    if (markerKeys.length > 0) {
      const [lat, lng] = markerKeys[0].split(',').map(Number);
      return [lat, lng];
    }
    return [34.0522, -118.2437];
  }, [markerKeys]);


  // Custom circle marker icon
  const circleIcon = L.divIcon({
    className: '',
    html: `<div style="width:32px;height:32px;background:var(--color-primary-600);border-radius:50%;box-shadow:0 2px 8px #0002;display:flex;align-items:center;justify-content:center;border:3px solid #fff;"></div>`
  });

  // Popup open state and index for each marker
  const [openPopupKey, setOpenPopupKey] = React.useState<string | null>(null);
  const [popupIndices, setPopupIndices] = React.useState<Record<string, number>>({});
  const markerRefs = React.useRef<Record<string, any>>({});

  // Open popup and set index to 0 when marker is clicked
  const handleMarkerClick = (key: string) => {
    setPopupIndices(idx => ({ ...idx, [key]: 0 }));
    setOpenPopupKey(key);
    setTimeout(() => {
      const ref = markerRefs.current[key];
      if (ref && ref.openPopup) ref.openPopup();
    }, 0);
  };

  // Navigate prev/next property in popup, keep popup open
  const handlePrev = (key: string, groupLen: number) => {
    setPopupIndices(idx => ({
      ...idx,
      [key]: ((idx[key] ?? 0) - 1 + groupLen) % groupLen
    }));
    setOpenPopupKey(key);
  };
  const handleNext = (key: string, groupLen: number) => {
    setPopupIndices(idx => ({
      ...idx,
      [key]: ((idx[key] ?? 0) + 1) % groupLen
    }));
    setOpenPopupKey(key);
  };



  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Filter Bar */}
      <div className="flex flex-wrap gap-3 mb-6 items-center">
        <Select
          value={type}
          onChange={setType}
          options={types}
          className="w-32"
        />
        <Select
          value={location}
          onChange={setLocation}
          options={locations}
          className="w-48"
        />
        <Button color="outline" className="ml-auto">Property List</Button>
      </div>
      {/* Map */}
      <div className="rounded-2xl overflow-hidden border border-gray-200 bg-white" style={{ height: 800 }}>
        <MapContainer center={center as [number, number]} zoom={12} style={{ height: '100%', width: '100%' }} scrollWheelZoom={true}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {markerKeys.map((key) => {
            const group = grouped[key];
            const [lat, lng] = key.split(',').map(Number);
            const markerId = `${lat},${lng}`;
            const popupIdx = popupIndices[key] ?? 0;
            return (
              <Marker
                key={markerId}
                position={[lat, lng] as [number, number]}
                icon={circleIcon}
                eventHandlers={{
                  click: () => handleMarkerClick(key),
                }}
                ref={ref => { markerRefs.current[key] = ref; }}
              >
                <Popup
                  position={[lat, lng] as [number, number]}
                  autoPan={true}
                  eventHandlers={{
                    popupclose: () => setOpenPopupKey(null)
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', minWidth: 160, maxWidth: 200 }}>
                    {group.length > 1 && (
                      <button
                        aria-label="Previous property"
                        onClick={e => { e.stopPropagation(); handlePrev(key, group.length); }}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 18, padding: 4 }}
                      >
                        &#8592;
                      </button>
                    )}
                    <div style={{ flex: 1 }}>
                      <MapPropertyPopup property={group[popupIdx]} small />
                    </div>
                    {group.length > 1 && (
                      <button
                        aria-label="Next property"
                        onClick={e => { e.stopPropagation(); handleNext(key, group.length); }}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 18, padding: 4 }}
                      >
                        &#8594;
                      </button>
                    )}
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
