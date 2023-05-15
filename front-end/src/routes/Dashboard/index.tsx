import { useFetchInfoDataQuery } from "../../API/info";
import LatestUsers from "./latestUsers";
import Summery from "./summery";

const Dashboard = () => {
    const { data: infoData } = useFetchInfoDataQuery();

    return (
        <div className="m-4 md:mx-20 lg:mx-32 xl:mx-44 mt-20">
            <Summery infoData={infoData} />

            <LatestUsers usersArray={infoData?.lastUsers} />
        </div>
    );
};

export default Dashboard;
