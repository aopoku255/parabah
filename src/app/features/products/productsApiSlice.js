const { apiSlice } = require("../api/apiSlice");

export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => `/products`,
        }),
        getProductById: builder.query({
            query: (id) => `/products/${id}`,
        }),
        addProduct: builder.mutation({
            query: (data) => ({
                url: "/products/create-product",
                method: "POST",
                body: data,
            }),
        }),
        updateProduct: builder.mutation({
            query: (data) => ({
                url: `/products/${data.id}`,
                method: "PUT",
                body: { ...data },
            }),
        }),
        deleteProduct: builder.mutation({
            query: (id) => ({
                url: `/products/${id}`,
                method: "DELETE",
            }),
        }),
    }),

});

export const {
    useGetProductsQuery,
    useGetProductByIdQuery,
    useAddProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
} = productsApiSlice