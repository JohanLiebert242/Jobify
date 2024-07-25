//Libraries
import {Link, redirect, Form, useNavigate} from 'react-router-dom';


//Logo
import { Logo, FormRow, SubmitBtn } from '../components';

//Wrapper
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';


export const action = (queryClient) => async({request}) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
        await customFetch.post('/auth/login', data);
        queryClient.invalidateQueries();
        toast.success("Login successfully");
        return redirect("/dashboard");
    } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.msg);
        return error;
    }
}

function Login() {
    const navigate = useNavigate();
    const loginDemoUser = async() => {
        const data = {
            email : "tester@gmail.com",
            password : "0918083733"
        }
        try {
            await customFetch.post('/auth/login', data);
            toast.success("Take a test drive");
            navigate('/dashboard');
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.msg);
        }
    };

    return(
        <Wrapper>
            <Form method='post' className='form'>
                <Logo />
                <h4>Login</h4>
                <FormRow label="Email" name="email" type="email" />
                <FormRow label="Password" name="password" type="password"/>
                <SubmitBtn />
                <button onClick={loginDemoUser} type='button' className='btn btn-block'>Explore the app</button>
                <p>Not a member yet?
                    <Link className='member-btn' to='/register'>Register</Link>
                </p>
            </Form>
        </Wrapper>
    )
}

export default Login;