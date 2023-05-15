import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import IInfo from "../interface/info";

const infoApi = createApi({
    reducerPath: "infoApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:4000/v1/",
        prepareHeaders: (header) => {
            const token = localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")!) : null;
            header.set("Authorization", `Bearer ${token}`);

            return header;
        }
    }),
    endpoints: builder => ({
        fetchInfoData: builder.query<IInfo, void>({
            query: () => ({
                url: "/infos/p-admin"
            })
        })
    })
});


export const { useFetchInfoDataQuery } = infoApi;
export default infoApi;