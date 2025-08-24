"use client";
import BookingList from "@/components/shared/BookingList";
import BookingTimeline from "@/components/shared/BookingTimeline";
import StatCard from "@/components/shared/StatCard";
import { BarChart2, Home, Tag, Users } from "lucide-react";
import dynamic from "next/dynamic";

const BookingChart = dynamic(() => import("@/components/shared/BookingChart"), { ssr: false });

const stats = [
    { icon: <Home size={24} />, label: "Total Properties", value: 560 },
    { icon: <BarChart2 size={24} />, label: "Total Booking Properties", value: 1050 },
    { icon: <Tag size={24} />, label: "Today Booking Properties", value: 470 },
    { icon: <Users size={24} />, label: "Total Tenants", value: 250 },
];

const timelineEvents = [
    { time: "09:30", title: "Serenity at Whispering Pines Retreat", status: "Completed Booking", date: "Today, 06 July 2025" },
    { time: "09:30", title: "Serenity at Whispering Pines Retreat", status: "Completed Booking", date: "Today, 06 July 2025" },
    { time: "09:30", title: "Serenity at Whispering Pines Retreat", status: "Completed Booking", date: "Wednesday, 06 July 2025" },
    { time: "09:30", title: "Serenity at Whispering Pines Retreat", status: "Completed Booking", date: "Wednesday, 06 July 2025" },
    { time: "09:30", title: "Home Cleaning", status: "Completed Booking", date: "Monday, 06 July 2025" },
];

const bookingList = [
    {
        name: "Serenity at Whispering Pines Retreat",
        location: "5891 Ranchview Dr: Richardson, California",
        date: "01 March 2024",
        guest: "New Jersey",
        image: "/images/homePage/apartment.svg",
    },
];

const chartData = [60, 80, 65, 90, 70, 85, 75];
const chartLabels = ["Mon", "Tue", "Web", "Thu", "Fri", "Sat", "Sun"];

export default function AgentDashboardPage() {
    return (
        <div className="flex flex-col gap-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats?.map((stat) => (
                    <StatCard key={stat.label} {...stat} />
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Chart */}
                <div className="lg:col-span-2">
                    <BookingChart data={chartData} labels={chartLabels} />
                </div>
                {/* Timeline */}
                <div>
                    <BookingTimeline events={timelineEvents} />
                </div>
            </div>

            {/* Booking List */}
            <div>
                <div className="mb-2 font-semibold text-lg text-[var(--color-neutral-900)] dark:text-[var(--color-neutral-50)]">Properties Booking List</div>
                <BookingList items={Array(7).fill(bookingList[0])} />
            </div>
        </div>
    );
}
