import "./index.css";
import menuArray from "../../feature/menuArray";
import SingleMenu from "./single-menu";


const Menu = () => {
    return (
        <ul className="menu-list">

            {menuArray.map((menuObj, index) => (
                <SingleMenu icon={menuObj.icon} title={menuObj.title} link={menuObj.link} key={index} />
            ))}

        </ul>
    );
};

export default Menu;
