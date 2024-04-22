//Libraries
import { Form, useLoaderData, redirect } from "react-router-dom";

//Components
import { FormRow, FormSelect, SubmitBtn } from "../components";

//Wrapper
import Wrapper from "../assets/wrappers/DashboardFormPage";

//Utils
import {JOB_STATUS, JOB_TYPE} from "../../../utils/constants";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

//Action && Loader
export const loader = async({params}) => {
    try {
        const {data} = await customFetch.get(`/jobs/${params.id}`);
        return data;
    } catch (error) {
       console.log(error); 
       toast.error(error?.response?.data?.msg);
       return null;
    }
}

export const action = async({request, params}) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    try {
        await customFetch.patch(`/jobs/${params.id}`, data);
        toast.success("Job edited successfully");
        return redirect('/dashboard/all-jobs');
    } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.msg);
        return error;
    }
}

function EditJob() {
    const {job} = useLoaderData();

    return (
        <Wrapper>
            <Form method="post" className="form">
                <h4 className="form-title">Edit Job</h4>
                <div className="form-center">
                    <FormRow defaultValue={job.position} type="text" label="Position" name="position" />
                    <FormRow defaultValue={job.company} type="text" label="Company" name="company" />
                    <FormRow defaultValue={job.jobLocation} type="text" label="Job Location" name="jobLocation" />
                    <FormSelect defaultValue={job.jobStatus} list={Object.values(JOB_STATUS)} name="jobStatus" label="Job Status" />
                    <FormSelect defaultValue={job.jobType} list={Object.values(JOB_TYPE)} name="jobType" label="Job Type" />
                    
                   <SubmitBtn formBtn/>
                </div>
            </Form>
        </Wrapper>
    );
}

export default EditJob;