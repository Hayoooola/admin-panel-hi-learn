import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { ThemeProvider } from '@emotion/react';
import { TextField } from '@mui/material';
import { CiSquarePlus } from 'react-icons/ci';

import { useCreateNewCategoryMutation } from '../../../API/category';
import darkTheme from '../../../feature/darkTheme';


const CreateNewCategory = () => {
    const [newCategoryTitle, setNewCategoryTitle] = useState("");
    const [newCategoryName, setNewCategoryName] = useState("");

    const [createNewCategory, { data, error }] = useCreateNewCategoryMutation();

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        createNewCategory({ title: newCategoryTitle, name: newCategoryName });
        setNewCategoryTitle("");
        setNewCategoryName("");
    };

    useEffect(() => {
        data && toast.success("دسته بندی جدید با موفقیت اضافه شد.");
        error && toast.error("مشکلی در ارتباط به پایگاه داده بوجود آمده!");
    }, [data, error]);


    return (
        <div className='mb-16'>
            <h2 className='text-xl mb-6'>افزودن دسته جدید</h2>
            <form onSubmit={submitHandler}>
                <ThemeProvider theme={darkTheme}>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
                        <TextField
                            required
                            label="عنوان"
                            value={newCategoryTitle}
                            className='w-full font-primary'
                            dir='ltr'
                            onChange={e => setNewCategoryTitle(e.target.value)}
                        />
                        <TextField
                            required
                            label="نامک"
                            value={newCategoryName}
                            className='w-full font-primary'
                            dir='ltr'
                            onChange={e => setNewCategoryName(e.target.value)}
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

export default CreateNewCategory;
