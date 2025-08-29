/* eslint-disable @typescript-eslint/no-explicit-any */


import { baseApi } from "@/redux/api/baseApi";

interface PropertyFilters {
  city?: string;
  country?: string;
  property_type?: string;
  property_status?: string;
  isHomePageView?: boolean;
  listing_type?: 'rent' | 'sale';
  isActive?: boolean;
  min_price?: number;
  max_price?: number;
  bedrooms?: number;
  bathrooms?: number;
  per_page?: number;
  page?: number;
}

export const propertiesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createProperty: builder.mutation({
      query: (data) => ({
        url: "/properties",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["properties", "own-properties", "all-properties"],
    }),
    updateProperty: builder.mutation({
      query: (data: { data: any, id: string }) => ({
        url: `/properties/${data.id}`,
        method: "POST",
        body: data.data,
      }),
      invalidatesTags: ["properties", "own-properties", "all-properties"],
    }),
    getOwnProperties: builder.query<any, void>({
      query: () => ({
        url: `/properties`,
        method: "GET",
      }),
      providesTags: ["own-properties"],
    }),
    getAllProperties: builder.query<any, PropertyFilters>({
      query: (filters) => ({
        url: `/properties/public`,
        method: "GET",
        params: filters,
      }),
      providesTags: ["all-properties"],
    }),
    // getSingle Property
    getSingleProperty: builder.query<any, string>({
      query: (id) => ({
        url: `/properties/${id}`,
        method: "GET",
      }),
      providesTags: ["properties"],
    }),
    // deleteProperty
    deleteProperty: builder.mutation({
      query: (id) => ({
        url: `/properties/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["properties", "own-properties", "all-properties"],
    }),
    // status change
    changePropertyStatus: builder.mutation({
      query: (data: { id: string; statusData: { isActive?: boolean; isHomePageView?: boolean } }) => ({
        url: `/properties/${data.id}/admin-update`,
        method: "PATCH",
        body: data.statusData,
      }),
      invalidatesTags: ["properties", "own-properties", "all-properties"],
    }),

  })
})

export const {
  useCreatePropertyMutation,
  useUpdatePropertyMutation,
  useGetOwnPropertiesQuery,
  useGetAllPropertiesQuery,
  useGetSinglePropertyQuery,
  useDeletePropertyMutation,
  useChangePropertyStatusMutation,
} = propertiesApi;
