import { FC, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { useChangeRoleMutation, useDeleteUserMutation } from '../../../API/users';
import IUserData from '../../../interface/userData';
import { FormControlLabel, Radio, RadioGroup } from '@mui/material';

interface IProps {
    userObj: IUserData | null;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}


const ChangeUserRole: FC<IProps> = ({ userObj, open, setOpen }) => {
    const [name, setName] = useState("");
    const [role, setRole] = useState("");

    const [changeRole, { data, error }] = useChangeRoleMutation();

    // updating input values
    useEffect(() => {
        setName(userObj?.name || "");
        setRole(userObj?.role || "");
    }, [userObj]);

    const closeHandler = () => {
        setOpen(false);
    };

    const deleteHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();

        const _id = userObj?._id;
        changeRole({ _id, role });

        closeHandler();
    };

    useEffect(() => {
        data && toast.success("تغییر نقش کاربر با موفقیت انجام شد.");
        error && toast.error("متاسفانه مشکلی در ارتباط با پایگاه داده بوجود آمده!");
    }, [data, error]);


    return (
        <Dialog
            open={open}
            onClose={closeHandler}
        >
            <DialogTitle>
                <div className='font-primary text-secondary md:w-[25rem] lg:w-[30rem]'>
                    {`نقش جدید کاربر "${name}" را انتخاب کنید:`}
                </div>
            </DialogTitle>
            <DialogContent>
                <div className='mb-4'>
                    <RadioGroup
                        row
                        value={role}
                        onChange={e => setRole((e.target as HTMLInputElement).value)}
                    >
                        <FormControlLabel value="USER" control={<Radio />} label="کاربر" />
                        <FormControlLabel value="ADMIN" control={<Radio />} label="ادمین" />
                    </RadioGroup>
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={deleteHandler} className='font-primary'>
                    اعمال شود
                </Button>
                <Button onClick={closeHandler} className='font-primary'>
                    انصراف
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ChangeUserRole;
