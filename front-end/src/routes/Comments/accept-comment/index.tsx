import { FC, useEffect } from 'react';
import { toast } from 'react-toastify';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { useAcceptCommentMutation } from '../../../API/comments';
import IComment from '../../../interface/comments';

interface IProps {
    commentObj: IComment | null;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}


const AcceptCommentModal: FC<IProps> = ({ commentObj, open, setOpen }) => {
    const [acceptComment, { data, error }] = useAcceptCommentMutation();
    const _id = commentObj?._id;

    const closeHandler = () => {
        setOpen(false);
    };

    const acceptHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
        acceptComment(_id);
        closeHandler();
    };

    useEffect(() => {
        data && toast.success("کامنت مورد نظر با موفقیت تایید شد.");
        error && toast.error("متاسفانه مشکلی در ارتباط با پایگاه داده بوجود آمده!");
    }, [data, error]);


    return (
        <Dialog
            open={open}
            onClose={closeHandler}
        >
            <DialogTitle>
                <div className='font-primary text-[1.2rem] text-justify text-secondary md:w-[25rem] lg:w-[30rem]'>
                    {`آیا از تایید کامنت "${commentObj?.body}" اطمینان دارید؟`}
                </div>
            </DialogTitle>
            <DialogContent>
                <DialogContentText className='font-primary'>
                    با تایید یک کامنت آن کامنت در سایت قابل نمایش خواهد بود!
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={acceptHandler} className='font-primary'>
                    تایید شود
                </Button>
                <Button onClick={closeHandler} className='font-primary'>
                    انصراف
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AcceptCommentModal;
