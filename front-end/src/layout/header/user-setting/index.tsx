import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import { FaUser } from "react-icons/fa";
import { FaSignOutAlt } from "react-icons/fa";

import IStore from '../../../interface/store';
import { setToken } from '../../../feature/authData';

const avatar = require("../../../assets/images/other/avatar.png");


const UserAvatar = () => {
    const adminData = useSelector((store: IStore) => store.adminData).adminData;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const openHandler = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const closeHandler = () => {
        setAnchorEl(null);
    };

    const profileHandler = () => {
        navigate("/profile");
        closeHandler();
    };

    const logOutHandler = () => {
        dispatch(setToken(null));
        closeHandler();
    };


    return (
        <div>
            <span onClick={openHandler}><Avatar src={avatar} alt="avatar" className='cursor-pointer' /></span>

            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={closeHandler}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                className='mt-4'
            >
                <div className='min-w-[12rem]'>
                    <div className='mx-4 my-2'>
                        <p className='font-bold text-xl text-secondary'>{adminData?.name}</p>
                        <p className='text-sm text-secondary-dark'>{adminData?.email}</p>
                    </div>
                    <div className=' border-b-2 border-dotted my-2'></div>
                    <div className='flex gap-2 items-center px-4 py-2 transition hover:bg-blue-100 cursor-pointer' onClick={profileHandler}>
                        <FaUser /> پروفایل من
                    </div>
                    <div className='flex gap-2 items-center px-4 py-2 transition hover:bg-blue-100 cursor-pointer' onClick={logOutHandler}>
                        <FaSignOutAlt /> خارج شدن از حساب کاربری
                    </div>
                </div>
            </Menu>

        </div>
    );
};

export default UserAvatar;
