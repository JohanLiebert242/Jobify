//Libraries
import { Form, Link, useSubmit } from "react-router-dom";

//Components
import { FormRow, FormSelect} from "../components";
import { useAllJobsContext } from "../pages/AllJobs";

//Utils
import {
    JOB_SORT_BY,
    JOB_STATUS,
    JOB_TYPE,
} from "../.../../../../utils/constants";

//Wrapper
import Wrapper from "../assets/wrappers/DashboardFormPage";

function SearchContainer() {
    const submit = useSubmit();
    const {searchValues} = useAllJobsContext();

    const debounce = (fn) => {
        return (e) => {
            let timeoutId;
            const form = e.currentTarget.form;

            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                fn(form)
            }, 2000)
        }
    }

    return (
        <Wrapper>
            <Form className="form">
                <h5 className="form-title">Search Form</h5>
                <div className="form-center">
                    <FormRow
                        defaultValue={searchValues.search}
                        name="search"
                        label="Search"
                        type="search"
                        onChange={debounce((form) => {
                            submit(form)
                        })}
                    />
                    <FormSelect
                        list={["all", ...Object.values(JOB_STATUS)]}
                        defaultValue={searchValues.jobStatus}
                        name="jobStatus"
                        label="Job Status"
                        onChange={(e) => submit(e.currentTarget.form)}
                    />
                    <FormSelect
                        list={["all", ...Object.values(JOB_TYPE)]}
                        defaultValue={searchValues.jobType}
                        name="jobType"
                        label="Job Type"
                        onChange={(e) => submit(e.currentTarget.form)}
                    />
                    <FormSelect
                        list={Object.values(JOB_SORT_BY)}
                        defaultValue={searchValues.sort}
                        name="sort"
                        label="Sort"
                        onChange={(e) => submit(e.currentTarget.form)}
                    />
                    <Link
                        className="btn form-btn delete-btn"
                        to="/dashboard/all-jobs"
                    >
                        Reset Search Values
                    </Link>
                </div>
            </Form>
        </Wrapper>
    );
}

export default SearchContainer;
