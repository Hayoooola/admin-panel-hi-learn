import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { ThemeProvider } from '@emotion/react';
import { TextField } from '@mui/material';
import { CiSquarePlus } from 'react-icons/ci';
import { RiDraftLine } from 'react-icons/ri';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { useCreateArticleMutation } from '../../../API/article';
import CategorySelect from './category-select';
import darkTheme from '../../../feature/darkTheme';
import { useDraftArticleMutation } from '../../../API/article';


const CreateNewArticle = () => {
    const [articleName, setArticleName] = useState("");
    const [articleShortName, setArticleShortName] = useState("");
    const [articleDescription, setArticleDescription] = useState("");
    const [articleBody, setArticleBody] = useState("<p></p>");
    const [categoryID, setCategoryID] = useState("");
    const [articleCover, setArticleCover] = useState<FileList | string>("");
    const [isDraft, setIsDraft] = useState(false);

    const [createArticle, { data, error }] = useCreateArticleMutation();
    const [draftArticle, { data: draftData, error: draftError }] = useDraftArticleMutation();

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // preparing data to server
        const formData = new FormData();
        formData.append("title", articleName);
        formData.append("description", articleDescription);
        formData.append("body", articleBody);
        formData.append("shortName", articleShortName);
        formData.append("categoryID", categoryID);
        if (articleCover) {
            for (let file of articleCover) {
                formData.append('cover', file);
            }
        }

        isDraft ? draftArticle(formData) : createArticle(formData);
    };

    // manage server responses
    useEffect(() => {
        (error || draftError) && toast.error("مشکلی در ارتباط با پایگاه داده بوجود آمده!");

        if (data || draftData) {
            toast.success("مقاله جدید با موفقیت اضافه شد.");
            setArticleName("");
            setArticleShortName("");
            setArticleCover("");
            setCategoryID("");
            setArticleDescription("");
        }
    }, [data, error, draftData, draftError]);



    return (
        <div className='mb-16'>
            <h2 className='text-xl mb-6'>افزودن مقاله جدید</h2>
            <form onSubmit={submitHandler}>
                <ThemeProvider theme={darkTheme}>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
                        <TextField
                            required
                            label="عنوان"
                            value={articleName}
                            className='w-full font-primary'
                            size='small'
                            dir='ltr'
                            onChange={e => setArticleName(e.target.value)}
                        />
                        <TextField
                            required
                            label="نامک"
                            value={articleShortName}
                            className='w-full font-primary'
                            size='small'
                            dir='ltr'
                            onChange={e => setArticleShortName(e.target.value)}
                        />
                    </div>
                    <div className='mb-4'>
                        <TextField
                            required
                            label="خلاصه مقاله"
                            value={articleDescription}
                            className='w-full font-primary'
                            multiline
                            minRows={3}
                            dir='ltr'
                            onChange={e => setArticleDescription(e.target.value)}
                        />
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
                        <CategorySelect setCategoryID={setCategoryID} categoryID={categoryID} />

                        <TextField
                            required
                            label="گزینش تصویر"
                            className='w-full font-primary'
                            type='file'
                            size='small'
                            onChange={e => { setArticleCover((e.target as HTMLInputElement).files || ""); }}
                        />
                    </div>
                    <div className='mb-4'>
                        <h2>متن مقاله</h2>
                        <CKEditor
                            editor={ClassicEditor}
                            data=""
                            config={{ language: "fa" }}
                            onChange={(event, editor) => setArticleBody(editor.getData())}
                        />
                    </div>
                </ThemeProvider>
                <div className='flex gap-2'>
                    <button className='bg-primary  gap-2 flex py-2 px-2 rounded' >
                        <CiSquarePlus size="1.6rem" />
                        <span>انتشار</span>
                    </button>
                    <button className='bg-secondary gap-2  flex py-2 px-2 rounded' onClick={() => setIsDraft(true)}>
                        <RiDraftLine size="1.4rem" />
                        <span>پیش نویس</span>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateNewArticle;
