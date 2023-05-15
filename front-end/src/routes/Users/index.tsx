import { useState } from "react";
import { IoTrashBinOutline } from "react-icons/io5";
import { FaUserTie } from "react-icons/fa";

import { useFetchAllUsersQuery } from "../../API/users";
import CreateNewUser from "./create-new";
import DeleteCategoryModal from "./delete-user";
import ChangeUserRole from "./change-role";
import IUserData from "../../interface/userData";


const Users = () => {
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [openChangeRoleModal, setOpenChangeRoleModal] = useState(false);
    const [userObj, setUserObj] = useState<IUserData | null>(null);

    const { data: usersArray } = useFetchAllUsersQuery();

    const deleteHandler = (newUserObj: IUserData) => {
        setOpenDeleteModal(true);
        setUserObj(newUserObj);
    };

    const changeRoleHandler = (newUserObj: IUserData) => {
        setOpenChangeRoleModal(true);
        setUserObj(newUserObj);
    };


    return (
        <div className="m-4 md:mx-20 lg:mx-32 xl:mx-44 mt-10">
            <CreateNewUser />

            <table className="block overflow-x-auto border-primary">
                <thead className="block">
                    <tr className="w-fit min-w-full flex justify-between bg-light">
                        <th className="min-w-[4rem] p-2">ردیف</th>
                        <th className="min-w-[10rem] p-2">نام</th>
                        <th className="min-w-[12rem] p-2">نام کاربری</th>
                        <th className="min-w-[10rem] p-2">شماره</th>
                        <th className="min-w-[12rem] p-2">ایمیل</th>
                        <th className="min-w-[6rem] p-2">نقش</th>
                        <th className="min-w-[24rem] p-2">عملیات</th>
                    </tr>
                </thead>
                <tbody className="block">

                    {usersArray && usersArray.length > 0 ?

                        usersArray.map((userObj, index) => (
                            <tr className="w-fit min-w-full flex justify-between items-center py-2 border-primary-top" key={index}>
                                <th className="min-w-[4rem] text-gray">{index + 1}</th>
                                <th className="min-w-[10rem] text-gray">{userObj.name}</th>
                                <th className="min-w-[12rem] text-sm text-gray">{userObj.username}</th>
                                <th className="min-w-[10rem] text-sm text-gray">{userObj.phone}</th>
                                <th className="min-w-[12rem] text-sm text-gray">{userObj.email}</th>
                                <th className="min-w-[6rem] text-sm text-gray">{userObj.role}</th>
                                <th className="min-w-[24rem] flex gap-3 justify-center">
                                    <button className="bg-secondary py-1 px-4 rounded flex items-center gap-2" onClick={() => changeRoleHandler(userObj)}>
                                        <FaUserTie size="1.2rem" />
                                        <span >تغییر نقش</span>
                                    </button>
                                    <button className="bg-red-primary py-1 px-4 rounded flex items-center gap-2" onClick={() => deleteHandler(userObj)}>
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

            <DeleteCategoryModal userObj={userObj} open={openDeleteModal} setOpen={setOpenDeleteModal} />
            <ChangeUserRole userObj={userObj} open={openChangeRoleModal} setOpen={setOpenChangeRoleModal} />

        </div>
    );
};

export default Users;
