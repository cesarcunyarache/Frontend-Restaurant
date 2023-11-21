import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const usuariosApi = createApi({
  reducerPath: "usuarios",
  refetchOnFocus: true,
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API,
    credentials: "include",
  }),
  tagTypes: ["Usuarios", "getUserById"],
  endpoints: (builder) => ({
    getUsuarios: builder.query({
      query: () => "/colaboradorAuth/",
      providesTags: ["Usuarios"],
    }),

    getUserById: builder.query({
      query: (id) => ({ url: `colaboradorAuth/${id}` }),
      providesTags: (result, error, id) => [{ type: "getUserById", id }],
    }),

    postRegister: builder.mutation({
      query: (data) => ({
        url: "/colaboradorAuth/register",
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),

    postSendOTPUpdateEmail: builder.mutation({
      query: (data) => ({
        url: "colaboradorAuth/sendOtpUpdateEmail",
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),

    putUpdateEmail: builder.mutation({
      query: (data) => ({
        url: "colaboradorAuth/updateEmail",
        method: "PUT",
        body: data,
        credentials: "include",
      }),
    }),

    putUpdatePassword: builder.mutation({
      query: (data) => ({
        url: "colaboradorAuth/updatePassword",
        method: "PUT",
        body: data,
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useGetUsuariosQuery,
  usePostRegisterMutation,
  useGetUserByIdQuery,
  usePostSendOTPUpdateEmailMutation,
  usePutUpdateEmailMutation,
  usePutUpdatePasswordMutation,
} = usuariosApi;
