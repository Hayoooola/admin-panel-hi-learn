import { FC, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from "react-icons/md";

import IMenu from "../../../interface/menu";
import { useDispatch } from "react-redux";
import { closeMenu } from "../../../feature/menu";


const SingleMenu: FC<IMenu> = ({ icon, title, link, subMenu }) => {
    const location = useLocation().pathname;
    const menuItemRef = useRef<HTMLLIElement>(null);
    const dispatch = useDispatch();

    const dropDownHandler = () => {
        menuItemRef.current?.classList.contains("active") ?
            menuItemRef.current?.classList.remove("active") :
            menuItemRef.current?.classList.add("active");
    };

    const clickMenuHandler = () => {
        window.innerWidth <= 768 && dispatch(closeMenu());
    };


    const itemsToShow = () => {
        if (!subMenu) {
            return (
                <li className={location === link ? "menu-item active" : "menu-item "}>
                    <Link to={link || "#"} className="menu-link" onClick={clickMenuHandler}>
                        <div className="flex gap-[.8rem]">
                            {icon}
                            <span>{title}</span>
                        </div>
                    </Link>
                </li>
            );
        } else {
            return (
                <li className={location === link ? "menu-item active" : "menu-item "} ref={menuItemRef} onClick={dropDownHandler}>
                    <Link to={link || "#"} className="menu-link" onClick={clickMenuHandler}>
                        <div className="flex gap-[.8rem]">
                            {icon}
                            <span>{title}</span>
                        </div>
                        <div>
                            <span className="arrow-up"><MdOutlineKeyboardArrowDown size="1.2rem" /></span>
                            <span className="arrow-down"><MdOutlineKeyboardArrowUp size="1.2rem" /></span>
                        </div>
                    </Link>
                    <ul className="drop-down-menu">

                        {subMenu.map((submenuObj, index) => (
                            <li className="drop-down-item" key={index} onClick={clickMenuHandler}>
                                <Link to={submenuObj.link || "#"} className="drop-down-link">
                                    <div className="flex gap-[.8rem]">
                                        <span>{submenuObj.title}</span>
                                    </div>
                                </Link>
                            </li>
                        ))}

                    </ul>
                </li>
            );
        }
    };

    return itemsToShow();
};

export default SingleMenu;
