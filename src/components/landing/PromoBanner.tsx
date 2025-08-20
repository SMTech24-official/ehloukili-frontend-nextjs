import * as React from 'react';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import { ArrowBigRight } from 'lucide-react';

const PromoBanner: React.FC = () => {
  return (
    <section className="lg:py-32 py-20 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/homePage/discover.jpg"
          alt="discover background"
          fill
          className="object-cover opacity-20"
          priority
        />
      </div>
      
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
          Discover a place you&apos;ll love to live
        </h2>
        <p className="text-xl text-black mb-8 max-w-2xl mx-auto">
          Professional real estate development tailored towards you. With love.
          Explore top-tier properties made. Upgrade today.
        </p>
        <Button className='!text-white'>
          View Properties <ArrowBigRight className='w-4 h-4 inline-block ml-1' />
        </Button>
      </div>
    </section>
  );
};

export default PromoBanner;
