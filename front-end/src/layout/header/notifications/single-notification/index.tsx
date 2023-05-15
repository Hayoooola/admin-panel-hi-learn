import { FC, useEffect, useState } from 'react';

import { INotifications } from '../../../../interface/userData';
import NotificationModal from '../notification-modal';
import moment from 'jalali-moment';

interface IProps {
    notificationObj: INotifications;
}



const SingleNotification: FC<IProps> = ({ notificationObj }) => {
    const [openModal, setOpenModal] = useState(false);


    return (
        <div className="grid grid-cols-8 gap-2 p-2 notification-item border-b border-gray-200 hover:bg-blue-100 transition cursor-pointer" onClick={() => setOpenModal(true)}>
            <div className="col-span-1">
                <img src={require("../../../../assets/images/logo/logo.png")} alt="originator" className="w-[2rem]" />
            </div>
            <div className="col-span-7">
                <div className="flex justify-between items-center">
                    <span className="font-bold text-secondary">های-لرن</span>
                    <span className="text-sm text-gray-500">
                        {moment(notificationObj.updatedAt).locale("fa").format("MM/DD-hh:mm")}
                    </span>
                </div>
                <p className="text-secondary-dark text-sm mt-2">
                    {notificationObj.msg}
                </p>
                <div className="mt-2 flex gap-2 text-sm font-light justify-end">
                    {!notificationObj.see &&
                        <span className="bg-secondary text-white text-[.8rem] rounded-full pt-1 px-2 opacity-80">جدید</span>}
                </div>
            </div>
            <NotificationModal notificationObj={notificationObj} open={openModal} setOpen={setOpenModal} />
        </div>
    );
};

export default SingleNotification;
