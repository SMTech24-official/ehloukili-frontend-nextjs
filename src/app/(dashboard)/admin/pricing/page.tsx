/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import PricingCard from "@/components/shared/PricingCard";
import Button from "@/components/ui/Button";
import { useDashboard } from "@/providers/DashboardProvider";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useLoading } from '@/providers/LoadingProvider';
import Spinner from '@/components/ui/Spinner';
import { useGetPlansQuery } from "@/redux/api/subscriptionPackage";




const PricingPage = () => {
    const { setPageTitle, setPageSubtitle } = useDashboard();
    const router = useRouter();
    const { data, isLoading, isError } = useGetPlansQuery();
    const { setLoading, setLoadingText } = useLoading();
    // Show global loading overlay while fetching plans
    useEffect(() => {
        if (isLoading) {
            setLoadingText('Loading plans...');
            setLoading(true);
        } else {
            setLoading(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading]);

    useEffect(() => {
        setPageTitle('Pricing Plans');
        setPageSubtitle('Manage pricing plans');
    }, [setPageTitle, setPageSubtitle]);

    let content = null;
    if (isLoading) {
        content = (
            <div className="flex justify-center items-center min-h-[200px]">
                <Spinner size={32} />
            </div>
        );
    } else if (isError) {
        content = (
            <div className="text-center text-red-500 py-8">Failed to load plans. Please try again later.</div>
        );
    } else if (!data?.data?.length) {
        content = (
            <div className="text-center text-gray-500 py-8">No plans found.</div>
        );
    } else {
        content = (
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:grid-cols-4">
                {data.data.map((plan: any) => (
                    <PricingCard
                        key={plan.id}
                        price={plan.price}
                        name={plan.name}
                        description={plan.description}
                        features={plan.features}
                        popular={plan.popular || false}
                        isButton={false}
                        isEditButton={true}
                        onClick={() => router.push(`/admin/pricing/${plan.id}`)}
                    />
                ))}
            </div>
        );
    }

    return (
        <div>
            <div className="flex justify-end mb-4">
                <Button onClick={() => router.push('/admin/pricing/add')} color="primary" className="flex items-center gap-2 !text-white">
                    <Plus size={20} />
                    <span>Add New Plan</span>
                </Button>
            </div>
            {content}
        </div>
    );
};

export default PricingPage;