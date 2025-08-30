/* eslint-disable @typescript-eslint/no-explicit-any */



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
    // get messages
    getMessages: builder.query<any, void>({
      query: () => ({
        url: `/me/messages`,
        method: "GET",
      }),
      providesTags: ["messages"],
    }),
  })
})

export const {
  useCreateMessageMutation,
  useGetMessagesQuery,
} = messageApi;
