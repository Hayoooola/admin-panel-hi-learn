import { FC, useEffect } from 'react';
import { toast } from 'react-toastify';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { useDeleteCouponMutation } from '../../../API/discount';
import ICoupon from '../../../interface/coupon';

interface IProps {
    couponObj: ICoupon | null;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}


const DeleteCouponModal: FC<IProps> = ({ couponObj, open, setOpen }) => {
    const [deleteCoupon, { data, error }] = useDeleteCouponMutation();
    const _id = couponObj?._id;

    const closeHandler = () => {
        setOpen(false);
    };

    const deleteHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
        deleteCoupon(_id);
        closeHandler();
    };

    useEffect(() => {
        data && toast.success("کدتخفیف مورد نظر با موفقیت از دیتابیس حذف شد.");
        error && toast.error("متاسفانه مشکلی در ارتباط با پایگاه داده بوجود آمده!");
    }, [data, error]);


    return (
        <Dialog
            open={open}
            onClose={closeHandler}
        >
            <DialogTitle>
                <div className='font-primary text-secondary md:w-[25rem] lg:w-[30rem]'>
                    {`آیا از حذف کدتخفیف "${couponObj?.code}" اطمینان دارید؟`}
                </div>
            </DialogTitle>
            <DialogContent>
                <DialogContentText className='font-primary'>
                    با حذف یک کدتخفیف تمامی اطلاعات مربوط به آن کدتخفیف نیز حذف خواهند شد!
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

export default DeleteCouponModal;
