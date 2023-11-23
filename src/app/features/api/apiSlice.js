import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { BASE_URL } from "../../../private/keys";

const baseQuery = fetchBaseQuery({
    baseUrl: "http://localhost:3001/api/v1",
    prepareHeaders: (headers, { getState }) => {
        const token = getState()?.auth?.results?.token;

        if (token) {
            headers.set("auth-token", token);
        }
        return headers;
    },
});

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery,
    endpoints: (builder) => ({}),
});

// export const { useGetLoginsQuery } = apiSlice;
