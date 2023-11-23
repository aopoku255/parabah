import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './features/api/apiSlice';
import authReducer from './features/Auth/authSlice';
import shopReducer from './features/Shop/shopSlice';
import productReducer from './features/products/productsSlice';
const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
        shop: shopReducer,
        products: productReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;
