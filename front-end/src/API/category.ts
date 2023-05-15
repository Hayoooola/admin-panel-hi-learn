import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { ICategoryID } from "../interface/course-data";

const categoryApi = createApi({
    reducerPath: "category",
    tagTypes: ["category"],
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:4000/v1/",
        prepareHeaders: (header) => {
            const token = localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")!) : null;
            header.set("Authorization", `Bearer ${token}`);

            return header;
        }
    }),
    endpoints: builder => ({

        fetchAllCategories: builder.query<ICategoryID[], void>({
            query: () => ({
                url: "/category"
            }),
            providesTags: ["category"]
        }),

        createNewCategory: builder.mutation({
            query: ({ title, name }) => ({
                url: "/category",
                method: "POST",
                body: { title, name }
            }),
            invalidatesTags: ["category"],
        }),

        deleteCategory: builder.mutation({
            query: (_id) => ({
                url: `/category/${_id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["category"]
        }),

        updateCategory: builder.mutation({
            query: ({ _id, title }) => ({
                url: `/category/${_id}`,
                method: "PUT",
                body: { title }
            }),
            invalidatesTags: ["category"]
        })
    })
});


export const { useFetchAllCategoriesQuery,
    useCreateNewCategoryMutation,
    useDeleteCategoryMutation,
    useUpdateCategoryMutation } = categoryApi;
export default categoryApi;