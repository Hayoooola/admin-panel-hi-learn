import { useState } from "react";
import { MdModeEdit } from "react-icons/md";
import { IoTrashBinOutline } from "react-icons/io5";

import { useFetchAllMenusQuery } from "../../API/menu";
import CreateNewMenu from "./create-new";
import DeleteMenuModal from "./delete-menu";
import IMenu from "../../interface/menu";
import EditMenuModal from "./edit-menu";

const Menus = () => {
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [menuObj, setMenuObj] = useState<IMenu | null>(null);

    const { data: menuArray } = useFetchAllMenusQuery();

    const deleteHandler = (newMenuObj: IMenu) => {
        setOpenDeleteModal(true);
        setMenuObj(newMenuObj);
    };

    const editHandler = (newMenuObj: IMenu) => {
        setOpenEditModal(true);
        setMenuObj(newMenuObj);
    };


    return (
        <div className="m-4 md:mx-20 lg:mx-32 xl:mx-44 mt-10">
            <CreateNewMenu menuArray={menuArray} />

            <table className="block overflow-x-auto border-primary">
                <thead className="block">
                    <tr className="w-fit min-w-full flex justify-between bg-light">
                        <th className="min-w-[4rem] p-2">ردیف</th>
                        <th className="min-w-[12rem] p-2">عنوان</th>
                        <th className="min-w-[12rem] p-2">والد</th>
                        <th className="min-w-[12rem] p-2">نامک</th>
                        <th className="min-w-[24rem] p-2">عملیات</th>
                    </tr>
                </thead>
                <tbody className="block">

                    {menuArray && menuArray.length > 0 ?

                        menuArray.map((menuObj, index) => (
                            <tr className="w-fit min-w-full flex justify-between items-center py-2 border-primary-top" key={index}>
                                <th className="min-w-[4rem] text-gray">{index + 1}</th>
                                <th className="min-w-[12rem] text-gray">{menuObj.title}</th>
                                <th className="min-w-[12rem] text-sm text-gray">{menuObj.parent?.title || "_"}</th>
                                <th className="min-w-[12rem] text-sm text-gray">{menuObj.href}</th>
                                <th className="min-w-[24rem] flex gap-4 justify-center">
                                    <button className="bg-yellow-primary py-1 px-4 rounded flex items-center gap-2" onClick={() => editHandler(menuObj)}>
                                        <MdModeEdit size="1.2rem" />
                                        <span >ویرایش</span>
                                    </button>
                                    <button className="bg-red-primary py-1 px-4 rounded flex items-center gap-2" onClick={() => deleteHandler(menuObj)}>
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

            <DeleteMenuModal menuObj={menuObj} open={openDeleteModal} setOpen={setOpenDeleteModal} />
            <EditMenuModal menuObj={menuObj} menuArray={menuArray} open={openEditModal} setOpen={setOpenEditModal} />

        </div>
    );
};

export default Menus;
