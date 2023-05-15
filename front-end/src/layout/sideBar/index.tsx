import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { VscSignOut } from "react-icons/vsc";

import "./index.css";
import Menu from "../menu";
import { checkBrowserWidth, closeMenu } from "../../feature/menu";

interface storeMenu {
    isMenuOpen: boolean;
}


const SideBar = () => {
    const dispatch = useDispatch();
    const menuRef = useRef<HTMLDivElement>(null);
    const isMenuOpen = useSelector((store: { menu: storeMenu; }) => store.menu).isMenuOpen;

    // check user browser width (show panel for widths > 900px)
    useEffect(() => {
        dispatch(checkBrowserWidth());
    }, []);


    // manage open & close menu
    useEffect(() => {
        isMenuOpen ? openMenuHandler() : closeMenuHandler();
    }, [isMenuOpen]);


    // close menu on mobile devices
    const mobileMenuHandler = (e: React.MouseEvent<HTMLDivElement>) => {
        e.target instanceof Element && e.target.classList.contains("mobil-menu-wrapper") && closeMenuHandler();
    };


    const openMenuHandler = () => {
        menuRef.current?.classList.add("show");
    };


    const closeMenuHandler = () => {
        menuRef.current?.classList.remove("show");
    };



    return (
        <div ref={menuRef} className="side-bar-container">
            <div className="menu-wrapper" >
                <nav className="menu">
                    <div className="p-6 mb-10 flex justify-center items-center gap-2">
                        <img src={require("../../assets/images/logo/logo.png")} alt="logo" className="w-[4rem]" />
                        <span className="text-xl">Hi-learn</span>
                    </div>
                    <Menu />
                    <div className="close-menu-link menu-item cursor-pointer" onClick={() => dispatch(closeMenu())}>
                        <div className="flex gap-[.8rem]">
                            <VscSignOut size="1.4rem" />
                            <span>جمع کردن منو</span>
                        </div>
                    </div>
                </nav>
            </div>
            <div className="mobil-menu-wrapper" onClick={mobileMenuHandler}></div>
        </div>
    );
};

export default SideBar;
