import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import IUserData from '../interface/userData';

const authApi = createApi({
    reducerPath: "authApi",
    tagTypes: ["auth"],
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:4000/v1/",
    }),
    endpoints: builder => ({

        login: builder.mutation({
            query: ({ username, password }) => ({
                url: "/auth/login",
                method: "POST",
                body: {
                    identifier: username,
                    password
                }
            }),
            invalidatesTags: ["auth"]
        }),

        getUserInfo: builder.query<IUserData, string | null>({
            query: (token) => ({
                url: "./auth/me",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }),
            providesTags: ["auth"],
            onQueryStarted: (token) => {
                const newToken = localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")!) : null;
                token = newToken;
            }
        }),

        seeNotification: builder.mutation({
            query: ({ _id, token }) => ({
                url: `notifications/see/${_id}`,
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }),
            invalidatesTags: ["auth"],
        })

    })
});

export const { useLoginMutation, useGetUserInfoQuery, useSeeNotificationMutation } = authApi;
export default authApi;