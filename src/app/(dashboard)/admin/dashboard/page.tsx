/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import BookingList from "@/components/shared/BookingList";
import BookingTimeline from "@/components/shared/BookingTimeline";
import StatCard from "@/components/shared/StatCard";
import { useDashboard } from "@/providers/DashboardProvider";
import { useLoading } from "@/providers/LoadingProvider";
import { BarChart2, DollarSignIcon, Home, Tag, Users } from "lucide-react";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import { useGetAdminStatsQuery } from '@/redux/api/adminApi';
import { useGetAllPropertiesQuery } from '@/redux/api/propertiesApi';
import { Text } from '@/components/ui/Typography';

const BookingChart = dynamic(() => import("@/components/shared/BookingChart"), { ssr: false });

interface Property {
  id: number;
  street_address: string;
  city: string;
  country: string;
  property_type: string;
  created_at: string;
  photos: { url: string }[];
}

interface AdminStats {
  success: boolean;
  total_agents: number;
  total_users: number;
  total_properties: number;
  subscription_income: string;
  property_listing_overview: { date: string; count: number }[];
}

const AdminDashboardPage = () => {
  const { setPageSubtitle, setPageTitle } = useDashboard();
  const { setLoading, setLoadingText } = useLoading();
  const { data: statsData, isLoading: statsLoading, error: statsError } = useGetAdminStatsQuery(undefined);
  const { data: propertiesData, isLoading: propertiesLoading, error: propertiesError } = useGetAllPropertiesQuery({ isActive: true, per_page: 100000 });

  useEffect(() => {
    setPageTitle("Hello Admin 👋🏻");
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      setPageSubtitle("Good Morning");
    } else if (currentHour < 18) {
      setPageSubtitle("Good Afternoon");
    } else {
      setPageSubtitle("Good Evening");
    }
  }, [setPageTitle, setPageSubtitle]);

  useEffect(() => {
    if (statsLoading || propertiesLoading) {
      setLoadingText('Loading dashboard...');
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [statsLoading, propertiesLoading, setLoading, setLoadingText]);

  if (statsError || propertiesError) {
    let errorMessage = 'An error occurred while loading dashboard data.';
    if (statsError && 'message' in statsError && typeof statsError.message === 'string') {
      errorMessage = statsError.message;
    } else if (statsError && 'status' in statsError && typeof statsError.status === 'number') {
      errorMessage = `Error code: ${statsError.status}`;
    }
    if (propertiesError && 'message' in propertiesError && typeof propertiesError.message === 'string') {
      errorMessage = propertiesError.message;
    } else if (propertiesError && 'status' in propertiesError && typeof propertiesError.status === 'number') {
      errorMessage = `Error code: ${propertiesError.status}`;
    }
    return (
      <div className="container mx-auto px-4 py-8 flex items-center justify-center h-screen">
        <Text color="error">{errorMessage}</Text>
      </div>
    );
  }

  const stats = statsData?.success ? [
    { icon: <Home size={24} />, label: "Total Properties", value: statsData.total_properties || 0 },
    { icon: <BarChart2 size={24} />, label: "Total Agents", value: statsData.total_agents || 0 },
    { icon: <Users size={24} />, label: "Total Users", value: statsData.total_users || 0 },
    { icon: <DollarSignIcon size={24} />, label: "Subscription Income", value: statsData.subscription_income ? `$${statsData.subscription_income}` : '$0.00' },
  ] : [];

  const chartData = statsData?.success && statsData.property_listing_overview
    ? statsData.property_listing_overview.map((item:any) => item.count)
    : [];
  const chartLabels = statsData?.success && statsData.property_listing_overview
    ? statsData.property_listing_overview.map((item:any) => new Date(item.date).toLocaleDateString('en-US', { weekday: 'short' }))
    : [];

  const allProperties = propertiesData?.data && Array.isArray(propertiesData.data) ? propertiesData.data : [];
  const recentProperties = allProperties.slice(-7);

  const bookingList = recentProperties.map((property: Property) => ({
    name: property.street_address || 'Unnamed Property',
    location: `${property.city || 'Unknown'}, ${property.country || 'Unknown'}`,
    date: property.created_at ? new Date(property.created_at).toLocaleDateString() : 'N/A',
    guest: property.property_type || 'N/A',
    image: property.photos?.[0]?.url ? `${process.env.NEXT_PUBLIC_IMAGE_URL}${property.photos[0].url}` : '/images/homePage/apartment.svg',
    id: property.id,
  }));

  const timelineEvents = bookingList.slice(0, 5).map((booking: any) => ({
    time: "09:30", // Static time as per original code; consider dynamic time if available
    title: booking.name,
    status: "Active Listing",
    date: new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
  }));

  return (
    <div className="flex flex-col gap-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.length > 0 ? (
          stats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))
        ) : (
          <Text color="secondary">No statistics available</Text>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <div className="lg:col-span-2">
          {chartData.length > 0 && chartLabels.length > 0 ? (
            <BookingChart data={chartData} labels={chartLabels} />
          ) : (
            <Text color="secondary">No chart data available</Text>
          )}
        </div>
        {/* Timeline */}
        <div>
          {timelineEvents.length > 0 ? (
            <BookingTimeline events={timelineEvents} />
          ) : (
            <Text color="secondary">No timeline events available</Text>
          )}
        </div>
      </div>

      {/* Booking List */}
      <div>
        <div className="mb-2 font-semibold text-lg text-[var(--color-neutral-900)] dark:text-[var(--color-neutral-50)]">Recent Properties</div>
        {bookingList.length > 0 ? (
          <BookingList items={bookingList} />
        ) : (
          <Text color="secondary">No recent properties found</Text>
        )}
      </div>
    </div>
  );
};

export default AdminDashboardPage;