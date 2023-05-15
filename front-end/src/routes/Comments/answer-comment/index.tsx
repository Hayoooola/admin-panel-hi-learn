import { FC, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { useAnswerCommentMutation, } from '../../../API/comments';
import IComment from '../../../interface/comments';

interface IProps {
    commentObj: IComment | null;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}


const AnswerCommentModal: FC<IProps> = ({ commentObj, open, setOpen }) => {
    const [answer, setAnswer] = useState("");

    const [answerComment, { data, error }] = useAnswerCommentMutation();
    const _id = commentObj?._id;

    const closeHandler = () => {
        setOpen(false);
    };

    const deleteHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();

        const body = { body: answer };
        answerComment({ body, _id });

        closeHandler();
    };

    // manage request status
    useEffect(() => {
        data && toast.success("کامنت مورد نظر با موفقیت پاسخ داده شد.");
        error && toast.error("متاسفانه مشکلی در ارتباط با پایگاه داده بوجود آمده!");
    }, [data, error]);


    return (
        <Dialog
            open={open}
            onClose={closeHandler}
        >
            <DialogTitle>
                <div className='font-primary text-[1.2rem] text-justify text-secondary md:w-[25rem] lg:w-[30rem]'>
                    {`درحال پاسخ به کامنت "${commentObj?.body}"`}
                </div>
            </DialogTitle>
            <DialogContent>
                <div className="mt-2">
                    <TextField
                        required
                        label="متن پاسخ"
                        value={answer}
                        className='w-full font-primary'
                        multiline
                        minRows={3}
                        dir='ltr'
                        onChange={e => setAnswer(e.target.value)}
                    />
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={deleteHandler} className='font-primary'>
                    ارسال پاسخ
                </Button>
                <Button onClick={closeHandler} className='font-primary'>
                    انصراف
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AnswerCommentModal;
