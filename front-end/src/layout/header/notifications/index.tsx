import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Menu } from "@mui/material";
import { IoMdNotificationsOutline } from "react-icons/io";

import NotificationSelect from "./select-options";
import NotificationBody from "./notification-body";
import IStore from "../../../interface/store";
import { INotifications } from "../../../interface/userData";


const Notifications = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const iconRef = useRef<HTMLDivElement>(null);

    const notificationArray = useSelector((store: IStore) => store.adminData).adminData?.notifications;
    const [notificationToShow, setNotificationToShow] = useState(notificationArray);


    const openHandler = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
        manageToggleBtn();
    };

    const closeHandler = () => {
        setAnchorEl(null);
        manageToggleBtn();
    };

    const manageToggleBtn = () => {
        iconRef.current?.classList.contains("bg-active") ?
            iconRef.current?.classList.remove("bg-active") :
            iconRef.current?.classList.add("bg-active");
    };


    return (
        <div>
            <div ref={iconRef} onClick={openHandler} className="w-[2rem] h-[2rem] rounded flex items-center justify-center bg-hover cursor-pointer">
                <IoMdNotificationsOutline size="1.4rem" />
            </div>

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
                className="mt-4"
            >
                <div className='w-[20rem]'>
                    <div className='mx-4 my-2'>
                        <div className="font-bold mb-2 flex gap-2">
                            <span className="text-secondary-dark">کل پیغام ها:</span>
                            <div className="bg-primary text-white w-[2rem] h-[1.5rem] text-center rounded">{notificationArray?.length}</div>
                        </div>

                        <NotificationSelect
                            notificationArray={notificationArray}
                            setNotificationToShow={(newArray: INotifications[]) => setNotificationToShow(newArray)} />

                    </div>

                    <NotificationBody notificationToShow={notificationToShow} />

                    {notificationArray && notificationArray?.length > 0 &&
                        <div className="text-center mt-4">
                            <Link to="/notifications" onClick={closeHandler}>نمایش همه</Link>
                        </div>}
                </div>
            </Menu>

        </div>);
};

export default Notifications;
