//Libraries
import { useLoaderData } from "react-router-dom";

//Component
import { StatsContainer, ChartsContainer } from "../components";
import customFetch from "../utils/customFetch";

export const loader = async () => {
    try {
        const { data } = await customFetch.get("/jobs/stats");
        return data;
    } catch (error) {
        console.log(error);
        return error;
    }
};

function Stats() {
    const { defaultStats, monthlyApplications } = useLoaderData();
    return (
        <>
            <StatsContainer defaultStats={defaultStats} />
            {monthlyApplications?.length > 0 && (
                <ChartsContainer data={monthlyApplications} />
            )}
        </>
    );
}

export default Stats;
