//Libraries
import {
    Form,
    useOutletContext,
    redirect,
} from "react-router-dom";
import {toast} from 'react-toastify';

//Components
import { FormSelect, SubmitBtn } from "../components";

//Wrapper
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { FormRow } from "../components";

//Utils
import { JOB_STATUS, JOB_TYPE } from "../../../utils/constants";
import customFetch from "../utils/customFetch";

//Action && Loader
export const action = (queryClient) => async({request}) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
        await customFetch.post("/jobs/", data);
        queryClient.invalidateQueries(['jobs']);
        toast.success("Job added!");
        return redirect('all-jobs');
    } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.msg);
        return error;
    }

}

function AddJob() {
    const { user } = useOutletContext();

    return (
        <Wrapper>
            <Form method="post" className="form">
                <h4 className="form-title">Add job</h4>
                <div className="form-center">
                    <FormRow name="position" label="Position" type="text" />
                    <FormRow name="company" label="Company" type="text" />
                    <FormRow
                        defaultValue={user.location}
                        name="jobLocation"
                        label="Job Location"
                        type="text"
                    />
                    {/* Other two form rows goes here */}
                    <FormSelect
                        name="jobStatus"
                        label="Job status"
                        list={Object.values(JOB_STATUS)}
                        defaultValue={JOB_STATUS.PENDING}
                    />

                    <FormSelect
                        name="jobType"
                        label="Job type"
                        list={Object.values(JOB_TYPE)}
                        defaultValue={JOB_TYPE.FULL_TIME}
                    />
                    <SubmitBtn formBtn/>
                </div>
            </Form>
        </Wrapper>
    );
}

export default AddJob;
