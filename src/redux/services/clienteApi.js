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
  }),
});

export const { useGetClientesQuery, useGetUsuariosClientesQuery } = clienteApi;
