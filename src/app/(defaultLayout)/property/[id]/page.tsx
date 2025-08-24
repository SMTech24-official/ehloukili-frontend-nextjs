'use client';

import React, { useState, useEffect } from 'react';
import { Heart, MessageSquare } from 'lucide-react';
import Image from 'next/image';
import FeaturedPropertyCard from '@/components/shared/FeaturedPropertyCard';
import Button from '@/components/ui/Button';
import DateInput from '@/components/ui/DateInput';
import { Heading, Text } from '@/components/ui/Typography';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';

// Dynamic import for map components to avoid SSR issues
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });

// Demo data
const propertyData = {
  id: '1',
  title: 'The Dreamy Escape at Golden Shores',
  price: 120,
  location: 'Golden Shores, Palawan',
  images: [
    'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', // Main image
    'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
  ],
  description: 'Beautiful modern house with luxury finishes in the exclusive Palawan area. This property features spacious areas, contemporary design, and the best amenities. Perfect for families seeking comfort and elegance in one of the city\'s best locations.',
  details: {
    lotSize: '250 sqm',
    yearBuilt: '2020',
    type: 'Villa',
    bedrooms: 4,
    bathrooms: 3,
    sqm: 350,
    parking: 2
  },
  amenities: [
    { name: 'Parking Spaces', icon: '🚗' },
    { name: 'Gym', icon: '💪' },
    { name: 'Private Garden', icon: '🌿' },
    { name: 'High Speed Internet', icon: '📶' },
    { name: '24/7 Security', icon: '🔒' }
  ],
  coordinates: [9.7489, 118.7384] // Palawan coordinates
};

const similarProperties = [
  {
    id: '2',
    title: 'Skyper Pool Apartment',
    location: '1058 Bloomingdale Ave',
    price: 200000,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    bedrooms: 4,
    bathrooms: 1,
    sqm: 450,
    type: 'sale'
  },
  {
    id: '3',
    title: 'North Dillard Street',
    location: '2345 Red Drive Rd',
    price: 250,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    bedrooms: 4,
    bathrooms: 1,
    sqm: 300,
    type: 'rent'
  },
  {
    id: '4',
    title: 'Eaton Garth Penthouse',
    location: '7722 18th Ave, Brooklyn',
    price: 180000,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    bedrooms: 4,
    bathrooms: 2,
    sqm: 450,
    type: 'sale'
  }
];

export default function PropertyDetailsPage() {
  const [activeTab, setActiveTab] = useState('Map');
  const [selectedImage, setSelectedImage] = useState(0);
  const [isSaved, setIsSaved] = useState(false);
  const [formData, setFormData] = useState({
    date: '',
    message: '',
    privacyAgreed: false
  });

  // Fix Leaflet default marker icon issue
  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('leaflet').then((L) => {
        const DefaultIcon = L.Icon.Default.prototype as unknown as { _getIconUrl?: () => void };
        delete DefaultIcon._getIconUrl;
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
          iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
          shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
        });
      });
    }
  }, []);

  const tabs = ['Map', 'School', 'Public transport', 'Mosques'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.privacyAgreed) {
      alert('Please agree to the privacy policy');
      return;
    }
    alert('Message sent successfully!');
  };

  return (
    <main className="container mx-auto px-4 py-8 max-w-7xl md:pt-20 pt-10">
      {/* Title Section */}
      <div className="flex justify-between items-start mb-8 flex-wrap">
        <Heading level={2} className="text-3xl md:text-4xl font-bold text-gray-900 max-w-3xl">
          {propertyData.title}
        </Heading>
        <Button
          color="ghost"
          size="sm"
          onClick={() => setIsSaved(!isSaved)}
          className={`flex items-center gap-2 ${isSaved ? 'text-red-500' : 'text-gray-500'}`}
        >
          <Heart className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
          Save
        </Button>
      </div>

      {/* Image Gallery */}
      <div className="mb-8">
        <div className="mb-4">
          <Image
            src={propertyData.images[selectedImage]}
            alt={propertyData.title}
            width={800}
            height={400}
            className="w-full xl:h-[30rem] h-[400px] object-cover rounded-lg"
          />
        </div>
        <div className="flex gap-4 overflow-x-auto">
          {propertyData.images.slice(1, 5).map((image, index) => (
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
          {/* Description Card */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <Heading level={4} className="text-xl font-semibold mb-4">
              Description
            </Heading>
            <Text className="text-gray-600 leading-relaxed">
              {propertyData.description}
            </Text>
          </div>

          {/* Property Details Card */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <Heading level={4} className="text-xl font-semibold mb-6">
              Property Details
            </Heading>
            
            {/* Basic Details */}
            <div className="grid grid-cols-3 gap-4 mb-6 text-center">
              <div>
                <Text size="sm" color="muted" className="text-gray-500 text-sm">
                  Lot Size
                </Text>
                <Text weight="semibold">
                  {propertyData.details.lotSize}
                </Text>
              </div>
              <div>
                <Text size="sm" color="muted" className="text-gray-500 text-sm">
                  Year Built
                </Text>
                <Text weight="semibold">
                  {propertyData.details.yearBuilt}
                </Text>
              </div>
              <div>
                <Text size="sm" color="muted" className="text-gray-500 text-sm">
                  Type
                </Text>
                <Text weight="semibold">
                  {propertyData.details.type}
                </Text>
              </div>
            </div>

            {/* Highlighted Details */}
            <div className="grid grid-cols-4 gap-4 bg-gray-50 rounded-lg p-4">
              <div className="text-center">
                <Heading level={3} className="text-2xl font-bold text-primary-600">
                  {propertyData.details.bedrooms}
                </Heading>
                <Text size="sm" color="muted" className="text-gray-500 text-sm">
                  Bedrooms
                </Text>
              </div>
              <div className="text-center">
                <Heading level={3} className="text-2xl font-bold text-primary-600">
                  {propertyData.details.bathrooms}
                </Heading>
                <Text size="sm" color="muted" className="text-gray-500 text-sm">
                  Bathrooms
                </Text>
              </div>
              <div className="text-center">
                <Heading level={3} className="text-2xl font-bold text-primary-600">
                  {propertyData.details.sqm}
                </Heading>
                <Text size="sm" color="muted" className="text-gray-500 text-sm">
                  sqm Total
                </Text>
              </div>
              <div className="text-center">
                <Heading level={3} className="text-2xl font-bold text-primary-600">
                  {propertyData.details.parking}
                </Heading>
                <Text size="sm" color="muted" className="text-gray-500 text-sm">
                  Parking
                </Text>
              </div>
            </div>
          </div>

          {/* Amenities Card */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <Heading level={4} className="text-xl font-semibold mb-6">
              Amenities
            </Heading>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {propertyData.amenities.map((amenity, index) => (
                <div key={index} className="flex items-center gap-3">
                  <span className="text-xl">{amenity.icon}</span>
                  <Text className="text-gray-700">
                    {amenity.name}
                  </Text>
                </div>
              ))}
            </div>
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

            {/* Map */}
            <div className="h-64 rounded-lg overflow-hidden">
              {typeof window !== 'undefined' && (
                <MapContainer
                  center={[propertyData.coordinates[0], propertyData.coordinates[1]]}
                  zoom={13}
                  style={{ height: '100%', width: '100%' }}
                  className="rounded-lg"
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  <Marker position={[propertyData.coordinates[0], propertyData.coordinates[1]]}>
                    <Popup>
                      <div className="text-center">
                        <strong>{propertyData.title}</strong>
                        <br />
                        {propertyData.location}
                        <br />
                        <span className="text-primary-600 font-semibold">
                          ${propertyData.price}/month
                        </span>
                      </div>
                    </Popup>
                  </Marker>
                </MapContainer>
              )}
              {typeof window === 'undefined' && (
                <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Text color="muted">Loading map...</Text>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-4">
            <Heading level={3} className="text-2xl font-bold text-primary-600 mb-6">
              ${propertyData.price}/month
            </Heading>

            <form onSubmit={handleSubmit} className="space-y-4">
              <DateInput
                label="Book a Visit"
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                placeholder="Select date"
                type="date"
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  placeholder="Your message..."
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <label className="flex items-start gap-2 text-sm text-gray-600">
                <input
                  type="checkbox"
                  checked={formData.privacyAgreed}
                  onChange={(e) => setFormData({...formData, privacyAgreed: e.target.checked})}
                  className="mt-1 accent-primary-600"
                />
                You agree to our friendly privacy policy.
              </label>

              <Button 
                type="submit" 
                className="w-full bg-primary-600 hover:bg-primary-700 !text-white"
              >
                Send message
              </Button>

              <Button 
                type="button"
                color="outline"
                className="w-full border-green-500 text-green-600 hover:bg-green-50"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                WhatsApp
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Similar Properties Section */}
      <div className="mt-16">
        <Heading level={4} className="text-2xl font-bold text-gray-900 mb-8">
          Similar Properties
        </Heading>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {similarProperties.map((property) => (
            <FeaturedPropertyCard
              key={property.id}
              id={property.id}
              title={property.title}
              address={property.location}
              price={property.type === 'sale' ? `$${property.price.toLocaleString()}` : `$${property.price}/month`}
              badge={property.type === 'sale' ? 'For Sale' : 'For Rent'}
              bedrooms={property.bedrooms}
              bathrooms={property.bathrooms}
              sqft={property.sqm}
              imageUrl={property.image}
            />
          ))}
        </div>

        <div className="text-center">
          <Button color="outline" className="px-8">
            See More Similar Properties
          </Button>
        </div>
      </div>
    </main>
  );
}
