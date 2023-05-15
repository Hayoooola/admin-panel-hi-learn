import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { ThemeProvider } from '@emotion/react';
import { FormControlLabel, Radio, RadioGroup, TextField } from '@mui/material';
import { CiSquarePlus } from 'react-icons/ci';

import { useCreateNewCourseMutation } from '../../../API/courses';
import darkTheme from '../../../feature/darkTheme';
import CategorySelect from './category-select';


const CreateNewCourse = () => {
    const [courseName, setCourseName] = useState("");
    const [courseShortName, setCourseShortName] = useState("");
    const [courseDescription, setCourseDescription] = useState("");
    const [coursePrice, setCoursePrice] = useState<number | string>("");
    const [courseSupport, setCourseSupport] = useState("");
    const [categoryID, setCategoryID] = useState("");
    const [courseCover, setCourseCover] = useState<FileList | string>("");
    const [courseStatus, setCourseStatus] = useState('presale');

    const [createNewCourse, { data, error }] = useCreateNewCourseMutation();

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // preparing data to server
        const formData = new FormData();
        formData.append("name", courseName);
        formData.append("description", courseDescription);
        formData.append("shortName", courseShortName);
        formData.append("categoryID", categoryID);
        formData.append("price", coursePrice.toLocaleString());
        formData.append("support", courseSupport);
        formData.append("status", courseStatus);
        if (courseCover) {
            for (let file of courseCover) {
                formData.append('cover', file);
            }
        }

        createNewCourse(formData);
    };

    // manage server responses
    useEffect(() => {
        error && toast.error("مشکلی در ارتباط به پایگاه داده بوجود آمده!");

        if (data) {
            toast.success("دسته بندی جدید با موفقیت اضافه شد.");
            setCourseName("");
            setCourseShortName("");
            setCourseDescription("");
            setCoursePrice("");
            setCourseSupport("");
            setCategoryID("");
            setCourseCover("");
            setCourseStatus("");
        }
    }, [data, error]);



    return (
        <div className='mb-16'>
            <h2 className='text-xl mb-6'>افزودن دوره جدید</h2>
            <form onSubmit={submitHandler}>
                <ThemeProvider theme={darkTheme}>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
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
                        <CategorySelect setCategoryID={setCategoryID} />

                        <TextField
                            required
                            label="گزینش تصویر"
                            className='w-full font-primary'
                            type='file'
                            size='small'
                            onChange={e => { setCourseCover((e.target as HTMLInputElement).files || ""); }}
                        />
                    </div>
                    <div className='mb-4'>
                        <RadioGroup
                            row
                            value={courseStatus}
                            onChange={e => setCourseStatus((e.target as HTMLInputElement).value)}
                        >
                            <FormControlLabel value="presale" control={<Radio />} label="پیش فروش" />
                            <FormControlLabel value="start" control={<Radio />} label="درحال برگزاری" />
                        </RadioGroup>
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

export default CreateNewCourse;
