import { FC, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { useUpdateCategoryMutation } from '../../../API/category';
import { ICategoryID } from '../../../interface/course-data';


interface IProps {
    categoryObj: ICategoryID | null;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}


const EditCategoryModal: FC<IProps> = ({ categoryObj, open, setOpen }) => {
    const [title, setTitle] = useState(categoryObj?.title);

    const [updateCategory, { data, error }] = useUpdateCategoryMutation();
    const _id = categoryObj?._id;

    const closeHandler = () => {
        setOpen(false);
    };

    const editHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
        updateCategory({ _id, title });
        closeHandler();
    };

    useEffect(() => {
        setTitle(categoryObj?.title);
    }, [categoryObj]);

    useEffect(() => {
        data && toast.success("دسته بندی موردنظر با موفقیت ویرایش شد.");
        error && toast.error("متاسفانه مشکلی در ارتباط با پایگاه داده بوجود آمده!");
    }, [data, error]);


    return (
        <Dialog
            open={open}
            onClose={closeHandler}
        >
            <DialogTitle>
                <div className='font-primary text-secondary md:w-[25rem] lg:w-[30rem]'>
                    {`درحال ویرایش دسته "${categoryObj?.title}"`}
                </div>
            </DialogTitle>
            <DialogContent >
                <div className='py-4 flex flex-col gap-3'>
                    <TextField
                        required
                        label="عنوان"
                        size='small'
                        value={title}
                        className='w-full font-primary my-2'
                        dir='ltr'
                        onChange={e => setTitle(e.target.value)}
                    />
                    <TextField
                        required
                        label="نامک"
                        size='small'
                        value={categoryObj?.name}
                        className='w-full font-primary'
                        dir='ltr'
                        disabled
                    />
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={editHandler} className='font-primary'>
                    ویرایش شود
                </Button>
                <Button onClick={closeHandler} className='font-primary'>
                    انصراف
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditCategoryModal;
