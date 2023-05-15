import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import IUserData from "../interface/userData";

const userApi = createApi({
    reducerPath: "usersApi",
    tagTypes: ["users"],
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:4000/v1/",
        prepareHeaders: (header) => {
            const token = localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")!) : null;
            header.set("Authorization", `Bearer ${token}`);
            return header;
        }
    }),
    endpoints: builder => ({

        fetchAllUsers: builder.query<IUserData[], void>({
            query: () => ({
                url: "/users"
            }),
            providesTags: ["users"]
        }),

        deleteUser: builder.mutation({
            query: (_id) => ({
                url: `/users/${_id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["users"]
        }),

        createUser: builder.mutation({
            query: (body) => ({
                url: "/auth/register",
                method: "POST",
                body
            }),
            invalidatesTags: ["users"]
        }),

        changeRole: builder.mutation({
            query: ({ _id, role }) => ({
                url: "/users/role",
                method: "PUT",
                body: { id: _id, role }
            }),
            invalidatesTags: ["users"]
        }),

        updateUser: builder.mutation({
            query: ({ body, _id }) => ({
                url: `/users/${_id}`,
                method: "PUT",
                body
            }),
            invalidatesTags: ["users"]
        })
    })
});


export const { useFetchAllUsersQuery,
    useCreateUserMutation,
    useDeleteUserMutation,
    useChangeRoleMutation,
    useUpdateUserMutation } = userApi;
export default userApi;