import { AiOutlineDashboard } from "react-icons/ai";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";
import { TfiMenuAlt } from "react-icons/tfi";
import { FaRegUser } from "react-icons/fa";
import { CgMenuGridR } from "react-icons/cg";
import { IoMdNotificationsOutline } from "react-icons/io";
import { SiAirplayvideo } from "react-icons/si";
import { RiArticleLine } from "react-icons/ri";
import { VscComment } from "react-icons/vsc";
import { TiTicket } from "react-icons/ti";

const menuArray = [
    { title: "پیشخوان", link: "/", icon: <AiOutlineDashboard /> },
    { title: "دوره ها", link: "/courses", icon: <AiOutlineFundProjectionScreen /> },
    { title: "منو ها", link: "/menus", icon: <TfiMenuAlt /> },
    { title: "کاربران", link: "/users", icon: <FaRegUser /> },
    { title: "دسته بندی ها", link: "/categories", icon: <CgMenuGridR /> },
    { title: "پیغام ها", link: "/notifications", icon: <IoMdNotificationsOutline /> },
    { title: "جلسات دوره", link: "/sessions", icon: <SiAirplayvideo /> },
    { title: "مقالات", link: "/articles", icon: <RiArticleLine /> },
    { title: "نظرات کاربران", link: "/comments", icon: <VscComment /> },
    { title: "کدهای تخفیف", link: "/coupons", icon: <TiTicket /> },
];

export default menuArray;