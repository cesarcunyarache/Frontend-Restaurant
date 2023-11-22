import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const meseroApi = createApi({
  reducerPath: "mesero",
  refetchOnFocus: true,
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API,
    credentials: "include",
  }),
  tagTypes: ["mesero", "getSearchByIdMesero"],
  endpoints: (builder) => ({

    getColaboradores: builder.query({
      query: () => "/colaborador/",
      providesTags: ["Colaboradores"],
    }),

    getSearchById: builder.query({
      query: (id) => ({ url: `colaborador/${id}` }),
      providesTags: (result, error, id) => [{ type: "getSearchByIdMesero", id }],
    }),

    postCreate: builder.mutation({
      query: (data) => ({
        url: "mesero/",
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["Colaboradores"],
    }),

    putUpdate: builder.mutation({
      query: (data) => ({
        url: "colaborador/",
        method: "PUT",
        body: data,
        credentials: "include",
        headers: {
          'Content-Type': 'application/json', // Establece el Content-Type a application/json
        },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Colaboradores" },
        { type: "getSearchById", id },
      ],
    }),
  }),
});

export const {
  useGetColaboradoresQuery,
  useGetSearchByIdQuery,
  usePostCreateMutation,
  usePutUpdateMutation,
} = meseroApi;
