import { apiSlice } from "../api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        signup: builder.mutation({
            query: (data) => ({
                url: "/guest-signup",
                method: "POST",
                body: { ...data },
            }),
        }),
        adminsignup: builder.mutation({
            query: (data) => ({
                url: "/admin-signup",
                method: "POST",
                body: { ...data },
            }),
        }),
        login: builder.mutation({
            query: (data) => ({
                url: "/signin",
                method: "POST",
                body: { ...data },
            }),
        }),
        // logout: builder.mutation({
        //     query: () => ({
        //         url: `/api/auth/logout`,
        //         method: "POST",
        //     }),
        // }),
        // getMe: builder.query({
        //     query: () => `/api/auth/me`,
        // }),
    }),
    overrideExisting: false,
});

export const {
    useSignupMutation,
    useAdminsignupMutation,
    useLoginMutation,
    // useLogoutMutation,
    // useGetMeQuery,
} = authApiSlice;