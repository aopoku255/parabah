const { apiSlice } = require("../api/apiSlice");

export const shopApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getShop: builder.query({
            query: () => `/shop`,
        }),
        getShopById: builder.query({
            query: (id) => `/shop/${id}`,
        }),
        addShop: builder.mutation({
            query: (data) => ({
                url: "/shop/create-shop",
                method: "POST",
                body: data,
            }),
        }),
        updateShop: builder.mutation({
            query: (data) => ({
                url: `/shop/${data.id}`,
                method: "PUT",
                body: { ...data },
            }),
        }),
        deleteShop: builder.mutation({
            query: (id) => ({
                url: `/shop/${id}`,
                method: "DELETE",
            }),
        }),
    }),

});

export const {
    useGetShopQuery,
    useGetShopByIdQuery,
    useAddShopMutation,
    useUpdateShopMutation,
    useDeleteShopMutation,
} = shopApiSlice