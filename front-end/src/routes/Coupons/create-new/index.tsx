import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { ThemeProvider } from '@emotion/react';
import { TextField } from '@mui/material';
import { CiSquarePlus } from 'react-icons/ci';

import { useCreateCouponMutation } from '../../../API/discount';
import CourseSelect from './course-select';
import darkTheme from '../../../feature/darkTheme';


const CreateNewCoupon = () => {
    const [couponName, setCouponName] = useState("");
    const [couponPercent, setCouponPercent] = useState(0);
    const [couponMax, setCouponMax] = useState(1);
    const [courseID, setCourseID] = useState("");

    const [createCoupon, { data, error }] = useCreateCouponMutation();

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // preparing data to server
        const body = {
            code: couponName,
            percent: couponPercent.toString(),
            course: courseID,
            max: couponMax
        };

        createCoupon(body);
    };

    // manage server responses
    useEffect(() => {
        (error) && toast.error("مشکلی در ارتباط با پایگاه داده بوجود آمده!");

        if (data) {
            toast.success("کدتخفیف جدید با موفقیت اضافه شد.");
            setCouponName("");
            setCouponPercent(0);
            setCourseID("");
            setCouponMax(1);
        }
    }, [data, error]);



    return (
        <div className='mb-16'>
            <h2 className='text-xl mb-6'>افزودن کدتخفیف جدید</h2>
            <form onSubmit={submitHandler}>
                <ThemeProvider theme={darkTheme}>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
                        <TextField
                            required
                            label="کدتخفیف"
                            value={couponName}
                            className='w-full font-primary'
                            size='small'
                            dir='ltr'
                            onChange={e => setCouponName(e.target.value)}
                        />
                        <TextField
                            required
                            label="درصد تخفیف"
                            type='number'
                            value={couponPercent}
                            className='w-full font-primary'
                            size='small'
                            dir='ltr'
                            onChange={e => setCouponPercent(+e.target.value)}
                        />
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
                        <CourseSelect setCourseID={setCourseID} courseID={courseID} />

                        <TextField
                            required
                            label="حداکثر استفاده"
                            type='number'
                            value={couponMax}
                            className='w-full font-primary'
                            size='small'
                            dir='ltr'
                            onChange={e => setCouponMax(+e.target.value)}
                        />
                    </div>
                </ThemeProvider>
                <div className='flex gap-2'>
                    <button className='bg-primary  gap-2 flex py-2 px-2 rounded' >
                        <CiSquarePlus size="1.6rem" />
                        <span>افزودن</span>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateNewCoupon;
