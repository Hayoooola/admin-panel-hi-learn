import { FC } from 'react';
import { useSelector } from 'react-redux';
import moment from 'jalali-moment';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { INotifications } from '../../../../interface/userData';
import { useSeeNotificationMutation } from '../../../../API/auth';
import IStore from '../../../../interface/store';

interface IProps {
    notificationObj: INotifications;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}


const NotificationModal: FC<IProps> = ({ notificationObj, open, setOpen }) => {
    const [seeNotification] = useSeeNotificationMutation();

    const notificationTime = moment(notificationObj.updatedAt).locale("fa").format("YYYY/MM/DD-hh:mm:ss");
    const token = useSelector((store: IStore) => store.adminData).token;
    const _id = notificationObj._id;


    const handleClose = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
        setOpen(false);
        seeNotification({ _id, token });
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
        >
            <DialogTitle>
                <div className='flex justify-between items-center font-primary text-secondary md:w-[25rem] lg:w-[30rem]'>
                    <span>آخرین بروز رسانی: </span>
                    <span>{(notificationTime)}</span>
                </div>
            </DialogTitle>
            <DialogContent>
                <DialogContentText className='font-primary'>
                    {notificationObj.msg}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} className='font-primary'>
                    مشاهده شد
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default NotificationModal;
