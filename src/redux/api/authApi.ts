/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/api/baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["User"],
    }),
    register: builder.mutation({
      query: (credentials) => ({
        url: "/register-subscribe",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["User"],
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: "/profile",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    getMe: builder.query<any, void>({
      query: () => ({
        url: "/me",
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    logout: builder.mutation<any, any>({
      query: () => ({
        url: "/logout",
        method: "POST"
      }),
      invalidatesTags: ["User"],
    }),
    singleUser: builder.query<any, any>({
      query: (id) => ({
        url: `/users/${id}`,
        method: "GET",
      }),
      providesTags: ["single-User"],
    }),
    socialAuth: builder.mutation({
      query: (credentials) => ({
        url: "/auth/social-login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["User"],
    }),
    forgotPassword: builder.mutation({
      query: (email) => ({
        url: "/forgot-password",
        method: "POST",
        body: email,
      }),
      invalidatesTags: ["User"],
    }),
    resendOtp: builder.mutation({
      query: (email) => ({
        url: "/auth/resend-otp",
        method: "POST",
        body: email,
      }),
    }),
    verifyOtp: builder.mutation({
      query: (data) => ({
        url: "/verify-otp",
        method: "POST",
        body: data,
      }),
    }),
    resetPassword: builder.mutation({
      query: (data: { token: string, password: string }) => ({
        url: "/reset-password",
        method: "POST",
        body: { password: data.password },
      }),
    }),
    changePassword: builder.mutation({
      query: (data) => ({
        url: "/auth/change-password",
        method: "POST",
        body: data,
      }),
    }),
    updateUserByAdmin: builder.mutation({
      query: (data: { id: string, data: any }) => ({
        url: `/users/${data.id}`,
        method: "PATCH",
        body: data.data,
      }),
      invalidatesTags: ["User", "all-Users"],
    }),
    deleteUser: builder.mutation({
      query: (id: string) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User", "all-Users"],
    }),
    verifyUser: builder.mutation({
      query: (data: { id: string, isVerified: boolean }) => ({
        url: `/users/verify/${data.id}`,
        method: "PATCH",
        body: { isVerified: data.isVerified },
      }),
      invalidatesTags: ["User", "all-Users"],
    }),
    allAgents: builder.query<any, void>({
      query: () => ({
        url: `/admin/agents`,
        method: "GET",
      }),
      providesTags: ["all-Users"],
    }),
    allUsers: builder.query<any, void>({
      query: () => ({
        url: `/admin/users`,
        method: "GET",
      }),
      providesTags: ["all-Users"],
    }),
    // user details admin/user-details
    userDetailsByAdmin: builder.query<any, string>({
      query: (id) => ({
        url: `/admin/user-details/${id}`,
        method: "GET",
      }),
      providesTags: ["single-User"],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetMeQuery,
  useUpdateUserMutation,
  useLogoutMutation,
  useSocialAuthMutation,
  useForgotPasswordMutation,
  useResendOtpMutation,
  useVerifyOtpMutation,
  useResetPasswordMutation,
  useChangePasswordMutation,
  useUpdateUserByAdminMutation,
  useDeleteUserMutation,
  useVerifyUserMutation,
  useSingleUserQuery,
  useAllUsersQuery,
  useAllAgentsQuery,
  useUserDetailsByAdminQuery
} = authApi;
