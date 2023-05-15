import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import ICoupon from "../interface/coupon";

const couponApi = createApi({
    reducerPath: "couponApi",
    tagTypes: ["coupons"],
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:4000/v1/",
        prepareHeaders: (header) => {
            const token = localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")!) : null;
            header.set("Authorization", `Bearer ${token}`);

            return header;
        }
    }),
    endpoints: builder => ({

        fetchAllCoupons: builder.query<ICoupon[], void>({
            query: () => ({
                url: "/offs"
            }),
            providesTags: ["coupons"]
        }),

        createCoupon: builder.mutation({
            query: (body) => ({
                url: "/offs",
                method: "POST",
                body
            }),
            invalidatesTags: ["coupons"]
        }),

        deleteCoupon: builder.mutation({
            query: (_id) => ({
                url: `/offs/${_id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["coupons"]
        })
    })
});


export const { useFetchAllCouponsQuery,
    useCreateCouponMutation,
    useDeleteCouponMutation } = couponApi;
export default couponApi;