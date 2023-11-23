import { createSlice } from "@reduxjs/toolkit";
import { Exo } from "next/font/google";

export const productsSlice = createSlice({
    name: "product",
    initialState: {
        product: {},
    },
    reducers: {
        setProduct: (state, action) => {
            state.product = action.payload;
        },
    },
});

export const { setProduct } = productsSlice.actions;

export default productsSlice.reducer;