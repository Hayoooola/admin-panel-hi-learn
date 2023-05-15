import { configureStore } from "@reduxjs/toolkit";

import menuSlice from "../feature/menu";
import AdminData from "../feature/authData";
import authApi from "../API/auth";
import categoryApi from "../API/category";
import courseApi from "../API/courses";
import menuApi from "../API/menu";
import userApi from "../API/users";
import commentApi from "../API/comments";
import sessionApi from "../API/sessions";
import articleApi from "../API/article";
import discountApi from "../API/discount";
import infoApi from "../API/info";

const store = configureStore({
    reducer: {
        menu: menuSlice.reducer,
        adminData: AdminData.reducer,
        [authApi.reducerPath]: authApi.reducer,
        [categoryApi.reducerPath]: categoryApi.reducer,
        [courseApi.reducerPath]: courseApi.reducer,
        [menuApi.reducerPath]: menuApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [commentApi.reducerPath]: commentApi.reducer,
        [sessionApi.reducerPath]: sessionApi.reducer,
        [articleApi.reducerPath]: articleApi.reducer,
        [discountApi.reducerPath]: discountApi.reducer,
        [infoApi.reducerPath]: infoApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(authApi.middleware)
            .concat(categoryApi.middleware)
            .concat(courseApi.middleware)
            .concat(menuApi.middleware)
            .concat(userApi.middleware)
            .concat(commentApi.middleware)
            .concat(sessionApi.middleware)
            .concat(articleApi.middleware)
            .concat(discountApi.middleware)
            .concat(infoApi.middleware)
});


export default store;