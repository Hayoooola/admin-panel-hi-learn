import { FC } from 'react';
import { FaRegUser } from 'react-icons/fa';
import { AiOutlineFundProjectionScreen } from 'react-icons/ai';
import { SiAirplayvideo } from 'react-icons/si';

import "./index.css";
import IInfo from '../../../interface/info';


interface IProps {
    infoData: IInfo | undefined;
}

const Summery: FC<IProps> = ({ infoData }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="dashboard-info-box">
                <div className="dashboard-info-box_icon"><FaRegUser /></div>
                <div className="flex gap-4 mt-2">
                    <div className="dashboard-info-box_title">ثبت نام ها:</div>
                    <div className="dashboard-info-box_count">{infoData && infoData.infos[0].count}</div>
                </div>
                <div className="dashboard-info-box_subtitle">ثبت نام ها در یک ماه گذشته</div>
            </div>
            <div className="dashboard-info-box">
                <div className="dashboard-info-box_icon"><AiOutlineFundProjectionScreen /></div>
                <div className="flex gap-4 mt-2">
                    <div className="dashboard-info-box_title">دوره ها:</div>
                    <div className="dashboard-info-box_count">{infoData && infoData.infos[1].count}</div>
                </div>
                <div className="dashboard-info-box_subtitle">دوره ها در یک ماه گذشته</div>
            </div>
            <div className="dashboard-info-box">
                <div className="dashboard-info-box_icon"><SiAirplayvideo /></div>
                <div className="flex gap-4 mt-2">
                    <div className="dashboard-info-box_title">جلسات دوره:</div>
                    <div className="dashboard-info-box_count">{infoData && infoData.infos[1].count}</div>
                </div>
                <div className="dashboard-info-box_subtitle">جلسات در یک ماه گذشته</div>
            </div>
        </div>
    );
};

export default Summery;
