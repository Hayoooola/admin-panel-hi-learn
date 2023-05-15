import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import IMenu from "../interface/menu";

const menuApi = createApi({
    reducerPath: "menuApi",
    tagTypes: ["menu"],
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:4000/v1/",
        prepareHeaders: (header) => {
            const token = localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")!) : null;
            header.set("Authorization", `Bearer ${token}`);
            return header;
        }
    }),
    endpoints: builder => ({

        fetchAllMenus: builder.query<IMenu[], void>({
            query: () => ({
                url: "/menus/all"
            }),
            providesTags: ["menu"]
        }),

        deleteMenu: builder.mutation({
            query: (_id) => ({
                url: `/menus/${_id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["menu"]
        }),

        createMenu: builder.mutation({
            query: (body) => ({
                url: `/menus`,
                method: "POST",
                body: body
            }),
            invalidatesTags: ["menu"]
        }),

        updateMenu: builder.mutation({
            query: ({ body, _id }) => ({
                url: `/menus/${_id}`,
                method: "PUT",
                body: body
            }),
            invalidatesTags: ["menu"]
        })
    })
});


export const { useFetchAllMenusQuery,
    useDeleteMenuMutation,
    useCreateMenuMutation,
    useUpdateMenuMutation } = menuApi;
export default menuApi;