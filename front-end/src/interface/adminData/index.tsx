import IUserData from "../userData";

export default interface IAdminData {
    isAdmin: boolean,
    token: string | null;
    adminData: IUserData | null;
}