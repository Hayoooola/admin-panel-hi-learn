import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import IComment from "../interface/comments";

const commentApi = createApi({
    reducerPath: "comments",
    tagTypes: ["comments"],
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:4000/v1/",
        prepareHeaders: (header) => {
            const token = localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")!) : null;
            header.set("Authorization", `Bearer ${token}`);
            return header;
        }
    }),
    endpoints: builder => ({

        fetchAllComments: builder.query<IComment[], void>({
            query: () => ({
                url: "/comments"
            }),
            providesTags: ["comments"]
        }),

        deleteComment: builder.mutation({
            query: (_id) => ({
                url: `/comments/${_id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["comments"]
        }),

        answerComment: builder.mutation({
            query: ({ body, _id }) => ({
                url: `/comments/answer/${_id}`,
                method: "POST",
                body
            }),
            invalidatesTags: ["comments"]
        }),

        acceptComment: builder.mutation({
            query: (_id) => ({
                url: `/comments/accept/${_id}`,
                method: "PUT"
            }),
            invalidatesTags: ["comments"]
        }),
    })
});


export const { useFetchAllCommentsQuery,
    useAnswerCommentMutation,
    useDeleteCommentMutation,
    useAcceptCommentMutation, } = commentApi;
export default commentApi;