'use client'
import PricingCard from "@/components/shared/PricingCard";
import Button from "@/components/ui/Button";
import { useDashboard } from "@/providers/DashboardProvider";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

  const PricingData = [
      {
          price: 400,
          name: "Basic Plan",
          description: "A basic plan for small businesses.",
          features: ["Feature 1", "Feature 2", "Feature 3"],
          popular: false,
          isEditButton: true,
      },
      {
          price: 800,
          name: "Standard Plan",
          description: "A standard plan for growing businesses.",
          features: ["Feature 1", "Feature 2", "Feature 3", "Feature 4"],
          popular: true,
          isEditButton: true,
      },
      {
          price: 1200,
          name: "Premium Plan",
          description: "A premium plan for large enterprises.",
          features: ["Feature 1", "Feature 2", "Feature 3", "Feature 4", "Feature 5"],
          popular: false,
          isEditButton: true,
      },
  ];

const PricingPage = () => {
     const { setPageTitle, setPageSubtitle } = useDashboard();
     const router = useRouter();
    
        useEffect(() => {
            setPageTitle('Pricing Plans');
            setPageSubtitle('Manage pricing plans');
        }, [setPageTitle, setPageSubtitle]);
    return (
      <div>
        <div className="flex justify-end mb-4">
            <Button onClick={() => router.push('/admin/pricing/add')} color="primary" className="flex items-center gap-2 !text-white">
                    <Plus size={20} />
                    <span>Add New Plan</span>
                </Button>
        </div>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:grid-cols-4">
            {PricingData.map((plan) => (
                <PricingCard
                    key={plan.name}
                    price={plan.price}
                    name={plan.name}
                    description={plan.description}
                    features={plan.features}
                    popular={plan.popular}
                    isButton={false}
                    isEditButton={plan.isEditButton}
                    onClick={() => router.push(`/admin/pricing/${1}`)}
                />
            ))}
        </div>
      </div>
    );
};

export default PricingPage;