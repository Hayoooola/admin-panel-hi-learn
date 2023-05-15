import { FC, useEffect, useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { INotifications } from '../../../../interface/userData';


enum notificationType {
    ALL = "نمایش همه",
    UNREAD = "فقط خوانده نشده",
    REED = "پیغام های مشاهده شده"
}

interface IProps {
    notificationArray: INotifications[] | undefined;
    setNotificationToShow: (newArray: INotifications[]) => void;
}


const NotificationSelect: FC<IProps> = ({ notificationArray, setNotificationToShow }) => {
    const [itemsToSHow, setItemsToShow] = useState("نمایش همه");

    const handleChange = (event: SelectChangeEvent) => {
        setItemsToShow(event.target.value);
    };

    useEffect(() => {
        notificationArray && itemsToSHow === notificationType.ALL &&
            setNotificationToShow(notificationArray);

        notificationArray && itemsToSHow === notificationType.UNREAD &&
            setNotificationToShow(notificationArray.filter(notification => notification.see === 0));

        notificationArray && itemsToSHow === notificationType.REED &&
            setNotificationToShow(notificationArray.filter(notification => notification.see === 1));
    }, [itemsToSHow, notificationArray]);


    return (
        <FormControl fullWidth size='small'>
            <InputLabel >{notificationType.ALL}</InputLabel>
            <Select
                className='font-primary'
                value={itemsToSHow}
                label={notificationType.ALL}
                onChange={handleChange}
                dir='ltr'
            >
                <MenuItem value={notificationType.ALL} className='font-primary !text-sm'>{notificationType.ALL}</MenuItem>
                <MenuItem value={notificationType.UNREAD} className='font-primary !text-sm'>{notificationType.UNREAD}</MenuItem>
                <MenuItem value={notificationType.REED} className='font-primary !text-sm'>{notificationType.REED}</MenuItem>
            </Select>
        </FormControl>
    );
};

export default NotificationSelect;
