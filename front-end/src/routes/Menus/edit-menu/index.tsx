import { FC, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import IMenu from '../../../interface/menu';
import { useUpdateMenuMutation } from '../../../API/menu';

interface IProps {
    menuObj: IMenu | null;
    menuArray: IMenu[] | undefined;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IBody {
    title: string,
    href: string,
    parent?: string;
}


const EditMenuModal: FC<IProps> = ({ menuObj, menuArray, open, setOpen }) => {
    const [menuTitle, setMenuTitle] = useState("");
    const [menuHref, setMenuHref] = useState("");
    const [parent, setParent] = useState("");

    const [updateMenu, { data, error }] = useUpdateMenuMutation();

    // updating input values
    useEffect(() => {
        if (menuObj) {
            setMenuTitle(menuObj?.title);
            setMenuHref(menuObj?.href || "");
            setParent(menuObj?.parent?._id || "");
        }
    }, [menuObj]);

    const changeHandler = (event: SelectChangeEvent) => {
        setParent(event.target.value as string);
    };

    const closeHandler = () => {
        setOpen(false);
    };

    const editHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();

        // provide data to send to server
        const body: IBody = {
            title: menuTitle,
            href: menuHref,
        };
        if (parent && parent !== "") {
            body.parent = parent;
        }
        const _id = menuObj?._id;

        updateMenu({ body, _id });
        closeHandler();

        setMenuTitle("");
        setMenuHref("");
        setParent("");
    };

    // manage edit status
    useEffect(() => {
        data && toast.success("منو موردنظر با موفقیت ویرایش شد.");
        error && toast.error("متاسفانه مشکلی در ارتباط با پایگاه داده بوجود آمده!");
    }, [data, error]);


    return (
        <Dialog
            open={open}
            onClose={closeHandler}
        >
            <DialogTitle>
                <div className='font-primary text-secondary md:w-[25rem] lg:w-[30rem]'>
                    {`درحال ویرایش منو "${menuObj?.title}"`}
                </div>
            </DialogTitle>
            <DialogContent >
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 mt-2'>
                    <TextField
                        required
                        label="عنوان"
                        value={menuTitle}
                        className='w-full font-primary'
                        dir='ltr'
                        onChange={e => setMenuTitle(e.target.value)}
                    />
                    <TextField
                        required
                        label="نامک"
                        value={menuHref}
                        className='w-full font-primary'
                        dir='ltr'
                        onChange={e => setMenuHref(e.target.value)}
                    />
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
                    <FormControl className='w-full font-primary'>
                        <InputLabel id="select-parent">انتخاب والد</InputLabel>
                        <Select
                            id="select-parent"
                            value={parent}
                            onChange={changeHandler}
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

export default EditMenuModal;
