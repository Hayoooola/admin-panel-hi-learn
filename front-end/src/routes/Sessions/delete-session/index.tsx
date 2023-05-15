import { FC, useEffect } from 'react';
import { toast } from 'react-toastify';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { useDeleteSessionMutation } from '../../../API/sessions';
import { ISessions } from '../../../interface/course-data';


interface IProps {
    sessionObj: ISessions | null;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}


const DeleteSessionModal: FC<IProps> = ({ sessionObj, open, setOpen }) => {
    const [deleteSession, { data, error }] = useDeleteSessionMutation();
    const _id = sessionObj?._id;

    const closeHandler = () => {
        setOpen(false);
    };

    const deleteHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
        deleteSession(_id);
        closeHandler();
    };

    useEffect(() => {
        data && toast.success("جلسه مورد نظر با موفقیت از دیتابیس حذف شد.");
        error && toast.error("متاسفانه مشکلی در ارتباط با پایگاه داده بوجود آمده!");
    }, [data, error]);


    return (
        <Dialog
            open={open}
            onClose={closeHandler}
        >
            <DialogTitle>
                <div className='font-primary text-secondary md:w-[25rem] lg:w-[30rem]'>
                    {`آیا از حذف جلسه "${sessionObj?.title}" اطمینان دارید؟`}
                </div>
            </DialogTitle>
            <DialogContent>
                <DialogContentText className='font-primary'>
                    با حذف یک جلسه تمامی اطلاعات مربوط به آن جلسه نیز حذف خواهند شد!
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={deleteHandler} className='font-primary'>
                    حذف شود
                </Button>
                <Button onClick={closeHandler} className='font-primary'>
                    انصراف
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteSessionModal;
