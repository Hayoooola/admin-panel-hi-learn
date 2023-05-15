import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { ThemeProvider } from '@emotion/react';
import { TextField } from '@mui/material';
import { CiSquarePlus } from 'react-icons/ci';

import { useCreateUserMutation } from '../../../API/users';
import darkTheme from '../../../feature/darkTheme';


const CreateNewUser = () => {
    const [newName, setNewName] = useState("");
    const [newUserName, setNewUserName] = useState("");
    const [newUserEmail, setNewUserEmail] = useState("");
    const [newUserPhone, setNewUserPhone] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const [createNewUser, { data, error }] = useCreateUserMutation();

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const body = {
            name: newName,
            username: newUserName,
            email: newUserEmail,
            phone: newUserPhone,
            password: newPassword,
            confirmPassword: newPassword,
        };

        createNewUser(body);

        setNewName("");
        setNewUserName("");
        setNewUserEmail("");
        setNewUserPhone("");
        setNewPassword("");
    };

    useEffect(() => {
        data && toast.success("کاربر جدید با موفقیت اضافه شد.");
        if (error && "status" in error) {
            error.status === 409 ?
                toast.error("کاربری با این مشخصات و ایمیل وجود دارد!") :
                toast.error("مشکلی در ارتباط به پایگاه داده بوجود آمده!");

        }
    }, [data, error]);


    return (
        <div className='mb-16'>
            <h2 className='text-xl mb-6'>افزودن کاربر جدید</h2>
            <form onSubmit={submitHandler}>
                <ThemeProvider theme={darkTheme}>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
                        <TextField
                            required
                            label="نام"
                            value={newName}
                            className='w-full font-primary'
                            size='small'
                            dir='ltr'
                            onChange={e => setNewName(e.target.value)}
                        />
                        <TextField
                            required
                            label="نام کاربری"
                            value={newUserName}
                            className='w-full font-primary'
                            size='small'
                            dir='ltr'
                            onChange={e => setNewUserName(e.target.value)}
                        />
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
                        <TextField
                            required
                            type='email'
                            label="ایمیل"
                            value={newUserEmail}
                            className='w-full font-primary'
                            size='small'
                            dir='ltr'
                            onChange={e => setNewUserEmail(e.target.value)}
                        />
                        <TextField
                            required
                            type='number'
                            label="شماره تماس"
                            value={newUserPhone}
                            className='w-full font-primary'
                            size='small'
                            dir='ltr'
                            onChange={e => setNewUserPhone(e.target.value)}
                        />
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
                        <TextField
                            required
                            type='password'
                            label="کلمه عبور"
                            value={newPassword}
                            className='w-full font-primary'
                            size='small'
                            dir='ltr'
                            autoComplete='suggested'
                            onChange={e => setNewPassword(e.target.value)}
                        />
                    </div>
                </ThemeProvider>
                <button className='btn-primary' >
                    <CiSquarePlus size="1.6rem" />
                    <span>افزودن</span>
                </button>
            </form>
        </div>
    );
};

export default CreateNewUser;
