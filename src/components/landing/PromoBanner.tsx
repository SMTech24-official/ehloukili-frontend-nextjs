import * as React from 'react';
import Button from '@/components/ui/Button';

const PromoBanner: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-[var(--color-primary-600)] to-[var(--color-primary-700)] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="w-full h-full bg-repeat"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        />
      </div>
      
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Discover a place you&apos;ll love to live
        </h2>
        <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
          Professional real estate development tailored towards you. With love.
          Explore top-tier properties made. Upgrade today.
        </p>
        <Button className="bg-[var(--color-secondary-600)] hover:bg-[var(--color-secondary-700)] text-white px-8 py-3 text-lg font-semibold">
          View Properties
        </Button>
      </div>
    </section>
  );
};

export default PromoBanner;
