import { ReactNode } from "react";

export interface ISubMenu {
    title: string,
    link?: string;
    href?: string;
    _id?: string;
}


export default interface IMenu {
    title: string,
    icon?: ReactNode,
    link?: string,
    href?: string;
    subMenu?: ISubMenu[];
    parent?: ISubMenu;
    _id?: string;
}