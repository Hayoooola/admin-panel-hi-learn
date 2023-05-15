import { useState } from "react";
import moment from "jalali-moment";
import { IoTrashBinOutline } from "react-icons/io5";

import { useFetchAllArticlesQuery } from "../../API/article";
import CreateNewArticle from "./create-new";
import IArticle from "../../interface/articles";
import DeleteArticleModal from "./delete-article";


const Articles = () => {
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [articleObj, setArticleObj] = useState<IArticle | null>(null);

    const { data: articlesArray } = useFetchAllArticlesQuery();

    const deleteHandler = (newArticleObj: IArticle | null) => {
        setOpenDeleteModal(true);
        setArticleObj(newArticleObj);
    };


    return (
        <div className="m-4 md:mx-20 lg:mx-32 xl:mx-44 mt-10">
            <CreateNewArticle />

            <table className="block overflow-x-auto border-primary">
                <thead className="block">
                    <tr className="w-fit min-w-full flex justify-between bg-light">
                        <th className="min-w-[4rem] bg-light p-2">ردیف</th>
                        <th className="min-w-[24rem] bg-light p-2">عنوان</th>
                        <th className="min-w-[14rem] bg-light p-2">وضعیت</th>
                        <th className="min-w-[16rem] bg-light p-2">نویسنده</th>
                        <th className="min-w-[4rem] bg-light p-2">تاریخ</th>
                        <th className="min-w-[16rem] bg-light p-2">عملیات</th>
                    </tr>
                </thead>
                <tbody className="block">

                    {articlesArray && articlesArray.length > 0 ?

                        articlesArray.map((articleObj, index) => (
                            <tr className="w-fit min-w-full flex justify-between items-center py-2 border-primary-top" key={index}>
                                <th className="min-w-[4rem] text-gray">{index + 1}</th>
                                <th className="min-w-[24rem] text-gray">{articleObj?.title}</th>
                                <th className="min-w-[14rem] text-sm text-gray">
                                    {articleObj?.publish ?
                                        "منتشر شده" :
                                        "پیش نویس"
                                    }
                                </th>
                                <th className="min-w-[16rem] text-sm text-gray">{articleObj?.creator.name}</th>
                                <th className="min-w-[4rem] text-sm text-gray">
                                    {moment(articleObj?.updatedAt).locale("fa").format("YYYY/MM/DD")}
                                </th>
                                <th className="min-w-[16rem] flex gap-4 justify-center">
                                    <button className="bg-red-primary py-1 px-4 rounded flex items-center gap-2" onClick={() => deleteHandler(articleObj)}>
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

            <DeleteArticleModal articleObj={articleObj} open={openDeleteModal} setOpen={setOpenDeleteModal} />

        </div>
    );
};

export default Articles;
