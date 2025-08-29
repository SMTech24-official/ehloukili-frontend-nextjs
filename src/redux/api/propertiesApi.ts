/* eslint-disable @typescript-eslint/no-explicit-any */


import { baseApi } from "@/redux/api/baseApi";

export const propertiesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createProperty: builder.mutation({
      query: (data) => ({
        url: "/properties",
        method: "POST",
        body: data      ,
      }),
      invalidatesTags: ["properties","own-properties"],
    }),
    updateProperty: builder.mutation({
      query: (data:{data:any,id:string}) => ({
        url: `/properties/${data.id}`,
        method: "POST",
        body: data.data,
      }),
      invalidatesTags: ["properties", "own-properties"],
    }),
    getOwnProperties: builder.query<any, void>({
      query: () => ({
        url: `/properties`,
        method: "GET",
      }),
      providesTags: ["own-properties"],
    }),
    // deleteProperty
    deleteProperty: builder.mutation({
      query: (id) => ({
        url: `/properties/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["properties", "own-properties"],
    }),

})
})

export const {
    useCreatePropertyMutation,
    useUpdatePropertyMutation,
    useGetOwnPropertiesQuery,
    useDeletePropertyMutation
} = propertiesApi;
