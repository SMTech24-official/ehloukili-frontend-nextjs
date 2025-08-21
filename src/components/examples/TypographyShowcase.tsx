import * as React from 'react';
import { 
  Heading, 
  Text, 
  Display, 
  Lead, 
  Muted, 
  Subtitle, 
  SectionTitle 
} from '@/components/ui/Typography';

const TypographyShowcase: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-8 space-y-12">
      {/* Display Text */}
      <section>
        <SectionTitle>Display Text</SectionTitle>
        <div className="space-y-4">
          <Display size="sm">Real Estate Platform</Display>
          <Display size="md" color="primary">Your Dream Home</Display>
          <Display size="lg" color="secondary">Dometerra</Display>
        </div>
      </section>

      {/* Headings */}
      <section>
        <SectionTitle>Headings</SectionTitle>
        <div className="space-y-4">
          <Heading level={1}>Heading Level 1 - Hero Titles</Heading>
          <Heading level={2}>Heading Level 2 - Section Titles</Heading>
          <Heading level={3}>Heading Level 3 - Subsection Titles</Heading>
          <Heading level={4}>Heading Level 4 - Card Titles</Heading>
          <Heading level={5}>Heading Level 5 - Small Headings</Heading>
          <Heading level={6}>Heading Level 6 - Captions</Heading>
        </div>
      </section>

      {/* Text Variations */}
      <section>
        <SectionTitle>Text Variations</SectionTitle>
        <div className="space-y-4">
          <Lead>
            This is lead text - perfect for introductory paragraphs and important descriptions that need to stand out from regular body text.
          </Lead>
          
          <Text size="xl">
            Extra large text for important content that needs emphasis but isn&apos;t quite a heading.
          </Text>
          
          <Text size="lg">
            Large text for prominent content and descriptions.
          </Text>
          
          <Text>
            This is regular base text - the standard size for most body content and descriptions throughout the application.
          </Text>
          
          <Text size="sm">
            Small text for secondary information, metadata, and supplementary content.
          </Text>
          
          <Muted>
            Muted text for less important information, timestamps, and subtle details.
          </Muted>
        </div>
      </section>

      {/* Color Variations */}
      <section>
        <SectionTitle>Color Variations</SectionTitle>
        <div className="space-y-2">
          <Text color="default">Default text color</Text>
          <Text color="muted">Muted text color</Text>
          <Text color="light">Light text color</Text>
          <Text color="primary">Primary brand color</Text>
          <Text color="secondary">Secondary brand color</Text>
          <Text color="success">Success message color</Text>
          <Text color="warning">Warning message color</Text>
          <Text color="error">Error message color</Text>
          <Text color="info">Info message color</Text>
        </div>
      </section>

      {/* Weight Variations */}
      <section>
        <SectionTitle>Font Weights</SectionTitle>
        <div className="space-y-2">
          <Text weight="light">Light weight text</Text>
          <Text weight="normal">Normal weight text</Text>
          <Text weight="medium">Medium weight text</Text>
          <Text weight="semibold">Semibold weight text</Text>
          <Text weight="bold">Bold weight text</Text>
        </div>
      </section>

      {/* Alignment */}
      <section>
        <SectionTitle>Text Alignment</SectionTitle>
        <div className="space-y-4">
          <Text align="left">Left aligned text</Text>
          <Text align="center">Center aligned text</Text>
          <Text align="right">Right aligned text</Text>
          <Text align="justify">
            Justified text that spreads out evenly across the full width of the container. This is useful for formal documents and articles where even text distribution is desired.
          </Text>
        </div>
      </section>

      {/* Specialized Components */}
      <section>
        <SectionTitle>Specialized Components</SectionTitle>
        <div className="space-y-6">
          <div>
            <Heading level={3} className="mb-2">Subtitle Component</Heading>
            <Subtitle>
              This is a subtitle component - perfect for section descriptions and introductory text that appears below headings.
            </Subtitle>
          </div>
          
          <div>
            <Heading level={3} className="mb-2">SectionTitle Component</Heading>
            <Text>The SectionTitle component provides consistent styling for section headings throughout the application.</Text>
          </div>
        </div>
      </section>

      {/* Real Estate Examples */}
      <section>
        <SectionTitle>Real Estate Content Examples</SectionTitle>
        <div className="space-y-8">
          {/* Property Card Example */}
          <div className="bg-white p-6 rounded-lg border">
            <Heading level={4} className="mb-2">Modern Downtown Apartment</Heading>
            <Text color="muted" size="sm" className="mb-3">123 Main Street, Downtown</Text>
            <Lead className="mb-4">
              Luxurious 2-bedroom apartment with stunning city views and modern amenities.
            </Lead>
            <div className="flex gap-4 mb-4">
              <Text size="sm"><strong>2</strong> Bedrooms</Text>
              <Text size="sm"><strong>2</strong> Bathrooms</Text>
              <Text size="sm"><strong>1,200</strong> sq ft</Text>
            </div>
            <Text color="primary" weight="bold" size="lg">$2,500/month</Text>
          </div>

          {/* Agent Profile Example */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <Heading level={4} className="mb-2">Sarah Johnson</Heading>
            <Text color="secondary" weight="medium" className="mb-3">Senior Real Estate Agent</Text>
            <Text className="mb-4">
              With over 10 years of experience in the real estate market, Sarah has helped hundreds of families find their perfect home.
            </Text>
            <Muted>Contact: sarah.johnson@dometerra.com | (555) 123-4567</Muted>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TypographyShowcase;
