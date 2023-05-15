import { FC, useEffect } from 'react';
import { toast } from 'react-toastify';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { useDeleteArticleMutation } from '../../../API/article';
import IArticle from '../../../interface/articles';


interface IProps {
    articleObj: IArticle | null;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}


const DeleteArticleModal: FC<IProps> = ({ articleObj, open, setOpen }) => {
    const [deleteArticle, { data, error }] = useDeleteArticleMutation();
    const _id = articleObj?._id;

    const closeHandler = () => {
        setOpen(false);
    };

    const deleteHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
        deleteArticle(_id);
        closeHandler();
    };

    useEffect(() => {
        data && toast.success("مقاله مورد نظر با موفقیت از دیتابیس حذف شد.");
        error && toast.error("متاسفانه مشکلی در ارتباط با پایگاه داده بوجود آمده!");
    }, [data, error]);


    return (
        <Dialog
            open={open}
            onClose={closeHandler}
        >
            <DialogTitle>
                <div className='font-primary text-secondary md:w-[25rem] lg:w-[30rem]'>
                    {`آیا از حذف مقاله "${articleObj?.title}" اطمینان دارید؟`}
                </div>
            </DialogTitle>
            <DialogContent>
                <DialogContentText className='font-primary'>
                    با حذف یک مقاله تمامی اطلاعات مربوط به آن مقاله نیز حذف خواهند شد!
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

export default DeleteArticleModal;
