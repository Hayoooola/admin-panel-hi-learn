import { createSlice } from "@reduxjs/toolkit";

const menuSlice = createSlice({
    name: "menu",
    initialState: { isMenuOpen: false },
    reducers: {
        openMenu: () => ({ isMenuOpen: true }),
        closeMenu: () => ({ isMenuOpen: false }),
        checkBrowserWidth: () => (window.innerWidth > 900 ? { isMenuOpen: true } : { isMenuOpen: false })
    }
});


export const { openMenu, closeMenu, checkBrowserWidth } = menuSlice.actions;
export default menuSlice;