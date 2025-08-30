


import { baseApi } from "@/redux/api/baseApi";

export const messageApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createMessage: builder.mutation({
      query: (data:{property_id:string,message:string}) => ({
        url: "/messages",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["messages"],
    }),
  })
})

export const {
  useCreateMessageMutation,
} = messageApi;
