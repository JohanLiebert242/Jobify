//Libraries
import {Link,Form, redirect} from 'react-router-dom';
import {toast} from 'react-toastify';
//Components
import { FormRow, Logo, SubmitBtn } from '../components';

//Wrapper
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';

//Utils
import customFetch from '../utils/customFetch';

//Actions

export const action = async({request}) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
        await customFetch.post("/auth/register", data);
        toast.success("Registration successfully");
        return redirect('/login');
    } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.msg);
        return error;
    }
}

function Register() {
    return (
        <Wrapper>
            <Form method='POST' className='form'>
                <Logo />
                <h4>Register</h4>
                <FormRow type='text' label="Name" name='name'/>
                <FormRow  type="text" label="Last Name" name="lastName"/>
                <FormRow type="text" label="Location" name="location" />
                <FormRow type="email" label="Email" name="email" />
                <FormRow type='Password' label="Password" name="password" />
                <SubmitBtn />
                <p>Already a member?
                    <Link to='/login' className='member-btn'>Login</Link>
                </p>
            </Form>
        </Wrapper>
    );
}

export default Register;