import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import ICourseData from "../interface/course-data";

const courseApi = createApi({
    reducerPath: "courses",
    tagTypes: ["courses"],
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:4000/v1/",
        prepareHeaders: (header) => {
            const token = localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")!) : null;
            header.set("Authorization", `Bearer ${token}`);
            return header;
        }
    }),
    endpoints: builder => ({
        fetchAllCourses: builder.query<ICourseData[], void>({
            query: () => ({
                url: "/courses",
            }),
            providesTags: ["courses"]
        }),

        deleteCourse: builder.mutation({
            query: (_id) => ({
                url: `/courses/${_id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["courses"]
        }),

        createNewCourse: builder.mutation({
            query: (body) => ({
                url: "/courses",
                method: "POST",
                body: body,
            }),
            invalidatesTags: ["courses"]
        }),

        updateCourse: builder.mutation({
            query: ({ body, _id }) => ({
                url: `/courses/${_id}`,
                method: "PUT",
                body: body,
            }),
            invalidatesTags: ["courses"],
        }),
    })
});


export const { useFetchAllCoursesQuery,
    useDeleteCourseMutation,
    useCreateNewCourseMutation,
    useUpdateCourseMutation } = courseApi;
export default courseApi;