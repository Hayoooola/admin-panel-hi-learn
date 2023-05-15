import { FC, useState } from "react";
import { FaUserTie } from "react-icons/fa";
import { IoTrashBinOutline } from "react-icons/io5";

import IUserData from "../../../interface/userData";

interface IProps {
    usersArray: IUserData[] | undefined;
}


const LatestUsers: FC<IProps> = ({ usersArray }) => {

    return (
        <div className="mt-20">
            <h2 className='text-xl mb-5'>اخیراْ ثبت نام شده:</h2>
            <table className="block overflow-x-auto border-primary">
                <thead className="block">
                    <tr className="w-fit min-w-full flex justify-between bg-light">
                        <th className="min-w-[4rem] p-2">ردیف</th>
                        <th className="min-w-[10rem] p-2">نام</th>
                        <th className="min-w-[12rem] p-2">نام کاربری</th>
                        <th className="min-w-[10rem] p-2">شماره</th>
                        <th className="min-w-[12rem] p-2">ایمیل</th>
                        <th className="min-w-[6rem] p-2">نقش</th>
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
                            </tr>
                        )) :

                        <tr className="text-center">
                            <th className='px-4 py-2 text-center text-gray'>دسته ای برای نمایش وجود ندارد.</th>
                        </tr>
                    }

                </tbody>
            </table>
        </div>
    );
};

export default LatestUsers;
