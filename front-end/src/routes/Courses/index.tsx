import { useState } from 'react';
import { Rating } from '@mui/material';
import { IoTrashBinOutline } from 'react-icons/io5';
import { MdModeEdit } from 'react-icons/md';

import { useFetchAllCoursesQuery } from '../../API/courses';
import ICourseData from '../../interface/course-data';
import CreateNewCourse from './create-new';
import DeleteCourseModal from './delete-course';
import EditCourseModal from './edit-course';


const Courses = () => {
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [courseObj, setCourseObj] = useState<ICourseData | null>(null);

    const { data: courseArray } = useFetchAllCoursesQuery();

    const deleteHandler = (newCourseObj: ICourseData | null) => {
        setOpenDeleteModal(true);
        setCourseObj(newCourseObj);
    };

    const editHandler = (newCourseObj: ICourseData | null) => {
        setOpenEditModal(true);
        setCourseObj(newCourseObj);
    };


    return (
        <div className="m-4 md:mx-20 lg:mx-32 xl:mx-44 mt-10">
            <CreateNewCourse />

            <table className="block overflow-x-auto border-primary">
                <thead className="block">
                    <tr className="w-fit min-w-full flex justify-between bg-light">
                        <th className="min-w-[4rem] bg-light p-2">ردیف</th>
                        <th className="min-w-[20rem] bg-light p-2">عنوان</th>
                        <th className="min-w-[10rem] bg-light p-2">دسته</th>
                        <th className="min-w-[8rem] bg-light p-2">نامک</th>
                        <th className="min-w-[4rem] bg-light p-2">مبلغ</th>
                        <th className="min-w-[6rem] bg-light p-2">امتیاز</th>
                        <th className="min-w-[4rem] bg-light p-2">وضعیت</th>
                        <th className="min-w-[16rem] bg-light p-2">عملیات</th>
                    </tr>
                </thead>
                <tbody className="block">

                    {courseArray && courseArray.length > 0 ?

                        courseArray.map((courseObj, index) => (
                            <tr className="w-fit min-w-full flex justify-between items-center py-2 border-primary-top" key={index}>
                                <th className="min-w-[4rem] text-gray">{index + 1}</th>
                                <th className="min-w-[20rem] text-gray">{courseObj?.name}</th>
                                <th className="min-w-[10rem] text-sm text-gray">{courseObj?.categoryID.title}</th>
                                <th className="min-w-[8rem] text-sm text-gray">{courseObj?.shortName}</th>
                                <th className="min-w-[4rem] text-sm text-gray">{courseObj?.price}</th>
                                <th className="min-w-[6rem] text-sm text-gray">
                                    <Rating name="read-only" value={courseObj.courseAverageScore} precision={0.5} size='small' dir='ltr' readOnly />
                                </th>
                                <th className="min-w-[4rem] text-sm text-gray">{courseObj?.status}</th>
                                <th className="min-w-[16rem] flex gap-4 justify-center">
                                    <button className="bg-yellow-primary py-1 px-4 rounded flex items-center gap-2" onClick={() => editHandler(courseObj)}>
                                        <MdModeEdit size="1.2rem" />
                                        <span >ویرایش</span>
                                    </button>
                                    <button className="bg-red-primary py-1 px-4 rounded flex items-center gap-2" onClick={() => deleteHandler(courseObj)}>
                                        <IoTrashBinOutline size="1.2rem" />
                                        <span >حذف</span>
                                    </button>
                                </th>
                            </tr>
                        )) :

                        <tr className="text-center">
                            <th className='px-4 py-2 text-center text-gray'>دوره ای برای نمایش وجود ندارد.</th>
                        </tr>
                    }

                </tbody>
            </table>

            <DeleteCourseModal courseObj={courseObj} open={openDeleteModal} setOpen={setOpenDeleteModal} />
            <EditCourseModal courseObj={courseObj} open={openEditModal} setOpen={setOpenEditModal} />

        </div>
    );
};

export default Courses;
