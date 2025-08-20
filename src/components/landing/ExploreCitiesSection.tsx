'use client';

import * as React from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CityCardProps {
  cityName: string;
  propertyCount: string;
  imageUrl: string;
}

const CityCard: React.FC<CityCardProps> = ({ cityName, propertyCount, imageUrl }) => {
  return (
    <div className="group cursor-pointer relative h-48 sm:h-56 md:h-64 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <Image
        src={imageUrl}
        alt={cityName}
        fill
        className="object-cover group-hover:scale-105 transition-transform duration-300"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 text-white">
        <h3 className="text-lg sm:text-xl font-semibold mb-1">{cityName}</h3>
        <p className="text-xs sm:text-sm opacity-90">{propertyCount}</p>
      </div>
    </div>
  );
};

const cities = [
  {
    cityName: 'Chicago',
    propertyCount: '2,142 Properties',
    imageUrl: 'https://images.unsplash.com/photo-1494522358652-f30e61a60313?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
  },
  {
    cityName: 'Los Angeles',
    propertyCount: '3,847 Properties',
    imageUrl: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
  },
  {
    cityName: 'Miami',
    propertyCount: '1,923 Properties',
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
  },
  {
    cityName: 'Florida',
    propertyCount: '4,521 Properties',
    imageUrl: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
  },
  {
    cityName: 'New York',
    propertyCount: '6,789 Properties',
    imageUrl: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
  },
  {
    cityName: 'Florida',
    propertyCount: '4,521 Properties',
    imageUrl: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
  },
  {
    cityName: 'New York',
    propertyCount: '6,789 Properties',
    imageUrl: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
  },
];

const ExploreCitiesSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [cardsPerView, setCardsPerView] = React.useState(5);

  // Update cards per view based on screen size
  React.useEffect(() => {
    const updateCardsPerView = () => {
      if (window.innerWidth >= 1280) { // xl screens
        setCardsPerView(5);
      } else if (window.innerWidth >= 1024) { // lg screens
        setCardsPerView(4);
      } else if (window.innerWidth >= 768) { // md screens
        setCardsPerView(3);
      } else if (window.innerWidth >= 480) { // sm screens
        setCardsPerView(2);
      } else { // mobile
        setCardsPerView(1);
      }
    };

    updateCardsPerView();
    window.addEventListener('resize', updateCardsPerView);
    return () => window.removeEventListener('resize', updateCardsPerView);
  }, []);

  // Reset currentIndex when cardsPerView changes to avoid out-of-bounds
  React.useEffect(() => {
    const newMaxIndex = Math.max(0, cities.length - cardsPerView);
    if (currentIndex > newMaxIndex) {
      setCurrentIndex(newMaxIndex);
    }
  }, [cardsPerView, currentIndex]);

  const maxIndex = Math.max(0, cities.length - cardsPerView);

  const goToPrevious = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-neutral-900)] mb-4">
            Explore Properties in Your City
          </h2>
          <p className="text-lg text-[var(--color-neutral-600)] max-w-2xl mx-auto">
            Find the perfect home for sale or rent throughout the country. Search properties in top cities to discover your dream property in a high competitive city.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Left Arrow */}
          {maxIndex > 0 && (
            <button
              onClick={goToPrevious}
              disabled={currentIndex === 0}
              className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center transition-all ${
                currentIndex === 0
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:bg-gray-50 hover:shadow-xl'
              }`}
              aria-label="Previous cities"
            >
              <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6 text-[var(--color-neutral-700)]" />
            </button>
          )}

          {/* Right Arrow */}
          {maxIndex > 0 && (
            <button
              onClick={goToNext}
              disabled={currentIndex >= maxIndex}
              className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center transition-all ${
                currentIndex >= maxIndex
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:bg-gray-50 hover:shadow-xl'
              }`}
              aria-label="Next cities"
            >
              <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6 text-[var(--color-neutral-700)]" />
            </button>
          )}

          {/* Carousel Track */}
          <div className={`overflow-hidden ${maxIndex > 0 ? 'mx-12 sm:mx-14' : 'mx-0'}`}>
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / cardsPerView)}%)`,
                gap: cardsPerView === 1 ? '0px' : '24px'
              }}
            >
              {cities.map((city, index) => (
                <div
                  key={index}
                  className="flex-none"
                  style={{ 
                    width: cardsPerView === 1 
                      ? '100%' 
                      : `calc(${100 / cardsPerView}% - ${24 * (cardsPerView - 1) / cardsPerView}px)` 
                  }}
                >
                  <CityCard
                    cityName={city.cityName}
                    propertyCount={city.propertyCount}
                    imageUrl={city.imageUrl}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Dots Indicator */}
        {maxIndex > 0 && (
          <div className="flex justify-center mt-6 sm:mt-8 space-x-2">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  currentIndex === index
                    ? 'bg-[var(--color-secondary-600)] w-6'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ExploreCitiesSection;
