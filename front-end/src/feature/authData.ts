import { createSlice } from "@reduxjs/toolkit";
import IAdminData from "../interface/adminData";

const oldToken = localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")!) : null;
const initialState: IAdminData = { isAdmin: false, token: oldToken, adminData: null };

const AdminData = createSlice({
    name: "authData",
    initialState: initialState,
    reducers: {
        getToken: () => {
            const token = localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")!) : null;
            return { isAdmin: false, token: token, adminData: null };
        },

        setToken: (state, action) => {
            localStorage.setItem("token", JSON.stringify(action.payload));
            return { isAdmin: false, token: action.payload, adminData: null };
        },

        adminData: (state, action) => {
            const token = localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")!) : null;
            return { isAdmin: false, token: token, adminData: action.payload };
        }
    }
});


export const { getToken, setToken, adminData } = AdminData.actions;
export default AdminData;