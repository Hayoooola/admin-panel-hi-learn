import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { ThemeProvider } from '@emotion/react';
import { FormControlLabel, Radio, RadioGroup, TextField } from '@mui/material';
import { CiSquarePlus } from 'react-icons/ci';

import { useCreateSessionMutation } from '../../../API/sessions';
import darkTheme from '../../../feature/darkTheme';
import CourseSelect from './course-select';


const CreateNewSession = () => {
    const [sessionName, setSessionName] = useState("");
    const [sessionTime, setSessionTime] = useState("");
    const [courseID, setCourseID] = useState("");
    const [sessionVideo, setSessionVideo] = useState<FileList | string>("");
    const [sessionStatus, setSessionStatus] = useState(0);

    const [createSession, { data, error }] = useCreateSessionMutation();

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // preparing data to server
        const formData = new FormData();
        formData.append("title", sessionName);
        formData.append("time", sessionTime);
        formData.append("free", JSON.stringify(sessionStatus));
        if (sessionVideo) {
            for (let file of sessionVideo) {
                formData.append('video', file);
            }
        }

        createSession({ body: formData, courseID });
    };

    // manage server responses
    useEffect(() => {
        error && toast.error("مشکلی در ارتباط با پایگاه داده بوجود آمده!");

        if (data) {
            toast.success("جلسه جدید با موفقیت اضافه شد.");
            setSessionName("");
            setSessionTime("");
            setCourseID("");
            setSessionVideo("");
            setSessionStatus(0);
        }
    }, [data, error]);



    return (
        <div className='mb-16'>
            <h2 className='text-xl mb-6'>افزودن جلسه جدید</h2>
            <form onSubmit={submitHandler}>
                <ThemeProvider theme={darkTheme}>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
                        <TextField
                            required
                            label="عنوان"
                            value={sessionName}
                            className='w-full font-primary'
                            size='small'
                            dir='ltr'
                            onChange={e => setSessionName(e.target.value)}
                        />
                        <TextField
                            required
                            label="مدت زمان"
                            value={sessionTime}
                            className='w-full font-primary'
                            size='small'
                            dir='ltr'
                            onChange={e => setSessionTime(e.target.value)}
                        />
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
                        <CourseSelect setCourseID={setCourseID} />

                        <TextField
                            required
                            label="گزینش ویدیو"
                            className='w-full font-primary'
                            type='file'
                            size='small'
                            onChange={e => { setSessionVideo((e.target as HTMLInputElement).files || ""); }}
                        />
                    </div>
                    <div className='mb-4'>
                        <RadioGroup
                            row
                            value={sessionStatus}
                            onChange={e => setSessionStatus(+(e.target as HTMLInputElement).value)}
                        >
                            <FormControlLabel value={0} control={<Radio />} label="رایگان" />
                            <FormControlLabel value={1} control={<Radio />} label="غیر رایگان" />
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

export default CreateNewSession;
