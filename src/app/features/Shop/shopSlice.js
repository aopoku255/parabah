const { createSlice } = require("@reduxjs/toolkit");

const initialState = {}

const shopSlice = createSlice({
    name: "shop",
    initialState,
    reducers: {
        setShop: (state, action) => {
            state.shop = action.payload
        }
    }
})