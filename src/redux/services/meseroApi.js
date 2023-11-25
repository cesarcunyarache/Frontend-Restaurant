import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const meseroApi = createApi({
  reducerPath: "mesero",
  refetchOnFocus: true,
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API,
    credentials: "include",
  }),
  tagTypes: ["meseros", "getSearchByIdMesero",  "getColaboradoresNoMeseros"],
  endpoints: (builder) => ({

    getMeseros: builder.query({
      query: () => "/mesero/",
      providesTags: ["meseros"],
    }),

    getColaboradoresNoMeseros: builder.query({
      query: () => "/colaborador/NoMesero",
      providesTags: (result, error, id) => [{ type: "getColaboradoresNoMeseros", id }],
    }),

    getSearchByIdColaborador: builder.query({
      query: (id) => ({ url: `mesero/${id}` }),
      providesTags: (result, error, id) => [{ type: "getSearchByIdMesero", id }],
    }),

    postCreateMesero: builder.mutation({
      query: (data) => ({
        url: "mesero/",
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "meseros" },
        { type: "getSearchByIdMesero", id },
        { type: "getColaboradoresNoMeseros", id },
      ],
    }),

    putUpdateMesero: builder.mutation({
      query: (data) => ({
        url: "mesero/update",
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "meseros" },
        { type: "getSearchByIdMesero", id },
        { type: "getColaboradoresNoMeseros", id },
      ],
    }),
  }),
});

export const {
  useGetMeserosQuery,
  useGetSearchByIdColaboradorQuery,
  useGetColaboradoresNoMeserosQuery,
  usePostCreateMeseroMutation,
  usePutUpdateMeseroMutation,
} = meseroApi;
