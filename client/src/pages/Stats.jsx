//Libraries

//Component
import { StatsContainer, ChartsContainer } from "../components";
import customFetch from "../utils/customFetch";
import { useQuery } from "@tanstack/react-query";

const statsQuery = {
    queryKey: ["stats"],
    queryFn: async () => {
        //We use async await here cuz we want to avoid data.data
        const response = await customFetch.get("/jobs/stats");
        return response.data;
    },
};

//We pass queryClient here cuz we can only use a hook in a
// component or in a custom hook
export const loader = (queryClient) => async () => {
    const data = await queryClient.ensureQueryData(statsQuery);

    return null;
};

function Stats() {
    const { data } = useQuery(statsQuery);
    const { defaultStats, monthlyApplications } = data;

    //We dont use data from loader cuz we actually get the data from the
    // ensureQueryData now.
    // const { defaultStats, monthlyApplications } = useLoaderData();
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
