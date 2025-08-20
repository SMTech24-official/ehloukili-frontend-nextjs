import React from 'react';
import HeroSection from '@/components/landing/HeroSection';
import PropertyTypesSection from '@/components/landing/PropertyTypesSection';
import FeaturedPropertiesSection from '@/components/landing/FeaturedPropertiesSection';
import ExploreCitiesSection from '@/components/landing/ExploreCitiesSection';
import HowItWorksSection from '@/components/landing/HowItWorksSection';
import PromoBanner from '@/components/landing/PromoBanner';
import Footer from '@/components/shared/Footer';
import Navbar from '@/components/shared/Navbar';

export default function Home() {
  return (
    <main>
      <Navbar />

      <HeroSection />
      <PropertyTypesSection />
      <FeaturedPropertiesSection />
      <ExploreCitiesSection />
      <HowItWorksSection />
      <PromoBanner />
      <Footer />
    </main>
  );
}
