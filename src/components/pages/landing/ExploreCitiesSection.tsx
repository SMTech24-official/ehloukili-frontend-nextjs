
"use client";

import * as React from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { SectionTitle, Subtitle } from '@/components/ui/Typography';
import { useGetPropertyTypeCountsQuery } from '@/redux/api/adminApi';

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

// Array of 20 unique Unsplash image URLs
const cityImageUrls = [
  "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=1544&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1672116452571-896980a801c8?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1519501025264-65ba15a82390?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1496568816309-51d7c20e3b21?q=80&w=1631&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1514565131-fce0801e5785?q=80&w=1556&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1682048358672-1c5c6c9ed2ae?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1516900557549-41557d405adf?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1483653364400-eedcfb9f1f88?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1527956041665-d7a1b380c460?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1495954380655-01609180eda3?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1673241100156-2e04fca1a4af?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  // "https://images.unsplash.com/photo-1494522358652-f30e61a60313?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  // "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  // "https://images.unsplash.com/photo-1521747116042-5a7c32f04b74?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  // "https://images.unsplash.com/photo-1514924013411-2a8c9e68b7b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  // "https://images.unsplash.com/photo-1515902029822-7a6e8f7c7b2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  // "https://images.unsplash.com/photo-1486326379634-49d86d7c8f62?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  // "https://images.unsplash.com/photo-1519125323398-675f1f1d1f1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  // "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  // "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  // "https://images.unsplash.com/photo-1503437313881-1d7b3d3b7e7a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  // "https://images.unsplash.com/photo-1519046904884-53103b34b206?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  // "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
];



interface City {
  cityName: string;
  propertyCount: string;
  imageUrl: string;
}

// interface PropertyTypeCountsResponse {
//   success: boolean;
//   counts: { [key: string]: number };
//   cities: { [key: string]: number };
// }

const ExploreCitiesSection: React.FC = () => {
  const { data, isLoading, error } = useGetPropertyTypeCountsQuery(undefined);

  // Function to get a random image URL
  const getRandomImageUrl = () => {
    const randomIndex = Math.floor(Math.random() * cityImageUrls.length);
    return cityImageUrls[randomIndex];
  };

  // Demo data for loading/error states (only for API-provided cities)
  const demoCities: City[] = isLoading || error || !data?.success
    ? Object.entries(data?.cities || { dhaka: 4 }).map(([cityName, count]) => ({
        cityName: cityName.charAt(0).toUpperCase() + cityName.slice(1),
        propertyCount: `${count?.toLocaleString()} Properties`,
        imageUrl: getRandomImageUrl(),
      }))
    : [];

  // Map API data to cities, using only API-provided cities
  const cities: City[] = isLoading || error || !data?.success
    ? demoCities
    : Object.entries(data.cities).map(([cityName, count]) => ({
        cityName: cityName.charAt(0).toUpperCase() + cityName.slice(1),
        propertyCount: `${count?.toLocaleString()} Properties`,
        imageUrl: getRandomImageUrl(),
      }));

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
  }, [cardsPerView, currentIndex, cities.length]);

  const maxIndex = Math.max(0, cities.length - cardsPerView);

  const goToPrevious = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  return (
    <section className="py-20 bg-white">
      <div className="">
        <div className="text-center mb-12">
          <SectionTitle>
            Explore Properties in Your City
          </SectionTitle>
          <Subtitle>
            Find the perfect home for sale or rent throughout the country. Search properties in top cities to discover your dream property in a high competitive city.
          </Subtitle>
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