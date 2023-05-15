import { useLocation } from 'react-router-dom';

import "./index.css";
import Logo from './logo';
import UserAvatar from './user-setting';
import menuArray from '../../feature/menuArray';
import MenuToggle from './menu-toggle';
import Notifications from './notifications';
import PageTitle from '../../components/page-title';

const Header = () => {
    const location = useLocation().pathname;
    const menuObj = menuArray.filter((menuObj) => menuObj.link === location)[0];

    return (
        <div className='w-full md:px-20 lg:px-32 xl:px-44 p-4 fixed header z-[999]'>
            <div className='flex justify-between'>
                <div className="flex flex-row-reverse lg:flex-row items-center gap-4">
                    <Logo />
                    <MenuToggle />
                </div>
                <div className="flex items-center gap-4">
                    <Notifications />
                    <UserAvatar />
                </div>
            </div>

            {menuObj &&
                <div className="flex justify-center mt-5">
                    <PageTitle title={menuObj.title} Icon={menuObj.icon} />
                </div>}

        </div>
    );
};

export default Header;
