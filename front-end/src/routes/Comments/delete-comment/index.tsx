import { FC, useEffect } from 'react';
import { toast } from 'react-toastify';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { useDeleteCommentMutation } from '../../../API/comments';
import IComment from '../../../interface/comments';

interface IProps {
    commentObj: IComment | null;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}


const DeleteCommentModal: FC<IProps> = ({ commentObj, open, setOpen }) => {
    const [deleteComment, { data, error }] = useDeleteCommentMutation();
    const _id = commentObj?._id;

    const closeHandler = () => {
        setOpen(false);
    };

    const deleteHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
        deleteComment(_id);
        closeHandler();
    };

    useEffect(() => {
        data && toast.success("کامنت مورد نظر با موفقیت از دیتابیس حذف شد.");
        error && toast.error("متاسفانه مشکلی در ارتباط با پایگاه داده بوجود آمده!");
    }, [data, error]);


    return (
        <Dialog
            open={open}
            onClose={closeHandler}
        >
            <DialogTitle>
                <div className='font-primary text-[1.2rem] text-justify text-secondary md:w-[25rem] lg:w-[30rem]'>
                    {`آیا از حذف کامنت "${commentObj?.body}" اطمینان دارید؟`}
                </div>
            </DialogTitle>
            <DialogContent>
                <DialogContentText className='font-primary'>
                    با حذف یک کامنت دیگر آن کامنت قابل بازیابی نخواهد بود!
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

export default DeleteCommentModal;
