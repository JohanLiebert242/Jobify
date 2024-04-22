//Libraries
import { Link, useRouteError } from "react-router-dom";

//Wrapper
import Wrapper from '../assets/wrappers/ErrorPage';

//Images
import notFoundImg from '../assets/images/not-found.svg';

function Error() {
    const error = useRouteError();
    console.log(error);

    if(error.status === 404) {
        return(
            <Wrapper>
                <div>
                    <img src={notFoundImg} alt="not-found"/>
                    <h3>Oops! Page is on vacation</h3>
                    <p>We cant seem to find the page you are looking for</p>
                    <Link to='/dashboard'>Back home</Link>
                </div>
            </Wrapper>
        )
    }

    return (
        <Wrapper>
            <div>
                <h3>Something went wrong... Please try again</h3>
            </div>
        </Wrapper>
    );
}

export default Error;