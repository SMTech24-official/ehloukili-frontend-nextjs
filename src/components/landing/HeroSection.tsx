'use client';

import * as React from 'react';
import {  Search } from 'lucide-react';
import Image from 'next/image';

const searchTabs = [
  { label: 'Buy', value: 'buy', active: true },
  { label: 'Rent', value: 'rent', active: false },
  { label: 'New Construction', value: 'new-construction', active: false },
  { label: 'Recreation', value: 'recreation', active: false },
  { label: 'Europe', value: 'europe', active: false },
];

const HeroSection: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState('buy');

  return (
    <section className="relative xl:min-h-[700px] min-h-screen bg-gradient-to-br from-blue-50 to-gray-50 flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div 
          className="w-full h-full bg-cover bg-center bg-no-repeat opacity-20"
          style={{
            backgroundImage: "url('/homePage/hero.jpg')"
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          {/* Hero Text */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--color-neutral-900)] mb-6 leading-tight">
            Your Dream Home is Just a Click Away
          </h1>
          <p className="text-lg md:text-xl text-[var(--color-neutral-600)] mb-12 max-w-3xl mx-auto">
            Search for properties, find the perfect place to call home. Connect with listings, qualify homes, and close bookmarks with ease.
          </p>

          {/* Search Card */}
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
            {/* Search Tabs */}
            <div className="flex flex-wrap gap-2 mb-6 p-1 bg-gray-100 rounded-lg">
              {searchTabs.map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => setActiveTab(tab.value)}
                  className={`px-5 py-3 rounded-md font-medium text-sm transition-all ${
                    activeTab === tab.value
                      ? 'bg-white text-[var(--color-secondary-600)] shadow-sm'
                      : 'text-[var(--color-neutral-600)] hover:text-[var(--color-neutral-900)]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Search by location, neighborhood, or property type..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary-400)] focus:border-transparent"
                />
                <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none bg-[var(--color-primary-600)] text-white rounded-r-lg justify-center">
                    <Search className="w-5 h-5 " />
                </div>
              </div>
              <div className="text-[var(--color-secondary-600)] px-2 py-3 flex items-center gap-2 cursor-pointer">
                <Image
                  src="/homePage/iconMapInhero.svg"
                  alt="Search"
                  width={20}
                  height={20}
                />  
                <span className="hidden sm:inline">Search Now</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
