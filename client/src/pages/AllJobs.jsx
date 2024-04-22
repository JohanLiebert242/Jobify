//Libraries
import { useLoaderData} from 'react-router-dom';
import { JobsContainer, SearchContainer } from '../components';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';
import { useContext, createContext } from 'react';

//Loader && Action

export const loader = async({request}) => {
    //Chuyển đổi các params trong queryString về một object
    const params = Object.fromEntries([...new URL(request.url).searchParams.entries()]);
    try {
        const {data} = await customFetch.get("/jobs", {
            params,
        });
        return {data, searchValues: {...params}};
    } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.msg);
        return error;
    }
}

const AllJobsContext = createContext();

function AllJobs() {
    const {data, searchValues} = useLoaderData();

    return (
        <AllJobsContext.Provider value={{data, searchValues}}>
            <SearchContainer />
            <JobsContainer />   
        </AllJobsContext.Provider>
    );
}

export const useAllJobsContext = () => useContext(AllJobsContext);

export default AllJobs;