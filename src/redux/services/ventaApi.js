import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ventaApi = createApi({
    reducerPath: "ventas",
    refetchOnFocus: true,
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API,
        credentials: "include",
    }),
    tagTypes: ["Ventas"],
    endpoints: (builder) => ({
        getVentas: builder.query({
            query: () => "ventas/",
            providesTags: ["Ventas"],
        }),

        postCreateVenta: builder.mutation({
            query: (data) => ({
                url: "ventas/",
                method: "POST",
                body: data,
                credentials: "include",
            }),
            invalidatesTags: ["Ventas"],
        }),

    }),
});

export const {
    useGetVentasQuery,
    usePostCreateVentaMutation
} = ventaApi;
