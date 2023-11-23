import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    credentials: {},
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        credentials: (state, action) => {
            // Save token in Redux state
            state.credentials = action?.payload;
            // Save token in session storage
            sessionStorage.setItem('auth', JSON.stringify(action?.payload));
        },
        login: (state, action) => {
            // Save token in Redux state
            state.token = action.payload.token;
            // Save token in session storage
            sessionStorage.setItem('token', action.payload.token);
        },
    },
});

export const { credentials, login } = authSlice.actions;

export const selectCredentials = (state) => state.auth.credentials;

export default authSlice.reducer;
