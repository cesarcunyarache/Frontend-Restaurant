import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const categoriaApi = createApi({
  reducerPath: "categoria",
  refetchOnFocus: true,
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API,
    credentials: "include",
  }),
  tagTypes: ["categorias", "getSearchByIdcategoria",  "getColaboradoresNoMeseros"],
  endpoints: (builder) => ({

    getCategorias: builder.query({
      query: () => "/categoria/",
      providesTags: ["categorias"],
    }),

    getSearchByIdCategoria: builder.query({
      query: (id) => ({ url: `categoria/${id}` }),
      providesTags: (result, error, id) => [{ type: "getSearchByIdcategoria", id }],
    }),

    postCreateCategoria: builder.mutation({
      query: (data) => ({
        url: "categoria/",
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "categorias" },
        { type: "getSearchByIdcategoria", id },
     
      ],
    }),

    putUpdateCategoria: builder.mutation({
      query: (data) => ({
        url: "categoria/update/",
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "categorias" },
        { type: "getSearchByIdcategoria", id },
     
      ],
    }),
  }),
});

export const {
  useGetCategoriasQuery,
  useGetSearchByIdCategoriaQuery,
  usePostCreateCategoriaMutation,
  usePutUpdateCategoriaMutation,
} = categoriaApi ;
