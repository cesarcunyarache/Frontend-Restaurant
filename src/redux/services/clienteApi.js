import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const clienteApi = createApi({
  reducerPath: "clientes",
  refetchOnFocus: true,
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API,
    credentials: "include",
  }),
  tagTypes: ["clientes", "getSearchById"],
  endpoints: (builder) => ({
    getClientes: builder.query({
      query: () => "/cliente/",
      providesTags: ["clientes"],
    }),

    getUsuariosClientes: builder.query({
      query: () => "/clienteAuth/",
    }),


    getSearchById: builder.query({
      query: (id) => ({ url: `cliente/${id}` }),
      providesTags: (result, error, id) => [{ type: "getSearchById", id }],
    }),

    postCreate: builder.mutation({
      query: (data) => ({
        url: "cliente/",
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["clientes"],
    }),

    putUpdate: builder.mutation({
      query: (data) => ({
        url: "cliente/",
        method: "PUT",
        body: data,
        credentials: "include",
        headers: {
          'Content-Type': 'application/json', // Establece el Content-Type a application/json
        },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "clientes" },
        { type: "getSearchById", id },
      ],
    }),
  }),
});

export const { useGetClientesQuery, useGetUsuariosClientesQuery, usePostCreateMutation, useGetSearchByIdQuery, usePutUpdateMutation } = clienteApi;
