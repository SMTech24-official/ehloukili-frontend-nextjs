/* eslint-disable @typescript-eslint/no-explicit-any */

import { baseApi } from "@/redux/api/baseApi";

export const subscriptionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createPlan: builder.mutation({
      query: (data) => ({
        url: "/subscription-packages",
        method: "POST",
        body: data      ,
      }),
      invalidatesTags: ["plan","singlePlan","agentSubscriptions"],
    }),
    updatePlan: builder.mutation({
      query: (data: { id: string; data: any }) => ({
        url: `/subscription-packages/${data.id}`,
        method: "PUT",
        body: data?.data,
      }),
      invalidatesTags: ["plan","singlePlan","agentSubscriptions"],
    }),
    getPlans: builder.query<any, void>({
      query: () => ({
        url: "/subscription-packages",
        method: "GET",
      }),
      providesTags: ["plan"],
    }),
    getSinglePlan: builder.query<any, string>({
      query: (id) => ({
        url: `/subscription-packages/${id}`,
        method: "GET",
      }),
      providesTags: ["singlePlan"],
    }),
      createSubscription: builder.mutation({
      query: (data) => ({
        url: "/subscription",
        method: "POST",
        body: data      ,
      }),
      invalidatesTags: ["subscription","agentSubscriptions"],
    }),
      getAgentSubscriptions: builder.query<any, void>({
      query: () => ({
        url: `/agent-subscriptions`,
        method: "GET",
      }),
      providesTags: ["agentSubscriptions"],
    }),
})
})

export const {
  useCreatePlanMutation,
  useUpdatePlanMutation,
  useGetPlansQuery,
  useGetSinglePlanQuery,
  useCreateSubscriptionMutation,
  useGetAgentSubscriptionsQuery,
} = subscriptionApi;
