/* eslint-disable @typescript-eslint/no-explicit-any */

import { baseApi } from "@/redux/api/baseApi";

export const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // get admin stats
    getAdminStats: builder.query<any, void>({
      query: () => ({
        url: `/admin/stats/overview`,
        method: "GET",
      }),
      providesTags: ["admin-stats"],
    }),
    getAgentStats: builder.query<any, void>({
      query: () => ({
        url: `/agent/stats`,
        method: "GET",
      }),
      providesTags: ["agent-stats"],
    }),
    getPropertyTypeCounts: builder.query<any, void>({
      query: () => ({
        url: `/property-type-counts`,
        method: "GET",
      }),
      providesTags: ["property-type-counts"],
    }),
    getValueTracking: builder.query<any, void>({
      query: () => ({
        url: `/dashboard/value-tracking`,
        method: "GET",
      }),
      providesTags: ["value-tracking"],
    }),
    getMarketTrends: builder.query<any, void>({
      query: () => ({
        url: `/dashboard/market-trends`,
        method: "GET",
      }),
      providesTags: ["market-trends"],
    }),
  })
})

export const {
    useGetAdminStatsQuery,
  useGetAgentStatsQuery,
  useGetPropertyTypeCountsQuery,
  useGetValueTrackingQuery,
  useGetMarketTrendsQuery,
} = adminApi;
