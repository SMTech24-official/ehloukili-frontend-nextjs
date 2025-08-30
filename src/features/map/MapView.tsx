/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';
import LocationSearchInput from '@/components/ui/LocationSearchInput';
import Select from '@/components/ui/Select';
import MapPropertyPopup from '@/features/map/MapPropertyPopup';
import { useGroupedProperties } from '@/features/map/useGroupedProperties';
import { useGetAllPropertiesQuery } from '@/redux/api/propertiesApi';
import {
  GoogleMap,
  InfoWindow,
  Marker,
  MarkerClusterer,
  useJsApiLoader
} from '@react-google-maps/api';
import { ArrowBigLeft, ArrowBigRight, MapPin, Loader2, AlertCircle, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import * as React from 'react';

// Google Maps libraries to load
const libraries: ('places' | 'geometry' | 'drawing' | 'visualization')[] = ['places'];

// Enhanced map styling for property websites
const propertyMapStyles = [
  { elementType: 'geometry', stylers: [{ color: '#f5f5f7' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#616161' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#f5f5f7' }] },
  {
    featureType: 'administrative.land_parcel',
    elementType: 'labels',
    stylers: [{ visibility: 'off' }]
  },
  {
    featureType: 'administrative.land_parcel',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#bdbdbd' }]
  },
  {
    featureType: 'poi',
    elementType: 'geometry',
    stylers: [{ color: '#eeeeee' }]
  },
  {
    featureType: 'poi',
    elementType: 'labels.text',
    stylers: [{ visibility: 'off' }]
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{ color: '#c5e1a5' }]
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#9e9e9e' }]
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ color: '#ffffff' }]
  },
  {
    featureType: 'road.arterial',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#757575' }]
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{ color: '#dadada' }]
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#616161' }]
  },
  {
    featureType: 'road.local',
    elementType: 'labels',
    stylers: [{ visibility: 'off' }]
  },
  {
    featureType: 'road.local',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#9e9e9e' }]
  },
  {
    featureType: 'transit.line',
    elementType: 'geometry',
    stylers: [{ color: '#e5e5e5' }]
  },
  {
    featureType: 'transit.station',
    elementType: 'geometry',
    stylers: [{ color: '#eeeeee' }]
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#c9c9c9' }]
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#9e9e9e' }]
  }
];

const types = [
  { value: 'sale', label: 'For Sale' },
  { value: 'rent', label: 'For Rent' },
];

// Helper to safely create icons AFTER Google Maps API loaded
function createPinSvg(countOrSelected: { count?: number; selected?: boolean; single?: boolean }) {
  // If count is present -> cluster SVG; else single marker SVG
  if (typeof countOrSelected.count === 'number') {
    const count = countOrSelected.count;
    const fill = countOrSelected.selected ? '#3B82F6' : '#EF4444';
    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
      <svg width="48" height="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="24" r="22" fill="${fill}" stroke="white" stroke-width="4"/>
        <text x="24" y="30" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="14" font-weight="bold">${count}</text>
      </svg>
    `)}`;
  }
  const selected = !!countOrSelected.selected;
  const fill = selected ? '#3B82F6' : '#EF4444';
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
    <svg width="40" height="48" viewBox="0 0 40 48" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 0C8.954 0 0 8.954 0 20c0 15 20 28 20 28s20-13 20-28C40 8.954 31.046 0 20 0z" fill="${fill}"/>
      <circle cx="20" cy="20" r="12" fill="white"/>
      <path d="M20 8C13.373 8 8 13.373 8 20s5.373 12 12 12 12-5.373 12-12S26.627 8 20 8zm0 18c-3.314 0-6-2.686-6-6s2.686-6 6-6 6 2.686 6 6-2.686 6-6 6z" fill="${fill}"/>
    </svg>
  `)}`;
}

const MapView: React.FC = () => {
  const [type, setType] = React.useState<'rent' | 'sale'>('rent');
  const [center, setCenter] = React.useState<{ lat: number; lng: number }>({ lat: 23.8103, lng: 90.4125 });
  const mapRef = React.useRef<google.maps.Map | null>(null);
  const [zoom, setZoom] = React.useState<number>(12);
  const [selectedMarkerKey, setSelectedMarkerKey] = React.useState<string | null>(null);
  const [popupIndices, setPopupIndices] = React.useState<Record<string, number>>({});
  const router = useRouter();
  const apiFilters = React.useMemo(() => ({ listing_type: type, isActive: true }), [type]);
  const { data, isLoading, isError } = useGetAllPropertiesQuery(apiFilters);
  
  // Load Google Maps script once and keep cached
  const { isLoaded: mapsApiLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? '',
    libraries
  });
  
  // Transform properties once - memoized
  const properties = React.useMemo(() => {
    if (!data?.data) return [];
    return data.data
      .filter((p: any) => p.latitude && p.longitude && !isNaN(Number(p.latitude)) && !isNaN(Number(p.longitude)))
      .map((p: any) => ({
        id: p.id,
        title: `${p.property_type} in ${p.city}`,
        address: `${p.street_address ?? ''}, ${p.city ?? ''}`,
        // store numeric price for calculations and formatted string for UI
        rawPrice: Number(p.price) || 0,
        price: `$${(Number(p.price) || 0).toLocaleString()}`,
        badge: p.listing_type === 'rent' ? 'For Rent' : 'For Sale',
        badgeColor: p.listing_type === 'rent' ? 'bg-blue-500' : 'bg-green-500',
        bedrooms: p.bedrooms,
        bathrooms: p.bathrooms,
        sqft: p.unit_area,
        imageUrl: p.photos?.[0]?.url ? `${process.env.NEXT_PUBLIC_IMAGE_URL}${p.photos[0].url}` : '/placeholder.png',
        location: p.city,
        lat: Number(p.latitude),
        lng: Number(p.longitude),
        propertyType: p.property_type,
        listing_type: p.listing_type
      }));
  }, [data]);
  
  // Grouped properties by rounded lat/lng key - still using your hook
  const grouped = useGroupedProperties(properties);
  const markerKeys = React.useMemo(() => Object.keys(grouped), [grouped]);
  
  // Map options memoized
  const mapOptions: google.maps.MapOptions = React.useMemo(() => ({
    styles: propertyMapStyles,
    disableDefaultUI: false,
    zoomControl: true,
    mapTypeControl: false,
    scaleControl: true,
    streetViewControl: false,
    rotateControl: false,
    fullscreenControl: true,
    gestureHandling: 'cooperative',
    clickableIcons: false,
    mapTypeId: 'roadmap'
  }), []);
  
  // handle marker click
  const handleMarkerClick = React.useCallback((key: string) => {
    setPopupIndices(prev => ({ ...prev, [key]: 0 }));
    setSelectedMarkerKey(key);
  }, []);
  
  const handlePrev = React.useCallback((e: React.MouseEvent, key: string, groupLen: number) => {
    e.preventDefault();
    e.stopPropagation();
    setPopupIndices(prev => ({
      ...prev,
      [key]: ((prev[key] ?? 0) - 1 + groupLen) % groupLen
    }));
  }, []);
  
  const handleNext = React.useCallback((e: React.MouseEvent, key: string, groupLen: number) => {
    e.preventDefault();
    e.stopPropagation();
    setPopupIndices(prev => ({
      ...prev,
      [key]: ((prev[key] ?? 0) + 1) % groupLen
    }));
  }, []);
  
  const handleClosePopup = React.useCallback(() => setSelectedMarkerKey(null), []);
  
  // When location selected from search input
  const handleLocationSelect = React.useCallback((loc: any) => {
    if (loc?.lat && loc?.lon) {
      const newCenter = { lat: parseFloat(loc.lat), lng: parseFloat(loc.lon) };
      setCenter(newCenter);
      // animate without causing re-renders: use ref directly
      if (mapRef.current) {
        mapRef.current.panTo(newCenter);
        mapRef.current.setZoom(14);
      }
    }
  }, []);
  
  // Map load handler - store ref (useRef to avoid re-render)
  const onMapLoad = React.useCallback((map: google.maps.Map) => {
    mapRef.current = map;
    // if deep linking or other logic is required to set center/zoom, do here
  }, []);
  
  // Track zoom changes without causing state churn - small state update ok for UI
  const handleZoomChanged = React.useCallback(() => {
    if (mapRef.current) {
      const z = mapRef.current.getZoom() ?? 12;
      setZoom(z);
    }
  }, []);
  
  // Prepare marker elements once maps api is loaded and properties change - memoized for performance
  const markerElements = React.useMemo(() => {
    if (!mapsApiLoaded) return null;
    return markerKeys.map((key) => {
      const group = grouped[key];
      const [lat, lng] = key.split(',').map(Number);
      const position = { lat, lng };
      const isSelected = selectedMarkerKey === key;
      const currentIndex = popupIndices[key] ?? 0;
      const currentProperty = group[currentIndex];
      // Choose icon: cluster if multiple else single
      const iconUrl = group.length === 1
        ? createPinSvg({ selected: isSelected, single: true })
        : createPinSvg({ count: group.length, selected: isSelected });
      const icon: google.maps.Icon = {
        url: iconUrl,
        // scaledSize & anchor require google.maps.Size/Point only if available; the library will accept numbers fallback too
        scaledSize: new window.google.maps.Size(group.length === 1 ? 40 : 48, group.length === 1 ? 48 : 48),
        anchor: new window.google.maps.Point(group.length === 1 ? 20 : 24, group.length === 1 ? 48 : 48)
      };
      // Return wrapper descriptor for marker rendering inside MarkerClusterer
      return {
        key,
        group,
        position,
        isSelected,
        currentProperty,
        icon
      } as const;
    });
  }, [mapsApiLoaded, markerKeys, grouped, popupIndices, selectedMarkerKey]);
  
  // Derived statistics safely
  const totalProperties = properties.length;
  const averagePrice = React.useMemo(() => {
    if (!totalProperties) return 0;
    const sum = properties.reduce((s:any, p:any) => s + (Number(p.rawPrice) || 0), 0);
    return Math.round(sum / totalProperties);
  }, [properties, totalProperties]);
  
  // Error for missing key
  if (!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-red-400 mb-4" />
          <h3 className="text-lg font-medium text-red-800 mb-2">Google Maps API Key Missing</h3>
          <p className="text-red-600">
            Please add your Google Maps API key to NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
          </p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-30">
      {/* Filter Bar */}
      <div className="bg-white rounded-xl shadow-lg p-4 gap-4 relative z-40 border border-gray-100 mb-6">
        <div className="flex flex-col md:flex-row items-stretch md:items-end gap-4">
          <div className="md:w-40 w-full">
            <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
            <Select
              value={type}
              onChange={(val: any) => setType(val)}
              options={types}
              className="w-full"
            />
          </div>
          <div className="hidden md:block h-12 border-l border-gray-200 mt-6" />
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">Search Location</label>
            <LocationSearchInput onLocationSelect={handleLocationSelect} />
          </div>
          <div className="flex items-end">
            <button
              onClick={() => router.push('/property')}
              className="bg-primary-600 hover:bg-primary-700 !text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2 whitespace-nowrap"
            >
              <MapPin size={18} />
              Property List
            </button>
          </div>
        </div>
        {/* Stats Bar */}
        {!isLoading && properties.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-600">
            <span>{properties.length} properties found</span>
            <span>Showing {type === 'rent' ? 'rental' : 'sale'} properties</span>
          </div>
        )}
      </div>
      
      {/* Map Container */}
      <div className="rounded-2xl overflow-hidden bg-white shadow-xl relative z-20" style={{ height: 800 }}>
        {/* Loading Overlay */}
        {(isLoading || !mapsApiLoaded) && (
          <div className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50">
            <div className="text-center">
              <Loader2 className="mx-auto h-12 w-12 text-primary-600 animate-spin mb-4" />
              <p className="text-gray-600 font-medium">
                {isLoading ? 'Loading properties...' : 'Loading map...'}
              </p>
            </div>
          </div>
        )}
        
        {/* Error State */}
        {isError && (
          <div className="absolute inset-0 bg-red-50 flex items-center justify-center z-50">
            <div className="text-center p-6">
              <AlertCircle className="mx-auto h-12 w-12 text-red-400 mb-4" />
              <h3 className="text-lg font-medium text-red-800 mb-2">Error Loading Properties</h3>
              <p className="text-red-600">Unable to load property data. Please try again.</p>
            </div>
          </div>
        )}
        
        {/* Maps error */}
        {loadError && (
          <div className="absolute inset-0 bg-red-50 flex items-center justify-center z-50">
            <div className="text-center p-6">
              <AlertCircle className="mx-auto h-12 w-12 text-red-400 mb-4" />
              <h3 className="text-lg font-medium text-red-800 mb-2">Error Loading Google Maps</h3>
              <p className="text-red-600">There was a problem loading Google Maps. Check your API key and network.</p>
            </div>
          </div>
        )}
        
        {/* Actual map - render only when mapsApiLoaded */}
        {mapsApiLoaded && (
          <GoogleMap
            mapContainerStyle={{ width: '100%', height: '100%' }}
            center={center}
            zoom={zoom}
            options={mapOptions}
            onLoad={onMapLoad}
            onZoomChanged={handleZoomChanged}
          >
            {/* Use MarkerClusterer for clusters; clusterer prevents many DOM nodes when zoomed out */}
            <MarkerClusterer
              averageCenter
              enableRetinaIcons
              gridSize={60}
            >
              {(clusterer) => (
                <>
                  {markerElements?.map((m) => {
                    // Each group should render a single marker (cluster visual). Clicking opens the info window which cycles over group
                    return (
                      <Marker
                        key={m.key}
                        position={m.position}
                        icon={m.icon}
                        onClick={() => handleMarkerClick(m.key)}
                        title={`${m.group.length} property${m.group.length > 1 ? 'ies' : ''}`}
                        clusterer={clusterer}
                      />
                    );
                  })}
                </>
              )}
            </MarkerClusterer>
            
            {/* InfoWindow for selected marker */}
            {selectedMarkerKey && grouped[selectedMarkerKey] && (
              <InfoWindow
                position={{
                  lat: Number(selectedMarkerKey.split(',')[0]),
                  lng: Number(selectedMarkerKey.split(',')[1])
                }}
                onCloseClick={handleClosePopup}
                options={{
                  pixelOffset: new window.google.maps.Size(0, -48),
                  maxWidth: 320,
                  disableAutoPan: false
                }}
              >
                <div className="rounded-lg overflow-hidden shadow-lg border border-gray-200 bg-white">
                  {(() => {
                    const group = grouped[selectedMarkerKey];
                    const currentIndex = popupIndices[selectedMarkerKey] ?? 0;
                    const currentProperty = group[currentIndex];
                    return (
                      <div>
                        {group.length > 1 && (
                          <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
                            <button
                              type="button"
                              aria-label="Previous property"
                              onClick={(e) => handlePrev(e, selectedMarkerKey, group.length)}
                              className="p-2 hover:bg-blue-700 rounded-full transition-colors duration-150 flex items-center justify-center"
                              style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                            >
                              <ArrowBigLeft size={20} />
                            </button>
                            <div className="text-center">
                              <span className="text-sm font-medium">
                                Property {currentIndex + 1} of {group.length}
                              </span>
                              <div className="text-xs opacity-90 mt-1">
                                {group.length} properties at this location
                              </div>
                            </div>
                            <button
                              type="button"
                              aria-label="Next property"
                              onClick={(e) => handleNext(e, selectedMarkerKey, group.length)}
                              className="p-2 hover:bg-blue-700 rounded-full transition-colors duration-150 flex items-center justify-center"
                              style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                            >
                              <ArrowBigRight size={20} />
                            </button>
                          </div>
                        )}
                        
                        {/* Property content */}
                        <div className="p-0" onClick={(e) => e.stopPropagation()}>
                          <MapPropertyPopup property={currentProperty} small />
                        </div>
                        
                        {/* Custom close button for better UX */}
                        <button 
                          onClick={handleClosePopup}
                          className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100 transition-colors"
                          aria-label="Close popup"
                        >
                          <X size={16} className="text-gray-500" />
                        </button>
                      </div>
                    );
                  })()}
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        )}
      </div>
      
      {/* Property Statistics */}
      {!isLoading && !isError && properties.length > 0 && (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-500 rounded-full" />
              <div>
                <p className="text-sm text-gray-600">Total Properties</p>
                <p className="text-xl font-semibold text-gray-900">{totalProperties}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-blue-500 rounded-full" />
              <div>
                <p className="text-sm text-gray-600">Average Price</p>
                <p className="text-xl font-semibold text-gray-900">
                  ${averagePrice.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-purple-500 rounded-full" />
              <div>
                <p className="text-sm text-gray-600">Locations</p>
                <p className="text-xl font-semibold text-gray-900">{markerKeys.length}</p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Map Controls Helper */}
      <div className="mt-4 text-center text-sm text-gray-500">
        <p>Click on markers to view property details • Use Ctrl + scroll to zoom</p>
      </div>
    </div>
  );
};

export default MapView;