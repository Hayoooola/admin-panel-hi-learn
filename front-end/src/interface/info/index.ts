import IUserData from "../userData";

export default interface IInfo {
    infos: Infos[],
    lastUsers: IUserData[],
    adminName: string;
}

interface Infos {
    count: number,
    title: string;
}