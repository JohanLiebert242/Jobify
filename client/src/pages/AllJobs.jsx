//Libraries
import { useLoaderData } from "react-router-dom";
import { JobsContainer, SearchContainer } from "../components";
import customFetch from "../utils/customFetch";
import { useContext, createContext } from "react";
import { useQuery } from "@tanstack/react-query";

const allJobsQuery = (params) => {
    const { search, jobStatus, jobType, sort, page } = params;

    return {
        queryKey: [
            "jobs",
            search ?? "",
            jobStatus ?? "all",
            jobType ?? "all",
            sort ?? "newest",
            page ?? 1,
        ],
        queryFn: async () => {
            const { data } = await customFetch.get("/jobs", {
                params,
            });
            return data;
        },
    };
};

//Loader && Action
export const loader =
    (queryClient) =>
    async ({ request }) => {
        //Chuyển đổi các params trong queryString về một object
        const params = Object.fromEntries([
            ...new URL(request.url).searchParams.entries(),
        ]);
        await queryClient.ensureQueryData(allJobsQuery(params));
        return { searchValues: { ...params } };
    };

const AllJobsContext = createContext();

function AllJobs() {
    const { searchValues } = useLoaderData();
    const { data } = useQuery(allJobsQuery(searchValues));

    return (
        <AllJobsContext.Provider value={{ data, searchValues }}>
            <SearchContainer />
            <JobsContainer />
        </AllJobsContext.Provider>
    );
}

export const useAllJobsContext = () => useContext(AllJobsContext);

export default AllJobs;
