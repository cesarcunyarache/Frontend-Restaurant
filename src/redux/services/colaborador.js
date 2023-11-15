import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const reservasApi = createApi({
  reducerPath: "colaboradores",
  refetchOnFocus: true,
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost/api",
    credentials: "include",
  }),
  tagTypes: ["Colaborador"],
  endpoints: (builder) => ({
    getColaboradores: builder.query({
      query: () => "/colaborador/",
    }),
  }),
});

export const { useGetColaboradoresQuery } = reservasApi;
