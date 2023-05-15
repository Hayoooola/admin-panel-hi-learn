import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { ISessions } from "../interface/course-data";

const sessionApi = createApi({
    reducerPath: "sessionApi",
    tagTypes: ["sessions"],
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:4000/v1/",
        prepareHeaders: (header) => {
            const token = localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")!) : null;
            header.set("Authorization", `Bearer ${token}`);
            return header;
        }
    }),
    endpoints: builder => ({

        fetchAllSessions: builder.query<ISessions[], void>({
            query: () => ({
                url: "/courses/sessions"
            }),
            providesTags: ["sessions"]
        }),

        createSession: builder.mutation({
            query: ({ body, courseID }) => ({
                url: `/courses/${courseID}/sessions`,
                method: "POST",
                body
            }),
            invalidatesTags: ["sessions"]
        }),

        deleteSession: builder.mutation({
            query: (_id) => ({
                url: `/courses/sessions/${_id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["sessions"]
        }),

        updateSession: builder.mutation({
            query: ({ body, _id }) => ({
                url: `/courses/sessions/${_id}`,
                method: "PUT",
                body
            }),
            invalidatesTags: ["sessions"]
        })
    })
});


export const { useFetchAllSessionsQuery,
    useCreateSessionMutation,
    useDeleteSessionMutation,
    useUpdateSessionMutation } = sessionApi;
export default sessionApi;