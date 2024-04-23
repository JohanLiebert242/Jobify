//Libraries
import { Form, useOutletContext, redirect} from "react-router-dom";
import {toast} from 'react-toastify';


//Components
import { FormRow, SubmitBtn} from "../components";

//Wrapper
import Wrapper from "../assets/wrappers/DashboardFormPage";
import customFetch from "../utils/customFetch";

//Loader && Action

export const action = (queryClient) => async({request}) => {
    const formData = await request.formData();

    const file = formData.get('avatar');
    if(file && file.size > 500000) {
        toast.error("Image size too large");
        return null;
    }

    try {
        await customFetch.patch('/users/update-user', formData);
        queryClient.invalidateQueries(['user']); 
        toast.success("Profile updated successfully");
        return redirect('/dashboard');
    } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.msg);
        return null;
    }
}

function Profile() {
    const {user} = useOutletContext();
    const {name, lastName, email, location } = user;

    return (
        <Wrapper>
            <Form method="post" className="form" encType="multipart/form-data">
                <h4 className="form-title">Profile</h4>
                <div className="form-center">
                    <div className="form-row">
                        <label htmlFor="avatar" className="form-label">
                            Select An Image File (Max 0.5 MB)
                        </label>
                        <input
                            type="file"
                            id="avatar"
                            name="avatar"
                            className="form-input"
                            accept="image/*"
                        />
                    </div>
                    <FormRow defaultValue={name} name="name" label="Name" type="text" />
                    <FormRow defaultValue={lastName} name="lastName" label="Last Name" type="text" />
                    <FormRow defaultValue={email} name="email" label="Email" type="text" />
                    <FormRow defaultValue={location} name="location" label="Location " type="text" />
                    <SubmitBtn formBtn/>
                </div>
            </Form>
        </Wrapper>
    );
}

export default Profile;
