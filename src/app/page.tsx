import ExploreCitiesSection from '@/components/pages/landing/ExploreCitiesSection';
import FeaturedPropertiesSection from '@/components/pages/landing/FeaturedPropertiesSection';
import HeroSection from '@/components/pages/landing/HeroSection';
import HowItWorksSection from '@/components/pages/landing/HowItWorksSection';
import PromoBanner from '@/components/pages/landing/PromoBanner';
import PropertyTypesSection from '@/components/pages/landing/PropertyTypesSection';
import Footer from '@/components/shared/Footer';
import Navbar from '@/components/shared/Navbar';

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <div className='container lg:max-w-7xl 2xl:max-w-max mx-auto px-4 sm:px-6 lg:px-8'>

        <PropertyTypesSection />
        <FeaturedPropertiesSection />
        <ExploreCitiesSection />
      </div>
      <HowItWorksSection />
      <PromoBanner />
      <Footer />
    </main>
  );
}
