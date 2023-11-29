import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const reservasApi = createApi({
  reducerPath: "reservas",
  refetchOnFocus: true,
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API,
    credentials: "include",
  }),
  tagTypes: ["Reservas"],
  endpoints: (builder) => ({
    getReservas: builder.query({
      query: () => "/reserva/",
      providesTags: ["Reservas"],
    }),

    getMesas: builder.query({
      query: () => "/reserva/mesas",
    }),

    getReservaById: builder.query({
      query: (id) => ({ url: `reserva/id/${id}` }),
    }),

    putUpdateReserva: builder.mutation({
      query: (data) => ({
        url: "reserva/update",
        method: "PUT",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["Reservas"],
    }),
  }),
});

export const {
  useGetReservasQuery,
  useGetReservaByIdQuery,
  useGetMesasQuery,
  usePutUpdateReservaMutation,
} = reservasApi;
