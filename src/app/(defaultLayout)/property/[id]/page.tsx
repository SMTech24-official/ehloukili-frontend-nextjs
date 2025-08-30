/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// pages/properties/[id].tsx
'use client';

import React, { useState, useEffect } from 'react';
import { Heart, MessageSquare } from 'lucide-react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import DateInput from '@/components/ui/DateInput';
import { Heading, Text } from '@/components/ui/Typography';
import { useGetSavedPropertiesQuery, useGetSinglePropertyQuery, useSavePropertyMutation, useUnsavePropertyMutation } from '@/redux/api/propertiesApi';
import { useGetMeQuery } from '@/redux/api/authApi';
import { toast } from 'sonner';
import Spinner from '@/components/ui/Spinner';
import { useCreateMessageMutation } from '@/redux/api/MessageApi';

// Google Maps
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

// Styles
const mapContainerStyle = {
  width: '100%',
  height: '100%',
};

const defaultOptions = {
  disableDefaultUI: false,
  zoomControl: true,
};

// Nearby Places Component
function NearbyPlaces({ coordinates, type }: { coordinates: [number, number]; type: string }) {
  const [places, setPlaces] = useState<any[]>([]);

  useEffect(() => {
    if (!type) return;

    const service = new google.maps.places.PlacesService(document.createElement('div'));

    const request = {
      location: new google.maps.LatLng(coordinates[0], coordinates[1]),
      radius: 2000, // 2km
      type: type,
    };

    service.nearbySearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && results) {
        setPlaces(results);
      }
    });
  }, [coordinates, type]);

  return (
    <>
      {places.map((place, index) => (
        <Marker
          key={index}
          position={{
            lat: place.geometry?.location?.lat(),
            lng: place.geometry?.location?.lng(),
          }}
          title={place.name}
        />
      ))}
    </>
  );
}

export default function PropertyDetailsPage() {
  const [activeTab, setActiveTab] = useState('Map');
  const [selectedImage, setSelectedImage] = useState(0);
  const [isSaved, setIsSaved] = useState(false);
  const [formData, setFormData] = useState({
    date: '',
    message: '',
    privacyAgreed: false,
  });

  const params = useParams();
  const router = useRouter();
  const id = typeof params.id === 'string' ? params.id : '';

  const { data: user } = useGetMeQuery();
  const { data: savedProperties } = useGetSavedPropertiesQuery(undefined, { skip: !user });
  const { data, isLoading, error } = useGetSinglePropertyQuery(id);
  const [saveProperty, { isLoading: isSaving }] = useSavePropertyMutation();
  const [unsaveProperty, { isLoading: isUnsaving }] = useUnsavePropertyMutation();
  const [createMessage, { isLoading: isSendingMessage }] = useCreateMessageMutation();

  // Initialize isSaved based on savedProperties
  useEffect(() => {
    if (savedProperties?.data && id) {
      const isPropertySaved = savedProperties.data.some((prop: any) => prop.id === Number(id));
      setIsSaved(isPropertySaved);
    }
  }, [savedProperties, id]);

  const tabs = ['Map', 'School', 'Public transport', 'Mosques'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error('You must be logged in to send a message');
      return;
    }
    if (!formData.privacyAgreed) {
      toast.error('Please agree to the privacy policy');
      return;
    }
    try {
      await createMessage({ property_id: id, message: formData.message }).unwrap();
      toast.success('Message sent successfully!');
      setFormData({ date: '', message: '', privacyAgreed: false });
    } catch (err: any) {
      const errorMessage = err?.data?.message || 'Failed to send message';
      toast.error(errorMessage);
    }
  };

  const handleSaveToggle = async () => {
    if (!user) {
      router.push('/auth/login');
      return;
    }
    try {
      if (isSaved) {
        await unsaveProperty(id).unwrap();
        setIsSaved(false);
        toast.success('Property removed from saved list');
      } else {
        await saveProperty(id).unwrap();
        setIsSaved(true);
        toast.success('Property saved successfully');
      }
    } catch (err: any) {
      const errorMessage = err?.data?.message || 'An error occurred';
      toast.error(isSaved ? `Failed to unsave property: ${errorMessage}` : `Failed to save property: ${errorMessage}`);
    }
  };

  const handleWhatsAppClick = () => {
    if (!user) {
      router.push('/auth/login');
      return;
    }
    window?.open('https://wa.me/+880172000000', '_blank');
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 flex items-center justify-center h-screen">
        <Text>Loading property details...</Text>
        <Spinner size={20} color="black" />
      </div>
    );
  }

  if (error) {
    let errorMessage = 'An error occurred while loading the property.';
    if ('message' in error && typeof error.message === 'string') {
      errorMessage = error.message;
    } else if ('status' in error && typeof error.status === 'number') {
      errorMessage = `Error code: ${error.status}`;
    }
    return (
      <div className="container mx-auto px-4 py-8 flex items-center justify-center h-screen">
        <Text color="error">Error loading property: {errorMessage}</Text>
      </div>
    );
  }

  if (!data?.data) {
    return (
      <div className="container mx-auto px-4 py-8 flex items-center justify-center h-screen">
        <Text color="secondary">Property not found</Text>
      </div>
    );
  }

  const property = data.data;

  // Map API data to component structure
  const images = property.photos.map((photo: any) => `${process.env.NEXT_PUBLIC_IMAGE_URL}${photo.url}`);
  const amenities = [
    ...property.interior_features.map((name: any) => ({ name, icon: '🏠' })),
    ...property.exterior_features.map((name: any) => ({ name, icon: '🌳' })),
  ];
  const coordinates: [number, number] = [Number(property.latitude) || 0, Number(property.longitude) || 0];

  return (
    <main className="container mx-auto px-4 py-8 max-w-7xl md:pt-20 pt-10">
      {/* Title Section */}
      <div className="flex justify-between items-start mb-8 flex-wrap">
        <Heading level={2} className="text-3xl md:text-4xl font-bold text-gray-900 max-w-3xl">
          {property.street_address}, {property.city}
        </Heading>
        <Button
          color="ghost"
          size="sm"
          onClick={handleSaveToggle}
          disabled={isSaving || isUnsaving}
          className={`flex items-center gap-2 ${isSaved ? 'text-red-500' : 'text-gray-500'}`}
          aria-label={isSaved ? 'Unsave property' : 'Save property'}
        >
          <Heart className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
          {isSaving || isUnsaving ? <Spinner size={16} color="gray" /> : isSaved ? 'Saved' : 'Save'}
        </Button>
      </div>

      {/* Image Gallery */}
      <div className="mb-8">
        <div className="mb-4">
          <Image
            src={images[selectedImage] || '/placeholder-image.jpg'}
            alt={`${property.street_address}, ${property.city}`}
            width={800}
            height={400}
            className="w-full xl:h-[30rem] h-[400px] object-cover rounded-lg"
          />
        </div>
        <div className="flex gap-4 overflow-x-auto">
          {images?.slice(1, 5).map((image: any, index: number) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index + 1)}
              className={`flex-shrink-0 ${selectedImage === index + 1 ? 'ring-2 ring-primary-500' : ''}`}
            >
              <Image
                src={image}
                alt={`Property view ${index + 2}`}
                width={150}
                height={100}
                className="w-[150px] h-[100px] object-cover rounded-lg"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Description */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <Heading level={4} className="text-xl font-semibold mb-4">
              Description
            </Heading>
            <Text className="text-gray-600 leading-relaxed">{property.property_description}</Text>
          </div>

          {/* Location Information */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <Heading level={4} className="text-xl font-semibold mb-6">
              Location Information
            </Heading>

            {/* Tabs */}
            <div className="flex gap-1 mb-6 border-b border-gray-200">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 text-sm font-medium border-b-2 ${
                    activeTab === tab
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Google Map */}
            <div className="h-64 rounded-lg overflow-hidden">
              {coordinates[0] !== 0 && coordinates[1] !== 0 ? (
                <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''} libraries={['places']}>
                  <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    center={{ lat: coordinates[0], lng: coordinates[1] }}
                    zoom={14}
                    options={defaultOptions}
                  >
                    <Marker position={{ lat: coordinates[0], lng: coordinates[1] }} />

                    {activeTab !== 'Map' && (
                      <NearbyPlaces
                        coordinates={coordinates}
                        type={
                          activeTab === 'School'
                            ? 'school'
                            : activeTab === 'Public transport'
                            ? 'transit_station'
                            : activeTab === 'Mosques'
                            ? 'mosque'
                            : ''
                        }
                      />
                    )}
                  </GoogleMap>
                </LoadScript>
              ) : (
                <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Text color="muted">Map unavailable</Text>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-4">
            <Heading level={3} className="text-2xl font-bold text-primary-600 mb-6">
              ${property.price}
              {property.listing_type === 'sale' ? '' : '/month'}
            </Heading>

            <form onSubmit={handleSubmit} className="space-y-4">
              <DateInput
                label="Book a Visit"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                placeholder="Select date"
                type="date"
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Your message..."
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <label className="flex items-start gap-2 text-sm text-gray-600">
                <input
                  type="checkbox"
                  checked={formData.privacyAgreed}
                  onChange={(e) => setFormData({ ...formData, privacyAgreed: e.target.checked })}
                  className="mt-1 accent-primary-600"
                />
                You agree to our friendly privacy policy.
              </label>

              <Button
                type="submit"
                disabled={isSendingMessage}
                className="w-full bg-primary-600 hover:bg-primary-700 !text-white"
              >
                {isSendingMessage ? <Spinner size={16} color="white" /> : 'Send message'}
              </Button>

              <Button
                type="button"
                color="outline"
                onClick={handleWhatsAppClick}
                className="w-full border-green-500 text-green-600 hover:bg-green-50"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                WhatsApp
              </Button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
