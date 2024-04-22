//Libraries
import { redirect, useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import { FaSuitcaseRolling, FaCalendarCheck } from "react-icons/fa";

//Component
import { StatItem } from "../components";

//Wrapper
import Wrapper from "../assets/wrappers/StatsContainer";

//Utils
import customFetch from "../utils/customFetch";

export const loader = async () => {
    try {
        const { data } = await customFetch.get("/users/admin/app-stats");
        return data;
    } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.msg);
        return redirect("/dashboard/all-jobs");
    }
};

function Admin() {
    const { user, jobs } = useLoaderData();

    return (
        <Wrapper>
            <StatItem
                title="Current user"
                count={user}
                color="#e9b949"
                bcg="#fcefc7"
                icon={<FaSuitcaseRolling />}
            />

            <StatItem
                title="Total jobs"
                count={jobs}
                color="#647acb"
                bcg="#e0e8f9"
                icon={<FaCalendarCheck />}
            />
        </Wrapper>
    );
}

export default Admin;
