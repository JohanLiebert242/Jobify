import { useRouteError } from "react-router-dom";

function ErrorElement() {
    const error = useRouteError();
    if (error) {
        return <h4>There was an error...</h4>;
    }
}

export default ErrorElement;
