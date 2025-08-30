/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import { useGetValueTrackingQuery, useGetMarketTrendsQuery } from "@/redux/api/adminApi";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, BarChart, Bar } from "recharts";

const MarketTrendsPage = () => {
    const { data: valueTracking, isLoading: loadingValue } = useGetValueTrackingQuery();
    const { data: marketTrends, isLoading: loadingTrends } = useGetMarketTrendsQuery();

    return (
        <div className="max-w-5xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Market Trends</h1>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-white shadow rounded p-4 flex flex-col items-center">
                    <div className="text-gray-500 text-sm mb-1">Avg. Price per Sqft</div>
                    <div className="text-2xl font-semibold text-blue-700">
                        {loadingTrends ? "--" : marketTrends?.average_price_per_sqft ?? '--'}
                    </div>
                </div>
                <div className="bg-white shadow rounded p-4 flex flex-col items-center">
                    <div className="text-gray-500 text-sm mb-1">Active Listings</div>
                    <div className="text-2xl font-semibold text-blue-700">
                        {loadingTrends ? "--" : marketTrends?.total_active_listings ?? '--'}
                    </div>
                </div>
                <div className="bg-white shadow rounded p-4 flex flex-col items-center">
                    <div className="text-gray-500 text-sm mb-1">Trend % (6mo)</div>
                    <div className="text-2xl font-semibold text-blue-700">
                        {loadingTrends ? "--" : (marketTrends?.trend_percent !== null ? `${marketTrends.trend_percent}%` : '--')}
                    </div>
                </div>
            </div>

            {/* Market Trend Chart */}
            <div className="bg-white shadow rounded p-6 mb-8">
                <h2 className="text-lg font-semibold mb-4">Market Price Trend</h2>
                {loadingTrends ? (
                    <div className="text-center py-8">Loading chart...</div>
                ) : marketTrends?.trend?.length ? (
                    <ResponsiveContainer width="100%" height={320}>
                        <LineChart data={marketTrends.trend} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="avg_price_sqft" name="Avg Price/Sqft" stroke="#2563eb" strokeWidth={2} />
                            <Bar dataKey="total_listings" name="Listings" fill="#60a5fa" barSize={24} />
                        </LineChart>
                    </ResponsiveContainer>
                ) : (
                    <div className="text-center text-gray-500">No trend data available.</div>
                )}
            </div>

            {/* Value Tracking Table */}
            <div className="bg-white shadow rounded p-6">
                <h2 className="text-lg font-semibold mb-4">Your Properties Value Tracking</h2>
                {loadingValue ? (
                    <div className="text-center py-8">Loading properties...</div>
                ) : valueTracking?.properties?.length ? (
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-sm">
                            <thead>
                                <tr className="bg-gray-50">
                                    <th className="px-4 py-2 text-left">Property ID</th>
                                    <th className="px-4 py-2 text-left">Title</th>
                                    <th className="px-4 py-2 text-left">Latest Value</th>
                                    <th className="px-4 py-2 text-left">6mo % Change</th>
                                    <th className="px-4 py-2 text-left">History</th>
                                </tr>
                            </thead>
                            <tbody>
                                {valueTracking.properties.map((p: any) => (
                                    <tr key={p.property_id} className="border-b">
                                        <td className="px-4 py-2">{p.property_id}</td>
                                        <td className="px-4 py-2">{p.title}</td>
                                        <td className="px-4 py-2">{p.latest_estimated_value ?? '--'}</td>
                                        <td className={`px-4 py-2 ${p.percent_change_6_months > 0 ? 'text-green-600' : p.percent_change_6_months < 0 ? 'text-red-600' : ''}`}>
                                            {p.percent_change_6_months !== null ? `${p.percent_change_6_months}%` : '--'}
                                        </td>
                                        <td className="px-4 py-2">
                                            {Array.isArray(p.trend_history) && p.trend_history.length ? (
                                                <span className="text-blue-600 cursor-pointer" title="View history">{p.trend_history.length} records</span>
                                            ) : '--'}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="text-center text-gray-500">No property value tracking data available.</div>
                )}
            </div>
        </div>
    );
};

export default MarketTrendsPage;