import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productoApi = createApi({
  reducerPath: "producto",
  refetchOnFocus: true,
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API,
    credentials: "include",
  }),
  tagTypes: ["productos", "getSearchByIdProducto",  "getColaboradoresNoMeseros"],
  endpoints: (builder) => ({

    getProductos: builder.query({
      query: () => "/producto/",
      providesTags: ["productos"],
    }),

    getSearchByIdProducto: builder.query({
      query: (id) => ({ url: `producto/${id}` }),
      providesTags: (result, error, id) => [{ type: "getSearchByIdProducto", id }],
    }),


    postCreateProducto: builder.mutation({
      query: (data) => ({
        url: "producto/",
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "productos" },
        { type: "getSearchByIdProducto", id },
     
      ],
    }),

    putUpdateProducto: builder.mutation({
      query: (data) => ({
        url: "producto/update/",
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "productos" },
        { type: "getSearchByIdProducto", id },
     
      ],
    }),
  }),
});

export const {
  useGetProductosQuery,
  useGetSearchByIdProductoQuery,
  usePostCreateProductoMutation,
  usePutUpdateProductoMutation,
} = productoApi ;
