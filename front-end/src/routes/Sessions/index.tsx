import { useState } from "react";
import moment from "jalali-moment";
import { IoTrashBinOutline } from "react-icons/io5";

import { useFetchAllSessionsQuery } from "../../API/sessions";
import CreateNewSession from "./create-new";
import DeleteSessionModal from "./delete-session";
import { ISessions } from "../../interface/course-data";


const Sessions = () => {
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [sessionObj, setSessionObj] = useState<ISessions | null>(null);

    const { data: sessionsArray } = useFetchAllSessionsQuery();

    const deleteHandler = (newsessionObj: ISessions | null) => {
        setOpenDeleteModal(true);
        setSessionObj(newsessionObj);
    };


    return (
        <div className="m-4 md:mx-20 lg:mx-32 xl:mx-44 mt-10">
            <CreateNewSession />

            <table className="block overflow-x-auto border-primary">
                <thead className="block">
                    <tr className="w-fit min-w-full flex justify-between bg-light">
                        <th className="min-w-[4rem] bg-light p-2">ردیف</th>
                        <th className="min-w-[20rem] bg-light p-2">عنوان</th>
                        <th className="min-w-[10rem] bg-light p-2">تایم</th>
                        <th className="min-w-[16rem] bg-light p-2">دوره</th>
                        <th className="min-w-[4rem] bg-light p-2">تاریخ</th>
                        <th className="min-w-[16rem] bg-light p-2">عملیات</th>
                    </tr>
                </thead>
                <tbody className="block">

                    {sessionsArray && sessionsArray.length > 0 ?

                        sessionsArray.map((sessionObj, index) => (
                            <tr className="w-fit min-w-full flex justify-between items-center py-2 border-primary-top" key={index}>
                                <th className="min-w-[4rem] text-gray">{index + 1}</th>
                                <th className="min-w-[20rem] text-gray">{sessionObj?.title}</th>
                                <th className="min-w-[10rem] text-sm text-gray">{sessionObj?.time}</th>
                                <th className="min-w-[16rem] text-sm text-gray">{sessionObj?.course.name}</th>
                                <th className="min-w-[4rem] text-sm text-gray">
                                    {moment(sessionObj?.updatedAt).locale("fa").format("YYYY/MM/DD")}
                                </th>
                                <th className="min-w-[16rem] flex gap-4 justify-center">
                                    <button className="bg-red-primary py-1 px-4 rounded flex items-center gap-2" onClick={() => deleteHandler(sessionObj)}>
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

            <DeleteSessionModal sessionObj={sessionObj} open={openDeleteModal} setOpen={setOpenDeleteModal} />

        </div>
    );
};

export default Sessions;
