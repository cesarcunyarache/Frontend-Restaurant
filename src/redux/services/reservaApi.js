import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const reservasApi = createApi({
  reducerPath: "reservas",
  refetchOnFocus: true,
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost/api",
    credentials: "include",
  }),
  tagTypes: ["Reserva"],
  endpoints: (builder) => ({
    getReservar: builder.query({
      query: () => "/reserva/",
    }),
  }),
});



export const { useGetReservarQuery } = reservasApi;
