import { FC, useEffect } from 'react';
import { toast } from 'react-toastify';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { useDeleteMenuMutation } from '../../../API/menu';
import IMenu from '../../../interface/menu';

interface IProps {
    menuObj: IMenu | null;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}


const DeleteMenuModal: FC<IProps> = ({ menuObj, open, setOpen }) => {
    const [deleteMenu, { data, error }] = useDeleteMenuMutation();
    const _id = menuObj?._id;

    const closeHandler = () => {
        setOpen(false);
    };

    const deleteHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
        deleteMenu(_id);
        closeHandler();
    };

    useEffect(() => {
        data && toast.success("منو مورد نظر با موفقیت از دیتابیس حذف شد.");
        error && toast.error("متاسفانه مشکلی در ارتباط با پایگاه داده بوجود آمده!");
    }, [data, error]);


    return (
        <Dialog
            open={open}
            onClose={closeHandler}
        >
            <DialogTitle>
                <div className='font-primary text-secondary md:w-[25rem] lg:w-[30rem]'>
                    {`آیا از حذف منو "${menuObj?.title}" اطمینان دارید؟`}
                </div>
            </DialogTitle>
            <DialogContent>
                <DialogContentText className='font-primary'>
                    با حذف یک منو تمامی اطلاعات مربوط به آن منو نیز حذف خواهند شد!
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

export default DeleteMenuModal;
