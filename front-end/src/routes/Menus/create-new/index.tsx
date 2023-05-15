import { FC, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { ThemeProvider } from '@emotion/react';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import { CiSquarePlus } from 'react-icons/ci';

import { useCreateMenuMutation } from '../../../API/menu';
import darkTheme from '../../../feature/darkTheme';
import IMenu from '../../../interface/menu';

interface IProps {
    menuArray: IMenu[] | undefined;
}

interface IBody {
    title: string,
    href: string,
    parent?: string;
}


const CreateNewMenu: FC<IProps> = ({ menuArray }) => {
    const [newMenuTitle, setNewMenuTitle] = useState("");
    const [newMenuHref, setNewMenuHref] = useState("");
    const [parent, setParent] = useState("");

    const [createMenu, { data, error }] = useCreateMenuMutation();

    const handleChange = (event: SelectChangeEvent) => {
        setParent(event.target.value as string);
    };

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const body: IBody = {
            title: newMenuTitle,
            href: newMenuHref,
        };
        if (parent && parent !== "") {
            body.parent = parent;
        }

        createMenu(body);

        setNewMenuTitle("");
        setNewMenuHref("");
        setParent("");
    };

    useEffect(() => {
        data && toast.success("منو جدید با موفقیت اضافه شد.");
        error && toast.error("مشکلی در ارتباط به پایگاه داده بوجود آمده!");
    }, [data, error]);


    return (
        <div className='mb-16'>
            <h2 className='text-xl mb-6'>افزودن منو جدید</h2>
            <form onSubmit={submitHandler}>
                <ThemeProvider theme={darkTheme}>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
                        <TextField
                            required
                            label="عنوان"
                            value={newMenuTitle}
                            className='w-full font-primary'
                            dir='ltr'
                            onChange={e => setNewMenuTitle(e.target.value)}
                        />
                        <TextField
                            required
                            label="نامک"
                            value={newMenuHref}
                            className='w-full font-primary'
                            dir='ltr'
                            onChange={e => setNewMenuHref(e.target.value)}
                        />
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
                        <FormControl className='w-full font-primary'>
                            <InputLabel id="select-parent">انتخاب والد</InputLabel>
                            <Select
                                id="select-parent"
                                value={parent}
                                onChange={handleChange}
                            >
                                {(menuArray && menuArray.length > 0) ?

                                    menuArray.map((parentObj, index) => (
                                        <MenuItem value={parentObj._id} key={index} className='font-primary'>
                                            {parentObj.title}
                                        </MenuItem>
                                    )) :

                                    <MenuItem value={""} disabled className='font-primary'>والدی برای انتخاب وجود ندارد!</MenuItem>
                                }

                            </Select>
                        </FormControl>
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

export default CreateNewMenu;
