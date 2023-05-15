import { useState } from "react";
import moment from "jalali-moment";
import { MdModeEdit } from "react-icons/md";
import { IoTrashBinOutline } from "react-icons/io5";
import { BsCheck2Square } from "react-icons/bs";
import { VscCheck, VscClose } from "react-icons/vsc";
import { Rating } from "@mui/material";

import { useFetchAllCommentsQuery } from "../../API/comments";
import AcceptCommentModal from "./accept-comment";
import AnswerCommentModal from "./answer-comment";
import DeleteCommentModal from "./delete-comment";
import IComment from "../../interface/comments";


const Comments = () => {
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [openAcceptModal, setOpenAcceptModal] = useState(false);
    const [openAnswerModal, setOpenAnswerModal] = useState(false);
    const [commentObj, setCommentObj] = useState<IComment | null>(null);

    const { data: commentsArray } = useFetchAllCommentsQuery();

    const deleteHandler = (newCommentObj: IComment) => {
        setOpenDeleteModal(true);
        setCommentObj(newCommentObj);
    };

    const acceptHandler = (newCommentObj: IComment) => {
        setOpenAcceptModal(true);
        setCommentObj(newCommentObj);
    };

    const answerHandler = (newCommentObj: IComment) => {
        setOpenAnswerModal(true);
        setCommentObj(newCommentObj);
    };


    return (
        <div className="m-4 md:mx-20 lg:mx-32 xl:mx-44 mt-10">
            <h2 className="mb-10 text-xl">لیست کامنت های کاربران:</h2>
            <table className="block overflow-x-auto border-primary">
                <thead className="block">
                    <tr className="w-fit min-w-full flex justify-between bg-light">
                        <th className="min-w-[4rem] p-2">ردیف</th>
                        <th className="min-w-[20rem] p-2">متن</th>
                        <th className="min-w-[8rem] p-2">امتیاز</th>
                        <th className="min-w-[8rem] p-2">فرستنده</th>
                        <th className="min-w-[8rem] p-2">دوره</th>
                        <th className="min-w-[6rem] p-2">تاریخ</th>
                        <th className="min-w-[4rem] p-2">پاسخ؟</th>
                        <th className="min-w-[24rem] p-2">عملیات</th>
                    </tr>
                </thead>
                <tbody className="block">

                    {commentsArray && commentsArray.length > 0 ?

                        commentsArray.map((commentObj, index) => (
                            <tr className="w-fit min-w-full flex justify-between items-center py-2 border-primary-top" key={index}>
                                <th className="min-w-[4rem] text-gray">
                                    {index + 1}
                                </th>
                                <th className="min-w-[20rem] max-w-[16rem] text-gray text-sm">
                                    {commentObj.body}
                                </th>
                                <th className="min-w-[8rem] text-sm text-gray">
                                    {<Rating name="read-only" value={commentObj.score} precision={0.5} size='small' dir="ltr" readOnly />}
                                </th>
                                <th className="min-w-[8rem] text-sm text-gray">
                                    {commentObj.creator ? commentObj.creator.name : "_"}
                                </th>
                                <th className="min-w-[8rem] text-sm text-gray">
                                    {commentObj.course}
                                </th>
                                <th className="min-w-[6rem] text-sm text-gray">
                                    {moment(commentObj.createdAt).locale("fa").format("YYYY/MM/DD")}
                                </th>
                                <th className="min-w-[4rem] text-sm flex justify-center text-gray">
                                    {commentObj.isAnswer ?
                                        <VscCheck size="1.5rem" className="text-primary" /> :
                                        <VscClose size="1.5rem" className="text-red" />}
                                </th>
                                <th className="min-w-[24rem] flex gap-3 justify-center">
                                    <button className="bg-secondary py-1 px-2 rounded flex items-center gap-2" onClick={() => answerHandler(commentObj)}>
                                        <MdModeEdit size="1.2rem" />
                                        <span >پاسخ</span>
                                    </button>
                                    <button className="bg-red-primary py-1 px-2 rounded flex items-center gap-2" onClick={() => deleteHandler(commentObj)}>
                                        <IoTrashBinOutline size="1.2rem" />
                                        <span >حذف</span>
                                    </button>
                                    <button className="bg-primary py-1 px-2 rounded flex items-center gap-2" onClick={() => acceptHandler(commentObj)}>
                                        <BsCheck2Square size="1.2rem" />
                                        <span >پذیرفتن</span>
                                    </button>
                                </th>
                            </tr>
                        )) :

                        <tr className="text-center">
                            <th className='px-4 py-2 text-center text-gray'>کامنتی ای برای نمایش وجود ندارد.</th>
                        </tr>
                    }

                </tbody>
            </table>

            <DeleteCommentModal commentObj={commentObj} open={openDeleteModal} setOpen={setOpenDeleteModal} />
            <AcceptCommentModal commentObj={commentObj} open={openAcceptModal} setOpen={setOpenAcceptModal} />
            <AnswerCommentModal commentObj={commentObj} open={openAnswerModal} setOpen={setOpenAnswerModal} />

        </div>
    );
};

export default Comments;
