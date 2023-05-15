import IUserData from "../userData";

export default interface IStore {
    adminData: IAdminData;
}

export interface IAdminData {
    isAdmin: boolean,
    token: string | null;
    adminData: IUserData | null;
}