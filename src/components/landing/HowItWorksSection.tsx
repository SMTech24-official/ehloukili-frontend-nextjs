import * as React from 'react';
import Image from 'next/image';
import { Search, MapPin, Key } from 'lucide-react';

interface StepProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Step: React.FC<StepProps> = ({ icon, title, description }) => {
  return (
    <div className="flex items-start gap-4 mb-8">
      <div className="flex-shrink-0 w-12 h-12 bg-[var(--color-secondary-100)] rounded-xl flex items-center justify-center text-[var(--color-secondary-600)]">
        {icon}
      </div>
      <div>
        <h3 className="text-xl font-semibold text-[var(--color-neutral-900)] mb-2">{title}</h3>
        <p className="text-[var(--color-neutral-600)] leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

const steps = [
  {
    icon: <Search className="w-6 h-6" />,
    title: 'Find Real Estate',
    description: 'Sumo petentium ut per, at his wisim utinam adipiscing. Est ei graeco quodsi omittam lorem ipsum dolor sit ame.'
  },
  {
    icon: <MapPin className="w-6 h-6" />,
    title: 'Meet Realtor',
    description: 'Sumo petentium ut per, at his wisim utinam adipiscing. Est ei graeco quodsi omittam lorem ipsum dolor sit ame.'
  },
  {
    icon: <Key className="w-6 h-6" />,
    title: 'Take The Keys',
    description: 'Sumo petentium ut per, at his wisim utinam adipiscing. Est ei graeco quodsi omittam lorem ipsum dolor sit ame.'
  },
];

const HowItWorksSection: React.FC = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-neutral-900)] mb-4">
            How It works? Find a perfect home
          </h2>
          <p className="text-lg text-[var(--color-neutral-600)] max-w-2xl mx-auto">
            Follow our simple steps to discover, view and move into your ideal home. From browsing to booking, buy to living in - a fully streamlined experience.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Steps */}
          <div>
            {steps.map((step, index) => (
              <Step key={index} {...step} />
            ))}
          </div>

          {/* Image */}
          <div className="relative h-96 lg:h-[500px] rounded-xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Modern apartment building"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
