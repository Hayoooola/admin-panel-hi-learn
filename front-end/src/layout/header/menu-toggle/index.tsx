import { CgMenu } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";

import { openMenu, closeMenu } from "../../../feature/menu";

interface storeMenu {
    isMenuOpen: boolean;
}

const MenuToggle = () => {
    const dispatch = useDispatch();
    const isMenuOpen = useSelector((store: { menu: storeMenu; }) => store.menu).isMenuOpen;

    const toggleHandler = () => {
        isMenuOpen ? dispatch(closeMenu()) : dispatch(openMenu());
    };

    return (
        <div onClick={toggleHandler} className="cursor-pointer">
            <CgMenu size="1.3rem" />
        </div>
    );
};

export default MenuToggle;
