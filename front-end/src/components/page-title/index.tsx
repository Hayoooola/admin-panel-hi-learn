import { FC, ReactNode } from "react";
import "./index.css";

interface IProps {
    title: string;
    Icon: ReactNode;
}


const PageTitle: FC<IProps> = ({ title, Icon }) => {
    return (
        <div className="page-title flex gap-2">
            <div className="w-[2rem] h-[2rem] page-title__icon">
                {Icon}
            </div>
            <h1 className="text-xl ">{title}</h1>
        </div>
    );
};

export default PageTitle;
