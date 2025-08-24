/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
} from "chart.js";
import React from "react";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface BookingChartProps {
    data?: number[];
    labels?: string[];
}

const BookingChart: React.FC<BookingChartProps> = ({ data = [], labels = [] }) => {
    // Fallbacks to prevent runtime errors
    const safeLabels = Array.isArray(labels) ? labels : [];
    const safeData = Array.isArray(data) ? data : [];
    const isValid = Array.isArray(safeLabels) && Array.isArray(safeData) && safeLabels.length > 0 && safeData.length > 0 && safeLabels.length === safeData.length;

    const chartData = {
        labels: safeLabels,
        datasets: [
            {
                label: "Bookings",
                data: safeData,
                borderColor: "#14B8A6",
                backgroundColor: (context: any) => {
                    const chart = context.chart;
                    const { ctx, chartArea } = chart;
                    if (!chartArea) {
                        return null;
                    }
                    const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
                    gradient.addColorStop(0, 'rgba(20,184,166,0.3)');
                    gradient.addColorStop(0.7, 'rgba(239,68,68,0.2)'); // Red color transition
                    gradient.addColorStop(1, 'rgba(239,68,68,0.4)'); // Red color at bottom
                    return gradient;
                },
                tension: 0.4,
                fill: true, // This makes it area chart
                pointRadius: 4,
                pointHoverRadius: 6,
                pointBackgroundColor: "#FFFFFF",
                pointBorderColor: "#14B8A6",
                pointBorderWidth: 3,
                pointHoverBackgroundColor: "#14B8A6",
                pointHoverBorderColor: "#FFFFFF",
                pointHoverBorderWidth: 2,
                borderWidth: 2,
            },
        ],
    };

    return (
        <div className="bg-white dark:bg-[var(--color-neutral-900)] rounded-xl border border-gray-100 dark:border-[var(--color-neutral-800)] p-5">
            <div className="flex justify-between items-center mb-2">
                <div className="font-semibold text-[var(--color-neutral-900)] dark:text-[var(--color-neutral-50)]">
                    Booking Overview
                </div>
                <select className="bg-[var(--color-neutral-100)] dark:bg-[var(--color-neutral-800)] text-xs rounded px-2 py-1 border border-gray-200 dark:border-[var(--color-neutral-700)]">
                    <option>Today</option>
                    <option>This Week</option>
                    <option>This Month</option>
                </select>
            </div>
            {isValid ? (
                <Line
                    data={chartData}
                    options={{
                        responsive: true,
                        plugins: {
                            legend: { display: false },
                            tooltip: {
                                mode: 'index',
                                intersect: false,
                            },
                        },
                        scales: {
                            x: {
                                grid: {
                                    color: "#F3F4F6",
                                },
                                ticks: {
                                    color: "#6B7280",
                                    font: {
                                        size: 12,
                                        weight: 500,
                                    },
                                },
                            },
                            y: {
                                grid: {
                                    color: "#F3F4F6",
                                },
                                ticks: {
                                    color: "#6B7280",
                                    font: {
                                        size: 12,
                                        weight: 500,
                                    },
                                },
                                beginAtZero: true,
                            },
                        },
                        elements: {
                            point: {
                                hoverRadius: 8,
                            },
                        },
                        interaction: {
                            intersect: false,
                            mode: 'index',
                        },
                    }}
                    height={180}
                />
            ) : (
                <div className="text-center text-[var(--color-neutral-500)] dark:text-[var(--color-neutral-400)] py-8">
                    No booking data available.
                </div>
            )}
        </div>
    );
};

export default BookingChart;