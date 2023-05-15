import { useEffect } from "react";
import { useSelector } from "react-redux";
import moment from "jalali-moment";
import { toast } from "react-toastify";
import { BsClipboardCheck } from "react-icons/bs";
import { VscCheck } from "react-icons/vsc";
import { VscClose } from "react-icons/vsc";

import { useSeeNotificationMutation } from "../../API/auth";
import IStore from "../../interface/store";


const NotificationPage = () => {
    const notificationArray = useSelector((store: IStore) => store.adminData).adminData?.notifications;
    const token = useSelector((store: IStore) => store.adminData).token;

    const [seeNotification, { data, error }] = useSeeNotificationMutation();

    const seeHandler = (_id: string) => {
        seeNotification({ _id, token });
    };

    useEffect(() => {
        error && toast.error("مشکلی در ارتباط با پایگاه داده به وجود آمده!");
        data && toast.success(`پیغام مورد نظر با موفقیت به وضعیت "مشاهده شده" تغییر وضعیت داده شد.`);
    }, [data, error]);


    return (
        <div className="m-4 md:mx-20 lg:mx-32 xl:mx-44 mt-20">
            <table className="block overflow-x-auto border-primary">
                <thead className="block">
                    <tr className="w-fit min-w-full flex justify-between bg-light">
                        <th className="min-w-[4rem] bg-light p-2">ردیف</th>
                        <th className="min-w-[8rem] bg-light p-2">تاریخ</th>
                        <th className="min-w-[20rem] bg-light p-2">متن پیغام</th>
                        <th className="min-w-[8rem] bg-light p-2">مشاهده شده؟</th>
                        <th className="min-w-[12rem] bg-light p-2">عملیات</th>
                    </tr>
                </thead>
                <tbody className="block">

                    {notificationArray && notificationArray.length > 0 ?

                        notificationArray.map((notificationObj, index) => (
                            <tr className="w-fit min-w-full flex justify-between items-center py-2 border-primary-top" key={index}>
                                <th className="min-w-[4rem] text-gray">{index + 1}</th>
                                <th className="min-w-[8rem] text-gray">
                                    {moment(notificationObj.updatedAt).locale("fa").format("YYYY/MM/DD")}
                                </th>
                                <th className="min-w-[20rem] text-sm text-gray">{notificationObj.msg}</th>
                                <th className="min-w-[8rem]">
                                    <div className="flex justify-center items-center">
                                        {
                                            notificationObj.see ?
                                                <VscCheck size="1.5rem" className="text-primary" /> :
                                                <VscClose size="1.5rem" className="text-red" />
                                        }
                                    </div>
                                </th>
                                <th className="min-w-[12rem] flex justify-center">
                                    <button className="bg-primary py-1 px-4 rounded flex items-center gap-2 min-w-[9rem]">
                                        <BsClipboardCheck size="1.2rem" />
                                        <span onClick={() => seeHandler(notificationObj._id)}>مشاهده کردم</span>
                                    </button>
                                </th>
                            </tr>
                        )) :

                        <tr className="text-center">
                            <th>پیغامی برای نمایش وجود ندارد.</th>
                        </tr>
                    }

                </tbody>
            </table>
        </div>
    );
};

export default NotificationPage;
