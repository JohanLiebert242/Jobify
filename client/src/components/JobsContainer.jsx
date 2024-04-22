//Libraries
import { useAllJobsContext } from '../pages/AllJobs';

//Wrapper
import Wrapper from '../assets/wrappers/JobsContainer';

//Component
import {Job, PageBtnContainer} from "../components";

//Utils

function JobsContainer() {
    const {data} = useAllJobsContext();
    const {totalJobs, numOfPages,jobs} = data;

    if(jobs.length === 0) {
        return(
            <Wrapper>
                <h2>No job to display...</h2>
            </Wrapper>
        )
    }

    return (
        <Wrapper>
            <h5>{totalJobs} job{jobs.length > 1 && 's'} found</h5>
            <div className='jobs'>
                {jobs.map(job => {
                    return <Job key={job._id} {...job} />
                })}
            </div>
            {numOfPages > 1 && <PageBtnContainer />}
        </Wrapper>
    );
}

export default JobsContainer;

