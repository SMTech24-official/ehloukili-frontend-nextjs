/* eslint-disable @typescript-eslint/no-explicit-any */

import { baseApi } from "@/redux/api/baseApi";

export const contactApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createContact: builder.mutation({
      query: (data) => ({
        url: "/contact",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["contact"],
    }),
    getAllContacts: builder.query<any, void>({
      query: () => ({
        url: `/get-all-contact`,
        method: "GET",
      }),
      providesTags: ["contact"],
    }),
  })
})

export const {
  useCreateContactMutation,
  useGetAllContactsQuery,
} = contactApi;
