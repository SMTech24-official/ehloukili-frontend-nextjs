import React from 'react';

const RentPage = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mt-10 text-[var(--color-primary-600)]">
                Properties for Rent
            </h1>
            <p className="text-center mt-4 text-gray-600 max-w-2xl mx-auto">
                Discover amazing rental properties tailored to your lifestyle. From cozy apartments to spacious family homes.
            </p>
            
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Placeholder for rental properties */}
                <div className="bg-white rounded-lg shadow-md p-6 border">
                    <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                    <h3 className="text-lg font-semibold mb-2">Modern Apartment</h3>
                    <p className="text-gray-600 mb-2">2 Bedrooms • 1 Bathroom</p>
                    <p className="text-[var(--color-secondary-600)] font-bold">$1,200/month</p>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-6 border">
                    <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                    <h3 className="text-lg font-semibold mb-2">Family House</h3>
                    <p className="text-gray-600 mb-2">3 Bedrooms • 2 Bathrooms</p>
                    <p className="text-[var(--color-secondary-600)] font-bold">$1,800/month</p>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-6 border">
                    <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                    <h3 className="text-lg font-semibold mb-2">Studio Loft</h3>
                    <p className="text-gray-600 mb-2">1 Bedroom • 1 Bathroom</p>
                    <p className="text-[var(--color-secondary-600)] font-bold">$900/month</p>
                </div>
            </div>
            
            <div className="text-center mt-12">
                <p className="text-gray-500">More rental properties coming soon...</p>
            </div>
        </div>
    );
};

export default RentPage;
