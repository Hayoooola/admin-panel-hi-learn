import ICourseData from "../course-data";

interface IUserData {
    email: string,
    name: string,
    role: "USER" | "ADMIN",
    username: string,
    phone: string;
    notifications: INotifications[];
    courses: ICourseData[];
    _id: string;
}

export interface INotifications {
    msg: string,
    see: number;
    updatedAt: string;
    _id: string;
}

export default IUserData;