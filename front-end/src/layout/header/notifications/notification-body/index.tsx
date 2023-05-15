import { FC } from 'react';

import SingleNotification from '../single-notification';
import { INotifications } from '../../../../interface/userData';

interface IProps {
    notificationToShow: INotifications[] | undefined;
}


const NotificationBody: FC<IProps> = ({ notificationToShow }) => {
    const itemsToShow = () => {
        return (notificationToShow && notificationToShow?.length > 0 ?
            <div>
                {notificationToShow?.map((notificationObj, index) => (
                    <SingleNotification key={index} notificationObj={notificationObj} />
                ))}
            </div> :
            <div>
                <p className='text-center text-secondary-dark my-4'>پیغامی برای نمایش وجود ندارد!</p>
            </div>
        );
    };

    return itemsToShow();
};

export default NotificationBody;
