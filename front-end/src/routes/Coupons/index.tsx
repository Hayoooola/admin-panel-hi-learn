import { useState } from "react";
import moment from "jalali-moment";
import { IoTrashBinOutline } from "react-icons/io5";

import { useFetchAllCouponsQuery } from "../../API/discount";
import CreateNewCoupon from "./create-new";
import DeleteCouponModal from "./delete-coupon";
import ICoupon from "../../interface/coupon";


const Coupons = () => {
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [couponObj, setCouponObj] = useState<ICoupon | null>(null);

    const { data: articlesArray } = useFetchAllCouponsQuery();

    const deleteHandler = (newCouponObj: ICoupon | null) => {
        setOpenDeleteModal(true);
        setCouponObj(newCouponObj);
    };


    return (
        <div className="m-4 md:mx-20 lg:mx-32 xl:mx-44 mt-10">
            <CreateNewCoupon />

            <table className="block overflow-x-auto border-primary">
                <thead className="block">
                    <tr className="w-fit min-w-full flex justify-between bg-light">
                        <th className="min-w-[4rem] bg-light p-2">ردیف</th>
                        <th className="min-w-[20rem] bg-light p-2">کدتخفیف</th>
                        <th className="min-w-[8rem] bg-light p-2">درصد</th>
                        <th className="min-w-[8rem] bg-light p-2">سازنده</th>
                        <th className="min-w-[8rem] bg-light p-2">تاریخ ایجاد</th>
                        <th className="min-w-[8rem] bg-light p-2">حداکثر تعداد قابل استفاده</th>
                        <th className="min-w-[8rem] bg-light p-2"> شده تعداد استفاده</th>
                        <th className="min-w-[16rem] bg-light p-2">عملیات</th>
                    </tr>
                </thead>
                <tbody className="block">

                    {articlesArray && articlesArray.length > 0 ?

                        articlesArray.map((couponObj, index) => (
                            <tr className="w-fit min-w-full flex justify-between items-center py-2 border-primary-top" key={index}>
                                <th className="min-w-[4rem] text-gray">{index + 1}</th>
                                <th className="min-w-[20rem] text-gray">{couponObj?.code}</th>
                                <th className="min-w-[8rem] text-sm text-gray">{couponObj.percent}</th>
                                <th className="min-w-[8rem] text-sm text-gray">{couponObj?.creator}</th>
                                <th className="min-w-[8rem] text-sm text-gray">
                                    {moment(couponObj?.createdAt).locale("fa").format("YYYY/MM/DD")}
                                </th>
                                <th className="min-w-[8rem] text-sm text-gray">{couponObj.max}</th>
                                <th className="min-w-[8rem] text-sm text-gray">{couponObj?.uses}</th>
                                <th className="min-w-[16rem] flex gap-4 justify-center">
                                    <button className="bg-red-primary py-1 px-4 rounded flex items-center gap-2" onClick={() => deleteHandler(couponObj)}>
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

            <DeleteCouponModal couponObj={couponObj} open={openDeleteModal} setOpen={setOpenDeleteModal} />

        </div>
    );
};

export default Coupons;
