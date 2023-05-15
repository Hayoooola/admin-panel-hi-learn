import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import IArticle from "../interface/articles";

const articleApi = createApi({
    reducerPath: "articleApi",
    tagTypes: ["articles"],
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:4000/v1/",
        prepareHeaders: (header) => {
            const token = localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")!) : null;
            header.set("Authorization", `Bearer ${token}`);

            return header;
        }
    }),
    endpoints: builder => ({

        fetchAllArticles: builder.query<IArticle[], void>({
            query: () => ({
                url: "/articles"
            }),
            providesTags: ["articles"]
        }),

        createArticle: builder.mutation({
            query: (body) => ({
                url: "/articles",
                method: "POST",
                body
            }),
            invalidatesTags: ["articles"]
        }),

        deleteArticle: builder.mutation({
            query: (_id) => ({
                url: `/articles/${_id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["articles"]
        }),

        draftArticle: builder.mutation({
            query: (body) => ({
                url: "/articles/draft",
                method: "POST",
                body
            }),
            invalidatesTags: ["articles"]
        })
    })
});


export const { useFetchAllArticlesQuery,
    useCreateArticleMutation,
    useDeleteArticleMutation,
    useDraftArticleMutation } = articleApi;
export default articleApi;