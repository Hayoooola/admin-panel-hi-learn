import { FC, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { FormControlLabel, Radio, RadioGroup, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { useUpdateCourseMutation } from '../../../API/courses';
import CategorySelect from '../create-new/category-select';
import ICourseData from '../../../interface/course-data';




interface IProps {
    courseObj: ICourseData | null;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}


const EditCourseModal: FC<IProps> = ({ courseObj, open, setOpen }) => {
    const [courseName, setCourseName] = useState("");
    const [courseShortName, setCourseShortName] = useState("");
    const [courseDescription, setCourseDescription] = useState("");
    const [coursePrice, setCoursePrice] = useState<number | string>("");
    const [courseSupport, setCourseSupport] = useState("");
    const [categoryID, setCategoryID] = useState("");
    const [courseCover, setCourseCover] = useState<FileList | string>("");
    const [courseStatus, setCourseStatus] = useState("");

    const [updateCourse, { data, error }] = useUpdateCourseMutation();

    const closeHandler = () => {
        setOpen(false);
    };

    // updating input values
    useEffect(() => {
        if (courseObj) {
            setCourseName(courseObj?.name);
            setCourseShortName(courseObj.shortName);
            setCourseDescription(courseObj.description);
            setCoursePrice(courseObj.price);
            setCourseSupport(courseObj.support);
            setCourseStatus(courseObj.status);
        }
    }, [courseObj]);

    // managing requests status
    useEffect(() => {
        data && toast.success("دوره موردنظر با موفقیت ویرایش شد.");
        error && toast.error("متاسفانه مشکلی در ارتباط با پایگاه داده بوجود آمده!");
    }, [data, error]);

    const editHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();

        // preparing data to server
        const _id = courseObj?._id;
        const formData = new FormData();
        formData.append("name", courseName);
        formData.append("description", courseDescription);
        formData.append("shortName", courseShortName);
        formData.append("categoryID", categoryID);
        formData.append("price", coursePrice as string);
        formData.append("support", courseSupport);
        formData.append("status", courseStatus);
        if (courseCover) {
            for (let file of courseCover) {
                formData.append('cover', file);
            }
        }

        updateCourse({ body: formData, _id });

        closeHandler();
    };


    return (
        <Dialog
            open={open}
            onClose={closeHandler}
        >
            <DialogTitle>
                <div className='font-primary text-secondary md:w-[25rem] lg:w-[30rem]'>
                    {`درحال ویرایش دوره "${courseObj?.name}"`}
                </div>
            </DialogTitle>
            <DialogContent >
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 mt-2'>
                    <TextField
                        required
                        label="عنوان"
                        value={courseName}
                        className='w-full font-primary'
                        size='small'
                        dir='ltr'
                        onChange={e => setCourseName(e.target.value)}
                    />
                    <TextField
                        required
                        label="نامک"
                        value={courseShortName}
                        className='w-full font-primary'
                        size='small'
                        dir='ltr'
                        onChange={e => setCourseShortName(e.target.value)}
                    />
                </div>
                <div className='mb-4'>
                    <TextField
                        required
                        label="توضیحات"
                        value={courseDescription}
                        className='w-full font-primary'
                        multiline
                        minRows={3}
                        dir='ltr'
                        onChange={e => setCourseDescription(e.target.value)}
                    />
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
                    <TextField
                        required
                        label="قیمت"
                        value={coursePrice}
                        type='number'
                        className='w-full font-primary'
                        size='small'
                        dir='ltr'
                        onChange={e => setCoursePrice(+e.target.value)}
                    />
                    <TextField
                        required
                        label="نحوه پشتیبانی"
                        value={courseSupport}
                        className='w-full font-primary'
                        size='small'
                        dir='ltr'
                        onChange={e => setCourseSupport(e.target.value)}
                    />
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
                    <TextField
                        required
                        label="گزینش تصویر"
                        className='w-full font-primary'
                        type='file'
                        size='small'
                        onChange={e => { setCourseCover((e.target as HTMLInputElement).files || ""); }}
                    />

                    <CategorySelect categoryID={courseObj?.categoryID} setCategoryID={setCategoryID} />
                </div>
                <div className='mb-4'>
                    <RadioGroup
                        row
                        name="row-radio-buttons-group"
                        value={courseStatus}
                        onChange={e => setCourseStatus((e.target as HTMLInputElement).value)}
                    >
                        <FormControlLabel value="presale" control={<Radio />} label="پیش فروش" />
                        <FormControlLabel value="start" control={<Radio />} label="درحال برگزاری" />
                        <FormControlLabel value="finished" control={<Radio />} label="به اتمام رسیده" />
                    </RadioGroup>
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

export default EditCourseModal;
