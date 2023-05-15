import { FC, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { useUpdateUserMutation } from '../../../API/users';
import IUserData from '../../../interface/userData';

interface IProps {
    userObj: IUserData | null;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}


const EditUserModal: FC<IProps> = ({ userObj, open, setOpen }) => {
    const [newName, setNewName] = useState("");
    const [newUserName, setNewUserName] = useState("");
    const [newUserEmail, setNewUserEmail] = useState("");
    const [newUserPhone, setNewUserPhone] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const [updateUser, { data, error }] = useUpdateUserMutation();


    const closeHandler = () => {
        setOpen(false);
    };

    // updating input values
    useEffect(() => {
        setNewName(userObj?.name || "");
        setNewUserName(userObj?.username || "");
        setNewUserEmail(userObj?.email || "");
        setNewUserPhone(userObj?.phone || "");
    }, [userObj]);

    const editHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();

        // preparing data to server
        const body = {
            name: newName,
            username: newUserName,
            email: newUserEmail,
            phone: newUserPhone,
            password: newPassword,
        };
        const _id = userObj?._id;

        updateUser({ body, _id });

        closeHandler();
    };

    // managing requests status
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
                    {`درحال ویرایش کاربر "${newName}"`}
                </div>
            </DialogTitle>
            <DialogContent >
                <div className='flex gap-4 mb-4 mt-2'>
                    <TextField
                        required
                        label="نام"
                        value={newName}
                        className='w-[50%] font-primary'
                        size='small'
                        onChange={e => setNewName(e.target.value)}
                    />
                    <TextField
                        required
                        label="یوزرنیم"
                        value={newUserName}
                        className='w-[50%] font-primary'
                        size='small'
                        onChange={e => setNewUserName(e.target.value)}
                    />
                </div>
                <div className='flex gap-4 mb-4'>
                    <TextField
                        required
                        type='email'
                        label="ایمیل"
                        value={newUserEmail}
                        className='w-[50%] font-primary'
                        size='small'
                        onChange={e => setNewUserEmail(e.target.value)}
                    />
                    <TextField
                        required
                        type='number'
                        label="شماره تماس"
                        value={newUserPhone}
                        className='w-[50%] font-primary'
                        size='small'
                        onChange={e => setNewUserPhone(e.target.value)}
                    />
                </div>
                <div className='w-[50%] pl-2 mb-4'>
                    <TextField
                        required
                        type='password'
                        label="کلمه عبور"
                        value={newPassword}
                        className='w-full font-primary'
                        size='small'
                        autoComplete='suggested'
                        onChange={e => setNewPassword(e.target.value)}
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

export default EditUserModal;
