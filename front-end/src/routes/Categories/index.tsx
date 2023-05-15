import { useState } from 'react';
import { IoTrashBinOutline } from 'react-icons/io5';
import { MdModeEdit } from 'react-icons/md';

import { useFetchAllCategoriesQuery } from '../../API/category';
import { ICategoryID } from '../../interface/course-data';
import CreateNewCategory from './create-new';
import DeleteCategoryModal from './delete-category';
import EditCategoryModal from './edit-category';


const Categories = () => {
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [categoryObj, setCategoryObj] = useState<ICategoryID | null>(null);

    const { data: categoryArray } = useFetchAllCategoriesQuery();

    const deleteHandler = (newCategoryObj: ICategoryID) => {
        setOpenDeleteModal(true);
        setCategoryObj(newCategoryObj);
    };

    const editHandler = (newCategoryObj: ICategoryID) => {
        setOpenEditModal(true);
        setCategoryObj(newCategoryObj);
    };


    return (
        <div className="m-4 md:mx-20 lg:mx-32 xl:mx-44 mt-10">
            <CreateNewCategory />

            <table className="block overflow-x-auto border-primary">
                <thead className="block">
                    <tr className="w-fit min-w-full flex justify-between bg-light">
                        <th className="min-w-[4rem] p-2">ردیف</th>
                        <th className="min-w-[12rem] p-2">عنوان</th>
                        <th className="min-w-[12rem] p-2">نامک</th>
                        <th className="min-w-[24rem] p-2">عملیات</th>
                    </tr>
                </thead>
                <tbody className="block">

                    {categoryArray && categoryArray.length > 0 ?

                        categoryArray.map((categoryObj, index) => (
                            <tr className="w-fit min-w-full flex justify-between items-center py-2 border-primary-top" key={index}>
                                <th className="min-w-[4rem] text-gray">{index + 1}</th>
                                <th className="min-w-[12rem] text-gray">{categoryObj.title}</th>
                                <th className="min-w-[12rem] text-sm text-gray">{categoryObj.name}</th>
                                <th className="min-w-[24rem] flex gap-4 justify-center">
                                    <button className="bg-yellow-primary py-1 px-4 rounded flex items-center gap-2" onClick={() => editHandler(categoryObj)}>
                                        <MdModeEdit size="1.2rem" />
                                        <span >ویرایش</span>
                                    </button>
                                    <button className="bg-red-primary py-1 px-4 rounded flex items-center gap-2" onClick={() => deleteHandler(categoryObj)}>
                                        <IoTrashBinOutline size="1.2rem" />
                                        <span >حذف</span>
                                    </button>
                                </th>
                            </tr>
                        )) :

                        <tr className="text-center">
                            <th className='px-4 py-2 text-center text-gray'>دسته ای برای نمایش وجود ندارد.</th>
                        </tr>
                    }

                </tbody>
            </table>

            <DeleteCategoryModal categoryObj={categoryObj} open={openDeleteModal} setOpen={setOpenDeleteModal} />
            <EditCategoryModal categoryObj={categoryObj} open={openEditModal} setOpen={setOpenEditModal} />

        </div>
    );
};

export default Categories;
