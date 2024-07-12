import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: 'user',
  refetchOnFocus: true,
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API,
    credentials: "include",
    
  }),
  tagTypes: ["Profile"],
  endpoints: (builder) => ({
    postLogin: builder.mutation({
      query: (data) => ({
        url: "/colaboradorAuth/login",
        method: "POST",
        body: data,
      }),
    }),
    
    postForgetPassword: builder.mutation({
      query: (data) => ({
        url: "colaboradorAuth/forgetPassword",
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),

    putResetPassword: builder.mutation({
      query: (data) => ({
        url: "colaboradorAuth/resetPassword",
        method: "PUT",
        body: data,
        credentials: "include",
      }),
    }),

    postSendOTP: builder.mutation({
      query: (data) => ({
        url: "/colaboradorAuth/sendOtp",
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),

    postLogout: builder.mutation({
      query: () => ({
        url: "/clienteAuth/logout",
        method: "POST",
        credentials: "include",
      }),
    }),

    getProfile: builder.query({
      query: () => "/colaboradorAuth/profile/",
      providesTags: ["Profile"],
    }),

    getVerify: builder.query({
      query: () => "/clienteAuth/verify",
    }),

    postResendOTP: builder.mutation({
      query: (data) => ({
        url: "/clienteAuth/resendOtp",
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),

  }),
});


export const {
  usePostLoginMutation,
  useGetProfileQuery,
  useGetVerifyQuery,
  usePostSendOTPMutation,
  usePostResendOTPMutation,
  usePostForgetPasswordMutation,
  usePutResetPasswordMutation,
  usePostLogoutMutation,
} = userApi;
